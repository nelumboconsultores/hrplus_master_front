import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Grid } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import { InputAutocomplete, getAutocompleteValue, InputRoot } from 'core'
import { statusOptions } from '../../enums'

type FilterBodyProps = {
  getDataFilter: () => void
  loading: boolean
  hideButton?: boolean
}
export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const { t } = useTranslation()
  const { register, control, watch } = useFormContext()

  return (
    <Box sx={{ display: ' flex', alignItems: 'center' }}>
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid item xs={3}>
          <InputRoot
            {...register('code')}
            label={t(`instancesStores.view.inputs.code`)}
            placeholder={t(`instancesStores.view.inputs.code`)}
            value={watch('code')}
            sx={{ marginRight: '16px' }}
          />
        </Grid>
        <Grid item md={4.5} lg={3.5}>
          <InputRoot
            {...register('denomination')}
            label={t(`instancesStores.view.inputs.denomination`)}
            placeholder={t(`instancesStores.view.inputs.denomination`)}
            value={watch('denomination')}
            sx={{ marginRight: '16px' }}
          />
        </Grid>
        <Grid item md={2.5} lg={2}>
          <InputAutocomplete
            options={statusOptions}
            control={control}
            label={t(`instancesStores.view.inputs.costCenterStatusId`)}
            name="statusId"
            value={getAutocompleteValue(watch('statusId'), statusOptions)}
            sx={{ marginRight: '16px' }}
            disableClearable
          />
        </Grid>
        {!props.hideButton && (
          <Grid item xs={2} sx={{ textAlign: 'center', marginTop: '4px' }}>
            <LoadingButton
              loading={props.loading}
              variant="contained"
              color="primary"
              type="submit"
              sx={{ height: '44px' }}
            >
              {t(`instancesStores.view.inputs.search`)}
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
