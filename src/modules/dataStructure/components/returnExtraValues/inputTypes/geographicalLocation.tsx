import { InputAutocomplete } from 'core'
import { options } from 'modules/dataStructure/modules/companyStructure/enums'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const GeographicalLocation: React.FC = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()
  const { t } = useTranslation()

  const valuesField = useMemo(
    () => options.find((v) => v.value === watch('depth')),
    [watch('depth'), options], // eslint-disable-line
  )
  return (
    <InputAutocomplete
      control={control}
      options={options}
      value={valuesField ?? null}
      disabled={watch('id') ? true : false}
      label={t('operatingLevel.input.levelsRequired')}
      name="depth"
      errors={errors.depth?.message as string}
      helpertext={errors.depth?.message as string}
    />
  )
}
