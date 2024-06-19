import { Grid, InputAdornment, Typography } from '@mui/material'
import { InputRoot, onlyNumbers } from 'core'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type PercentageFieldProps = {
  title: string
  name: string
}

export const PercentageField: React.FC<PercentageFieldProps> = ({ title, name }) => {
  const { t } = useTranslation()
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()
  return (
    <Grid container justifyContent={'space-between'}>
      <Grid item sx={{ alignSelf: 'center' }} xs={7}>
        <Typography sx={{ color: '#707070' }}>{title}</Typography>
      </Grid>
      <Grid item xs={4}>
        <InputRoot
          {...register(name, { valueAsNumber: true })}
          label={t('companyStructure.input.weighting')}
          placeholder="0"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          error={!!errors[name]}
          value={isNaN(watch(name)) ? '' : watch(name)}
          onInput={(e) => {
            const target = e.target as HTMLInputElement
            target.value = onlyNumbers(target.value)
            target.value = target.value.slice(0, 2)
          }}
        />
      </Grid>
    </Grid>
  )
}
