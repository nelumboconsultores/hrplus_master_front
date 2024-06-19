import { FormControlLabel, Grid, Typography } from '@mui/material'
import {
  AppContext,
  GeneralTitle,
  InputAutocomplete,
  InputRange,
  ItemsSelectType,
  Variant,
} from 'core'
import { CardSwitch } from 'modules/incidents/hooks/cardSwitch'
import { styles } from './dayManagementFormStyles'
import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { UsersContext } from 'modules/users/context'
import { getWorkPeriodsNames, postAssignments } from 'core/services'
import dayjs from 'dayjs'
import { ConfirmationWorkingModal } from '../modals/confirWorking'
import { ButtonSend } from '../buttonSend'
import { SelectedOptionEnum } from '../enum/selecteOptionEnum'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeOfDayEnum, useSchemaConfiguration } from 'modules/users/utils'
import { GenderEnum } from '../enum/genderEnum'
import { errorCodes } from 'core/locale/es/errorCodes'

type FormType = {
  workingDay: string
  startDate?: string
  endDate?: string
  type: TypeOfDayEnum
}
export const DayManagmentForm = () => {
  const { t } = useTranslation()
  const { schema } = useSchemaConfiguration()

  const {
    rowsError,
    setRowsError,
    profileIds,
    checkAll,
    initVal,
    excludeProfileIds,
    setExcludeProfileIds,
    setProfileIds,
    setCheckAll,
    setSelectedOption,
    getDataTable,
  } = useContext(UsersContext)
  const { setActMessage } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [switchValue, setSwitchValue] = React.useState(false)
  const [periods, setPeriods] = useState<ItemsSelectType[]>([])
  const [openConfirm, setOpenConfirm] = useState(false)
  const day = dayjs().add(1, 'day')
  const onSubmit = async () => {
    if (rowsError.length > 0) {
      setOpenConfirm(true)
    } else {
      setLoading(true)
      await handleUpdate()
      setLoading(false)
    }
  }

  const methods = useForm<FormType>({
    resolver: zodResolver(schema),
  })
  useEffect(() => {
    methods.setValue('type', switchValue ? TypeOfDayEnum.FixedHours : TypeOfDayEnum.ShiftsVariable)
  }, [switchValue]) // eslint-disable-line
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setSwitchValue(isChecked)
  }

  const createBody = (isTemporal: boolean, isConfirm: boolean) => ({
    profileIds: checkAll && !isConfirm ? [] : (profileIds as number[]),
    temporal: isTemporal,
    force: isConfirm ? true : false,
    allProfiles: isConfirm ? false : checkAll,
    filterProfiles: {
      search: initVal.search as string,
      groupIds: initVal.groupIds as number[],
    },
    excludeProfileIds: excludeProfileIds,
    ...(isTemporal && {
      dateFrom: dayjs(methods?.getValues('startDate')).format('YYYY-MM-DD'),
      dateTo: dayjs(methods?.getValues('endDate')).format('YYYY-MM-DD'),
    }),
  })

  const handleUpdate = async () => {
    const isConfirm = rowsError.length > 0

    if (isConfirm && checkAll) {
      const profileIds = rowsError.map((row) => row.id)
      setProfileIds(profileIds)
    }

    const body = createBody(switchValue, isConfirm)

    const response = await postAssignments(methods?.getValues('workingDay').toString(), body)

    if (response.data) {
      if (response.data.data.invalidProfiles.length > 0) {
        setActMessage({
          message: 'Se encontraron conflictos en algunos usuarios',
          type: Variant.error,
        })
        const newData = response.data.data.invalidProfiles.map((item) => {
          return {
            id: item.id,
            conflict_detected: item.conflictDetail,
            name: item.fullName,
            sex: GenderEnum[item.gender],
            position: '',
          }
        })
        setExcludeProfileIds([])
        setProfileIds([])
        setCheckAll(false)
        setSwitchValue(false)
        setOpenConfirm(false)
        setRowsError(newData)
      } else {
        setSelectedOption(SelectedOptionEnum.None)
        setRowsError([])
        getDataTable()
        setExcludeProfileIds([])
        setProfileIds([])
        setCheckAll(false)
        setSwitchValue(false)
        setOpenConfirm(false)
        const user =
          response.data.data.profilesAdded < 1
            ? response.data.data.profilesAdded + ' usuarios'
            : response.data.data.profilesAdded + ' usuario'
        setActMessage({
          message: t('users.msg.successfulConference', {
            name: response.data.data.workPeriodDetails.name,
            length: user,
          }),
          type: Variant.success,
        })
      }
    }
    if (response?.error) {
      if (response?.error?.errors?.code === 'C01WRKP04') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01WRKP04,
        })
      } else if (response?.error?.errors?.code === 'C01WRKP05') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01WRKP05,
        })
      } else {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }
    }
  }

  const launchDays = async () => {
    const response = await getWorkPeriodsNames()

    if (response?.data) {
      const selectOptions = response?.data?.map((item) => {
        return { value: item.id, label: item.name }
      })
      setPeriods(selectOptions)
    }
  }
  useEffect(() => {
    launchDays()
  }, [])

  return (
    <FormProvider {...methods}>
      <GeneralTitle sx={styles.container}>{t('users.workingDay.title')}</GeneralTitle>
      <Typography lineHeight={1.3} sx={styles.text}>
        {t('users.workingDay.subTitle')}
      </Typography>
      <Typography lineHeight={1.3} variant="grayText" sx={{ fontSize: { lg: '14px', xl: '16px' } }}>
        {t('users.workingDay.discription')}
      </Typography>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: '16px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InputAutocomplete
              control={methods.control}
              name="workingDay"
              options={periods}
              label={t('incidents.modal.select')}
              errors={methods.formState.errors.workingDay?.message}
              helpertext={methods.formState.errors.workingDay?.message}
            />
          </Grid>
          {rowsError.length === 0 && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <CardSwitch
                    sx={styles.cardStyles}
                    checked={switchValue}
                    onChange={handleSwitchChange}
                  />
                }
                label={'Tiempo Parcial'}
              />
            </Grid>
          )}
          {rowsError.length === 0 && switchValue && (
            <Grid item xs={12}>
              <InputRange
                spacing={3}
                fromProp={{
                  gridProps: { xs: 12 },
                  name: 'startDate',
                  helperText: methods?.formState?.errors?.startDate?.message,
                  error: !!methods?.formState?.errors?.startDate,
                  minDate: day as dayjs.Dayjs & Date,
                }}
                toProp={{
                  gridProps: { xs: 12 },
                  name: 'endDate',
                  helperText: methods?.formState?.errors?.endDate?.message,
                  error: !!methods?.formState?.errors?.endDate,
                }}
              />
            </Grid>
          )}
          {rowsError.length > 0 && (
            <Grid item xs={12}>
              <Typography sx={{ color: '#EC6666', fontWeight: 600, marginBottom: '8px' }}>
                Conflictos detectados
              </Typography>
              <Typography sx={{ color: '#EC6666', lineHeight: '1.3rem', fontSize: '0.8rem' }}>
                {t('users.msg.conflictError', { length: rowsError.length })}
              </Typography>
            </Grid>
          )}
        </Grid>
        <ButtonSend
          text={rowsError.length === 0 ? 'APLICAR CAMBIOS' : 'CONFIRMAR Y APLICAR'}
          loading={loading}
        />
      </form>

      <ConfirmationWorkingModal
        handleUpdate={handleUpdate}
        open={openConfirm}
        setOpen={setOpenConfirm}
      />
    </FormProvider>
  )
}
