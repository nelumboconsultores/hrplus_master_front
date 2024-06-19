import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import {
  InputAutocomplete,
  InputMultiSelect,
  InputRoot,
  ItemsSelectType,
  daysOfWeek,
  getAutocompleteValue,
  getMultiselecValues,
  militaryRank,
} from 'core'
import { statusWorkingDays } from 'modules/workingDays/utils'
import { useMemo } from 'react'

import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FilterBodyProps = {
  getDataFilter: () => void
  options: ItemsSelectType[]
  loading: boolean
}
export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const { t } = useTranslation()
  const {
    control,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useFormContext()

  const returnValueStatus = useMemo(
    () => statusWorkingDays.find(({ value }) => value === getValues('statusWorkingDay')),
    [watch('statusWorkingDay')], //eslint-disable-line
  )

  return (
    <Box sx={{ display: ' flex', alignItems: 'center' }}>
      <Grid container spacing={1}>
        <Grid item xs={4} lg={2.3}>
          <InputRoot
            {...register('search')}
            label={t('workingDays.form.name')}
            placeholder={t('workingDays.form.name')}
            name="search"
            inputProps={{ maxLength: 75 }}
            sx={{ marginRight: '16px' }}
            error={!!errors.search?.message}
            helperText={errors.search?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={2.3}>
          <InputMultiSelect
            label={t('workingDays.form.daysOfWeek')}
            placeholder={t('workingDays.form.daysOfWeek')}
            options={daysOfWeek}
            control={control}
            value={getMultiselecValues(watch('daysOfWeek'), daysOfWeek)}
            name="daysOfWeek"
            sx={{ marginRight: '16px' }}
            errors={errors.daysOfWeek?.message as string}
            helpertext={errors.daysOfWeek?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={2.3}>
          <InputAutocomplete
            options={statusWorkingDays}
            control={control}
            label={t('workingDays.form.statusWorkingDay')}
            name="statusWorkingDay"
            value={returnValueStatus ?? ''}
            sx={{ marginRight: '16px' }}
            errors={errors.statusWorkingDay?.toString()}
            helpertext={errors.statusWorkingDay?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={1.8}>
          <InputAutocomplete
            options={militaryRank}
            control={control}
            label={t('workingDays.form.dateFrom')}
            value={getAutocompleteValue(watch('dateFrom'), militaryRank)}
            name="dateFrom"
            sx={{ marginRight: '16px' }}
            errors={errors.dateFrom?.toString()}
            helpertext={errors.dateFrom?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={1.8}>
          <InputAutocomplete
            name="dateTo"
            control={control}
            options={militaryRank}
            value={getAutocompleteValue(watch('dateTo'), militaryRank)}
            sx={{ marginRight: '16px' }}
            label={t('workingDays.form.dateTo')}
            errors={errors.dateTo?.toString()}
            helpertext={errors.dateTo?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={1.5} sx={{ marginTop: '4px', textAlign: 'end' }}>
          <LoadingButton
            loading={props.loading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: '44px' }}
          >
            Buscar
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}
