import { InputRoot } from 'core/components/inputs'
import { ReturnInputFields } from 'core/types'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type TextInputProps = {
  field: ReturnInputFields
}

export const TextInput: React.FC<TextInputProps> = ({ field }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext()
  const { name, label, placeHolder, validations } = field
  const { t } = useTranslation()

  return (
    <InputRoot
      {...register(name, {
        required: {
          value: validations?.required ?? false,
          message: t('general.validations.requiredName', { name: label }),
        },
        minLength: {
          value: validations?.min_chars ?? 0,
          message: t('general.validations.minChart', { min: validations?.min_chars }),
        },
        maxLength: {
          value: validations?.max_chars ?? 255,
          message: t('general.validations.maxChart', { max: validations?.max_chars ?? 255 }),
        },
      })}
      name={name}
      label={label + (validations?.required ? ' *' : '')}
      placeholder={placeHolder}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
      disabled={field.disabled}
      value={watch(name) ?? ''}
    />
  )
}
