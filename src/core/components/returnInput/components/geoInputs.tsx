import { Autocomplete, Divider, Grid, GridSize } from '@mui/material'
import { InputRoot } from 'core/components/inputs'
import { getDinamicOptions } from 'core/services'
import { ItemsSelectType, ReturnInputFields } from 'core/types'
import { geoOptionsEnum } from 'modules/dataStructure/modules/companyStructure/enums'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type GeoInputsProps = {
  field: ReturnInputFields
  xs?: boolean | GridSize | undefined
}
type ArrayDataType = Array<ItemDataType>
type ItemDataType = { name: string; id: number } | null
const enumTypeInputs = {
  country: 0,
  state: 1,
  municipality: 2,
}
export const GeoInputs: React.FC<GeoInputsProps> = ({ field, xs }) => {
  const { watch, control, setValue } = useFormContext()
  const { t } = useTranslation()
  const [country, setCountry] = useState<ItemsSelectType[]>([])
  const [states, setStates] = useState<ItemsSelectType[]>([])
  const [municipalities, setMunicipalities] = useState<ItemsSelectType[]>([])
  const [errorCountry, setErrorCountry] = useState<boolean>(false)
  const [errorState, setErrorState] = useState<boolean>(false)
  const [errorMunicipality, setErrorMunicipality] = useState<boolean>(false)

  const consultLists = async (url: string) => {
    const response = await getDinamicOptions(url)
    const options = response?.data.map((item) => ({ value: item.id, label: item.name }))
    return options ?? []
  }

  const onChangeCountry = async (data: { label: string; value: number }) => {
    if (!data) return
    const { label, value } = data

    if (value) {
      const response = await getDinamicOptions(`/countries/${value}/states`)
      const options = response?.data.map((item) => ({ value: item.id, label: item.name }))
      setStates(options ?? [])
      return insertValue(value, label, enumTypeInputs.country)
    }

    return null
  }
  const onChangeState = async (data: { label: string; value: number }) => {
    if (!data) return
    const first = extractValue(enumTypeInputs.country)?.id
    const { label, value } = data
    if (value) {
      const response = await getDinamicOptions(`/countries/${first}/states/${value}/cities`)
      const options = response?.data.map((item) => ({ value: item.id, label: item.name }))
      setMunicipalities(options ?? [])
    }
    return insertValue(value, label, enumTypeInputs.state)
  }

  const insertValue = (key: number, name: string, index: number) => {
    const watchedValue: ArrayDataType = watch(field.name)
    const arrayAux: ArrayDataType = []
    const newObj = { id: key, name }
    if (watchedValue) arrayAux.push(...watchedValue)
    arrayAux[index] = newObj
    return arrayAux
  }
  const extractValue = (index: number): ItemDataType => {
    const watchedValue: ArrayDataType = watch(field.name)
    if (!watchedValue) return null
    return watchedValue[index]
  }

  const deleteValue = (index: number[]) => {
    const watchedValue: ArrayDataType = watch(field.name)
    const returnArray: ArrayDataType = []
    if (watchedValue) {
      const auxArray = watchedValue?.map((item, i: number) => {
        if (index.includes(i)) return null
        return item
      })
      returnArray.push(...auxArray)
    }
    setValue(field.name, returnArray)
  }

  useEffect(() => {
    if (country.length === 0) consultLists('/countries').then((response) => setCountry(response))
    if (states.length === 0) {
      const first = extractValue(enumTypeInputs.country)?.id
      if (first) consultLists(`/countries/${first}/states`).then((response) => setStates(response))
    }
    if (municipalities.length === 0) {
      const first = extractValue(enumTypeInputs.country)?.id
      const second = extractValue(enumTypeInputs.state)?.id
      if (first && second)
        consultLists(`/countries/${first}/states/${second}/cities`).then((response) =>
          setMunicipalities(response),
        )
    }
  }, [watch(field.name)]) // eslint-disable-line
  const valueCountry = useMemo(
    () => country.find((e) => e.label === extractValue(enumTypeInputs.country)?.name),
    [watch(field.name), country], // eslint-disable-line
  )
  const valueState = useMemo(
    () => states.find((e) => e.label === extractValue(enumTypeInputs.state)?.name),
    [watch(field.name), states], // eslint-disable-line
  )
  const valueMunicipality = useMemo(
    () => municipalities.find((e) => e.label === extractValue(enumTypeInputs.municipality)?.name),
    [watch(field.name), municipalities], // eslint-disable-line
  )

  return (
    <Controller
      control={control}
      name={field.name}
      rules={{
        validate: (value) => {
          const countryValue = extractValue(enumTypeInputs.country)
          const stateValue = extractValue(enumTypeInputs.state)
          const municipalityValue = extractValue(enumTypeInputs.municipality)

          if (field.validations?.depth === geoOptionsEnum.country) {
            const isValid = Boolean(value)
            setErrorCountry(!isValid)
            return isValid
          }
          if (field.validations?.depth === geoOptionsEnum.country_state) {
            const isValid = Boolean(countryValue && stateValue)
            setErrorCountry(!countryValue)
            setErrorState(!stateValue)
            return isValid
          }
          if (field.validations?.depth === geoOptionsEnum.country_state_municipality) {
            const isValid = Boolean(countryValue && stateValue && municipalityValue)
            setErrorCountry(!countryValue)
            setErrorState(!stateValue)
            setErrorMunicipality(!municipalityValue)
            return isValid
          }
        },
      }}
      render={({ field: { onChange, ref } }) => {
        return (
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider>{field.label}</Divider>
            </Grid>
            <Grid item xs={xs ?? 4}>
              <Autocomplete
                options={country}
                value={valueCountry ?? null}
                noOptionsText={t('general.autoComplete.noOptions')}
                disabled={country.length === 0}
                onChange={async (_, e) => {
                  const data = e as { label: string; value: number }
                  if (!data) {
                    deleteValue([
                      enumTypeInputs.country,
                      enumTypeInputs.state,
                      enumTypeInputs.municipality,
                    ])
                    setStates([])
                    setMunicipalities([])
                  } else onChange(await onChangeCountry(data))
                }}
                renderInput={(params) => {
                  return (
                    <InputRoot
                      {...params}
                      inputRef={ref}
                      label={t('general.input.country')}
                      error={errorCountry}
                      helperText={errorCountry ? t('validations.countryRequired') : ''}
                    />
                  )
                }}
              />
            </Grid>

            {field.validations?.depth !== geoOptionsEnum.country && (
              <Grid item xs={xs ?? 4}>
                <Autocomplete
                  options={states}
                  noOptionsText={t('general.autoComplete.noOptions')}
                  disabled={states.length === 0}
                  value={valueState ?? null}
                  onChange={async (_, e) => {
                    const data = e as { label: string; value: number }
                    if (!data) {
                      deleteValue([enumTypeInputs.state, enumTypeInputs.municipality])
                      setMunicipalities([])
                    } else onChange(await onChangeState(data))
                  }}
                  renderInput={(params) => {
                    return (
                      <InputRoot
                        {...params}
                        inputRef={ref}
                        label={t('general.input.state')}
                        error={errorState}
                        helperText={errorState ? t('validations.stateRequired') : ''}
                      />
                    )
                  }}
                />
              </Grid>
            )}
            {field.validations?.depth === geoOptionsEnum.country_state_municipality && (
              <Grid item xs={xs ?? 4}>
                <Autocomplete
                  options={municipalities}
                  noOptionsText={t('general.autoComplete.noOptions')}
                  disabled={municipalities.length === 0}
                  value={valueMunicipality ?? null}
                  onChange={(_, e) => {
                    const data = e as { label: string; value: number }
                    if (!data) deleteValue([enumTypeInputs.municipality])
                    else
                      onChange(
                        data?.value
                          ? insertValue(data.value, data.label, enumTypeInputs.municipality)
                          : null,
                      )
                  }}
                  renderInput={(params) => {
                    return (
                      <InputRoot
                        {...params}
                        inputRef={ref}
                        label={t('general.input.municipality')}
                        error={errorMunicipality}
                        helperText={errorMunicipality ? t('validations.municipalityRequired') : ''}
                      />
                    )
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sx={{ marginTop: '8px' }}>
              <Divider />
            </Grid>
          </Grid>
        )
      }}
    />
  )
}
