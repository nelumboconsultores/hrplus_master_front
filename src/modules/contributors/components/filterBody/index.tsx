import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import { InputRoot } from 'core'
import { t } from 'i18next'

import { useFormContext } from 'react-hook-form'

type FilterBodyProps = {
  getDataFilter: () => void
  loading: boolean
}
export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ display: ' flex', alignItems: 'center' }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <InputRoot
            {...register('search')}
            label={t('contributors.searchFilter.name')}
            placeholder={t('contributors.searchFilter.name')}
            name="search"
            inputProps={{ maxLength: 75 }}
            sx={{ marginRight: '16px' }}
            error={!!errors.search?.message}
            helperText={errors.search?.message as string}
          />
        </Grid>

        <Grid item xs={4} sx={{ marginTop: '4px', textAlign: 'start' }}>
          <LoadingButton
            loading={props.loading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: '44px' }}
          >
            {t('contributors.searchFilter.search')}
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}
