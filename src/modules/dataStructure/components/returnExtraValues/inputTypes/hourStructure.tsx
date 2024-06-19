import { Grid } from '@mui/material'
import { InputAutocomplete, isInvalidTimeRange, militaryRank } from 'core'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const HourStructure = () => {
  const {
    formState: { errors },
    control,
    watch,
  } = useFormContext()
  const { t } = useTranslation()
  const upperValues = useMemo(
    () => militaryRank.find((v) => v.value === watch('max_time')),
    [watch('max_time')], //eslint-disable-line
  )
  const lowerValues = useMemo(
    () => militaryRank.find((v) => v.value === watch('min_time')),
    [watch('min_time')], //eslint-disable-line
  )
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputAutocomplete
          control={control}
          name="min_time"
          label={t('operatingLevel.input.lowerLimit')}
          errors={errors?.min_time?.message as string}
          helpertext={errors?.min_time?.message as string}
          options={militaryRank}
          value={lowerValues}
          disableClearable
          getOptionDisabled={(option) => {
            if (watch('max_time'))
              return isInvalidTimeRange(option.value.toString(), watch('max_time'))
            return false
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputAutocomplete
          control={control}
          name="max_time"
          label={t('operatingLevel.input.upperLimit')}
          errors={errors.max_time?.message as string}
          helpertext={errors.max_time?.message as string}
          options={militaryRank}
          value={upperValues}
          disableClearable
          getOptionDisabled={(option) => {
            if (watch('min_time'))
              return isInvalidTimeRange(watch('min_time'), option.value.toString())
            return false
          }}
        />
      </Grid>
    </Grid>
  )
}
