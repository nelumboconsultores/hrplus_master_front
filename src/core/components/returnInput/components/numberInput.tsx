import { InputNumber } from 'core/components/inputs'
import { ReturnInputFields } from 'core/types'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type NumberInputProps = {
  field: ReturnInputFields
}

export const NumberInput: React.FC<NumberInputProps> = ({ field }) => {
  const { name, label, placeHolder, validations } = field
  const { t } = useTranslation()
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  return (
    <InputNumber
      {...register(name, {
        required: {
          value: validations?.required ?? false,
          message: t('general.validations.requiredName', { name: label }),
        },
        min: {
          value: Number(validations?.min_value) ?? 0,
          message: t('general.validations.minValue', { min: validations?.min_value }),
        },
        max: {
          value: Number(validations?.max_value),
          message: t('general.validations.maxValue', { max: validations?.max_value }),
        },
        valueAsNumber: true,
      })}
      label={label + (validations?.required ? ' *' : '')}
      placeholder={placeHolder}
      error={!!errors[name]}
      value={watch(name) ? watch(name) : undefined || ''}
      helperText={errors[name]?.message as string}
      disabled={field.disabled}
      fullWidth
    />
  )
}
