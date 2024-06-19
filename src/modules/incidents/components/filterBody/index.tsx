import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import { InputRoot } from 'core'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FilterBodyProps = {
  getDataFilter: () => void
  loading: boolean
}
export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ display: ' flex', alignItems: 'center' }}>
      <Grid container spacing={2}>
        <Grid item md={4} lg={3.5}>
          <InputRoot
            {...register('searchField')}
            label={t('incidents.nameIncidents')}
            placeholder={t('incidents.nameIncidents')}
            name="searchField"
            fullWidth
            inputProps={{ maxLength: 75 }}
            error={!!errors.searchField?.message}
            helperText={errors.searchField?.message as string}
          />
        </Grid>
        <Grid item xs={4} lg={1.5} sx={{ marginTop: '4px', textAlign: 'center' }}>
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
