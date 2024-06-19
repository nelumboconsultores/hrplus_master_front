import { Grid } from '@mui/material'
import { InputNumber, InputNumberProps } from 'core'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type NumRangeStructureProps = {
  minProps?: InputNumberProps
  maxProps?: InputNumberProps
}

export const NumRangeStructure: React.FC<NumRangeStructureProps> = ({ maxProps, minProps }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext()
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputNumber
          {...minProps}
          {...register(minProps?.name ?? 'minLength')}
          label={t('operatingLevel.input.lowerLimit')}
          error={!!errors?.[minProps?.name ?? 'minLength']}
          helperText={errors?.[minProps?.name ?? 'minLength']?.message as string}
        />
      </Grid>
      <Grid item xs={6}>
        <InputNumber
          {...maxProps}
          {...register(maxProps?.name ?? 'maxLength')}
          label={t('operatingLevel.input.upperLimit')}
          error={!!errors?.[maxProps?.name ?? 'maxLength']}
          helperText={
            (errors?.[maxProps?.name ?? 'maxLength']?.message as string) ?? maxProps?.helperText
          }
        />
      </Grid>
    </Grid>
  )
}
