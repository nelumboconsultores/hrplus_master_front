import { Grid } from '@mui/material'
import { InputCurrency } from 'core'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CurrencyStructure = () => {
  const {
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputCurrency
          InputProps={{
            name: 'lowerMoney',
            label: t('operatingLevel.input.lowerLimit'),
            error: !!errors?.lowerMoney,
            helperText: errors?.lowerMoney?.message as string,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputCurrency
          InputProps={{
            name: 'upperMoney',
            label: t('operatingLevel.input.upperLimit'),
            error: !!errors.upperMoney,
            helperText: errors.upperMoney?.message as string,
          }}
        />
      </Grid>
    </Grid>
  )
}
