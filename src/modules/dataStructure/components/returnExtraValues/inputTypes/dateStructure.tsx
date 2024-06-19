import { Grid } from '@mui/material'
import { InputAutocomplete, InputDate, rangeDates } from 'core'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const DateStructure = () => {
  const { control, formState, watch } = useFormContext()
  const { t } = useTranslation()
  const currentDate = dayjs()
  const valueRangeTime = useMemo(
    () => rangeDates.find((v) => v.value === watch('rangeTime')),
    [watch('rangeTime'), rangeDates], // eslint-disable-line
  )
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputAutocomplete
          control={control}
          name="rangeTime"
          options={rangeDates}
          label={t('operatingLevel.input.rangeTime')}
          errors={formState.errors?.rangeTime?.message as string}
          helpertext={formState.errors?.rangeTime?.message as string}
          value={valueRangeTime ?? null}
        />
      </Grid>
      <Grid item xs={6}>
        <InputDate
          name="max_date"
          label={t('operatingLevel.input.upperLimit')}
          placeholder={t('operatingLevel.input.currentDate')}
          minDate={currentDate}
          error={!!formState.errors?.max_date}
          helpertext={formState.errors?.max_date?.message as string}
          value={watch('max_date') ? dayjs(watch('max_date'), 'DD/MM/YYYY') : null}
        />
      </Grid>
    </Grid>
  )
}
