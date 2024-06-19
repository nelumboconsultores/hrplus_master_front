import React, { useContext, useEffect, useMemo } from 'react'
import { Box, Grid, darken } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  AppContext,
  BreadCrumbsList,
  PathName,
  Variant,
  generateQueryParams,
  getLocalStorage,
  keyImg,
  saveLocalStorage,
} from 'core'
import { getCatalogOptions, getSetting, updateSetting } from 'core/services'

import {
  CountryCard,
  LocationModal,
  PaperComponent,
  Textcomponet,
} from 'modules/location/components'
import {
  ListHolidays,
  ParameterCountry,
  ParameterHolidays,
  ParameterTimeFormat,
} from 'modules/location/types'
import Spinner from 'core/components/spinner'
import { LoadingButton } from '@mui/lab'
import { colors } from 'core/styles/colors'

interface FormData {
  countryCode: number
  timeCode: number
  changesDetected: boolean
}

type Opt = {
  value: number
  label: string
  code: string
  flag: string
}
type OptTime = {
  value: number
  label: string
}

export const LocationPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [seeOptionsTimeCode, setSeeOptionsTimeCode] = React.useState(false)
  const [holidaysList, setHolidaysList] = React.useState<Omit<ListHolidays, 'id'>[]>([])

  const [seeOptionsCountryCode, setSeeOptionsCountryCode] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [seeContinue, setSeeContinue] = React.useState(false)
  const { setActMessage } = useContext(AppContext)
  const [isFetching, setIsFetching] = React.useState(true)
  const [isUpdate, setIsUpdate] = React.useState(false)
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<ListHolidays[]>([])
  const [optionCountry, setOptionCountry] = React.useState<Opt[]>([])
  const [optionTime, setOptionTime] = React.useState<OptTime[]>([])
  const [changeSwitch, setChangeSwitch] = React.useState(false)
  const [holidays, setHolidays] = React.useState<{
    holidays: (ListHolidays & { isActive: boolean })[]
    isDefaultSelected: boolean
    countryOfHolidays: string
  }>({ holidays: [], isDefaultSelected: false, countryOfHolidays: 'mx' })
  const [defaultCountry, setDefaultCountry] = React.useState({
    value: 0,
    label: '',
    code: '',
    flag: '',
  })
  const [defaultTimeFormat, setDefaultTimeFormat] = React.useState({
    value: 0,
    label: '',
  })

  const methods = useForm<FormData>({
    defaultValues: {
      countryCode: defaultCountry.value,
      timeCode: defaultTimeFormat.value,
      changesDetected: false,
    },
  })
  const { getValues, setValue } = methods

  const fetchData = async () => {
    await parameterOption('country')
    await parameterOption('time_format')
    await getSettings()
  }

  useEffect(() => {
    const stateData = location.state?.stateData || null

    if (stateData === null) {
      setSeeContinue(false)
    } else {
      setSeeContinue(true)
    }
    fetchData()
  }, []) // eslint-disable-line

  const parameterOption = async (value: string) => {
    const body = { name: value }
    const queryParams = generateQueryParams(body)

    if (value === 'country') {
      const { data } = await getCatalogOptions<{ data: ParameterCountry }>(queryParams)
      if (!data) return
      const aux = data.data.map((item) => ({
        value: item.id,
        label: item?.value.name,
        code: item?.value.code,
        flag: item?.value.flag,
      }))
      setOptionCountry(aux)
    }

    if (value === 'time_format') {
      const { data } = await getCatalogOptions<{ data: ParameterTimeFormat }>(queryParams)
      if (!data) return
      const aux: OptTime[] = data.data.map((item) => ({
        value: item.id,
        label: item.value + 'h',
      }))
      setOptionTime(aux)
    }

    if (value.includes('holidays_')) {
      setHolidaysList([])
      const { data } = await getCatalogOptions<{ data: ParameterHolidays }>(queryParams)
      if (!data) return
      const newHolidays = data.data[0]?.value
      setHolidaysList(newHolidays)
    }
  }

  const getSettings = async () => {
    setIsFetching(true)
    const response = await getSetting()

    if (response.data) {
      const { country, timeFormat, holidays, usesDefaultHolidays } = response.data.data

      const holidaysAux = holidays?.map((item) => ({ ...item, isActive: !!item.id }))
      setHolidays({
        holidays: holidaysAux,
        isDefaultSelected: usesDefaultHolidays,
        countryOfHolidays: country?.value.code,
      })

      if (country) {
        const aux = {
          value: country.id,
          label: country?.value.name,
          code: country?.value.code,
          flag: country?.value.flag,
        }
        setValue('countryCode', country.id)
        setDefaultCountry(aux)
      }

      if (timeFormat) {
        const aux = {
          value: timeFormat.id,
          label: timeFormat.value + 'h',
        }
        setValue('timeCode', timeFormat.id)
        setDefaultTimeFormat(aux)
      }
    }
    setIsFetching(false)
  }

  const selectedValues = useMemo(
    () => optionCountry?.find((v) => v.value === getValues('countryCode')),
    [getValues('countryCode'), isFetching, optionCountry], //eslint-disable-line
  )

  const selectedValuesTime = useMemo(
    () => optionTime?.find((v) => v.value === getValues('timeCode')),
    [getValues('timeCode'), isFetching], //eslint-disable-line
  )

  useEffect(() => {
    if (selectedValues?.code) {
      parameterOption('holidays_' + selectedValues?.code)
    }
  }, [selectedValues?.code]) // eslint-disable-line

  const UpdateData = async () => {
    setOpen(false)

    const body = {
      timeFormatId: getValues('timeCode'),
      countryId: getValues('countryCode'),
      usesDefaultHoliday: changeSwitch,
      holidays: selectedCheckboxes,
      changesDetected: getValues('changesDetected'),
    }
    setIsUpdate(true)
    const { data } = await updateSetting(body)
    if (data) {
      setActMessage({
        type: Variant.success,
        message: t('location.modal.success'),
      })
      const userInfo = getLocalStorage()
      saveLocalStorage({ ...(userInfo ?? Object({})), isFinishedLocalization: true })
      if (seeContinue) navigate(PathName.Home)
    } else {
      setActMessage({
        type: Variant.error,
        message: t('location.saveUpdateError'),
      })
    }
    setIsUpdate(false)
    getSettings()
  }

  const handleSubmit = () => {
    const noHasAllValues = !getValues('countryCode') || !getValues('timeCode')
    if (noHasAllValues) {
      setActMessage({
        type: Variant.error,
        message: t('location.NoHasFormCompleted'),
      })
      return
    }
    setOpen(true)
  }

  useEffect(() => {
    if (!holidays?.holidays.length || holidays.countryOfHolidays !== selectedValues?.code) {
      setSelectedCheckboxes([])
      return
    }
    if (holidays?.isDefaultSelected) {
      setSelectedCheckboxes(holidays.holidays)
      return
    }
    const AtLeastOneHasId = holidays?.holidays?.some((item) => !!item.id)
    if (AtLeastOneHasId) {
      const activeHolidays = holidays?.holidays?.filter((item) => item.isActive)
      setSelectedCheckboxes(activeHolidays)
    }
  }, [holidays?.holidays, selectedValues?.code]) // eslint-disable-line

  if (isFetching) return <Spinner />
  return (
    <Box>
      <BreadCrumbsList />

      <Grid container sx={{ width: '100%', maxHeight: '400px' }}>
        <Grid item xs={12} lg={6.5} sx={{ display: 'flex', paddingTop: '20px' }}>
          <Grid
            container
            sx={{
              alignContent: 'start',
              height: '100%',
            }}
          >
            <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
              <Textcomponet />
            </Grid>
            <Grid item xs={12}>
              <FormProvider {...methods}>
                <form>
                  <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Grid item xs={6} lg={6} xl={5} sx={{ marginRight: '30px' }}>
                      <CountryCard
                        countryCode={selectedValues?.code || ''}
                        img={selectedValues?.flag || ''}
                        description="País de Operación"
                        options={optionCountry}
                        color="#2A7977"
                        name="countryCode"
                        seeOptions={seeOptionsCountryCode}
                        setSeeOptions={setSeeOptionsCountryCode}
                      />
                    </Grid>
                    <Grid item xs={6} lg={6} xl={5}>
                      <CountryCard
                        countryCode={selectedValuesTime?.label || '12h'}
                        img={keyImg.clock}
                        description="Formato de Tiempo"
                        options={optionTime}
                        name="timeCode"
                        color="#24A9E2"
                        seeOptions={seeOptionsTimeCode}
                        setSeeOptions={setSeeOptionsTimeCode}
                      />
                    </Grid>
                  </Box>
                </form>
              </FormProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          sx={{ paddingTop: { xs: '50px ', lg: '10px' }, marginLeft: '10px', maxHeight: '400px' }}
        >
          {!!getValues('countryCode') && (
            <PaperComponent
              selectedCheckboxes={selectedCheckboxes}
              countryCode={selectedValues?.code || 'MX'}
              holidays={holidays}
              holidaysList={holidaysList}
              setSelectedCheckboxes={setSelectedCheckboxes}
              setValue={setValue}
              setChangeSwitch={setChangeSwitch}
            />
          )}
          <Grid container sx={{ alignContent: 'end' }}>
            {!!getValues('countryCode') && (
              <Grid item xs={12} sx={{ textAlign: 'end', marginTop: '20px' }}>
                <LoadingButton
                  onClick={handleSubmit}
                  variant="contained"
                  loading={isUpdate}
                  disabled={isUpdate}
                  sx={{
                    backgroundColor: colors.color8,
                    '&:hover': {
                      backgroundColor: darken(colors.color8, 0.2),
                    },
                    color: '#fff',
                    margin: '20px 0px',
                    width: '155px',
                    height: '42px',
                  }}
                >
                  {seeContinue ? t('location.continue') : t('location.save')}
                </LoadingButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      <LocationModal
        open={open}
        onFetch={UpdateData}
        isSetup={seeContinue}
        setOpen={setOpen}
        isFetching={isUpdate}
      />
    </Box>
  )
}
