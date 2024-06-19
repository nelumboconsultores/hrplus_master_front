import { InputFile } from 'core/components/inputs'
import { containsDot } from 'core/utils'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FileInputProps = {
  field: {
    name: string
    label: string

    validations?: {
      required?: boolean
      max_size?: number
      file_type?: string
    }
  }
}

export const FileInput = (props: FileInputProps) => {
  const { name, label, validations } = props.field
  const { t } = useTranslation()
  const {
    watch,
    setValue,
    formState: { errors },
    control,
    getValues,
    setError,
  } = useFormContext()
  useEffect(() => {
    if (!containsDot(watch(name))) {
      setValue(name, undefined)
    }
  }, [watch(name)]) //eslint-disable-line

  return (
    <InputFile
      outside={{
        controlOutside: control,
        getValuesOutside: getValues,
        setErrorOutside: setError,
        setValueOutside: setValue,
        watchOutside: watch,
      }}
      inputProps={{
        name: name,
        label: label + (validations?.required ? ' *' : ''),
        value: containsDot(watch(name)?.toString()) ? watch(name) : '',
        InputProps: {
          inputProps: {
            accept: validations?.file_type,
            maxsize: validations?.max_size,
          },
        },
        InputLabelProps: { shrink: true },
        helperText:
          (errors[name]?.message as string) ??
          t('general.validations.allowedFileTypes', { types: validations?.file_type }),
        error: !!errors[name],
      }}
      validations={{
        required: validations?.required,
        max_size: validations?.max_size,
        file_type: validations?.file_type,
      }}
    />
  )
}
