import { InputNumRange, ItemsSelectType } from 'core'
import { listSelectsText } from 'modules/dataStructure/modules/companyStructure/enums'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const TextStructure = () => {
  const {
    watch,
    formState: { errors },
    control,
  } = useFormContext()
  const { t } = useTranslation()
  const isOptionEqualToValue = (option: ItemsSelectType, value: ItemsSelectType) =>
    option.value === value.value
  const selectedMinValues = useMemo(
    () => listSelectsText.find((v) => v.value === watch(`minLength`)),
    [listSelectsText, watch(`minLength`)], //eslint-disable-line
  )
  const selectedMaxValues = useMemo(
    () => listSelectsText.find((v) => v.value === watch(`maxLength`)),
    [listSelectsText, watch(`maxLength`)], //eslint-disable-line
  )
  const selectTextWithouZero = useMemo(() => listSelectsText.filter((v) => v.value !== 0), [])

  return (
    <InputNumRange
      minValue={watch(`minLength`)}
      maxValue={watch(`maxLength`)}
      gridContainer={{ spacing: 2 }}
      from={{
        nameFrom: `minLength`,
        inputFrom: {
          disableClearable: true,
          value: selectedMinValues ?? null,
          label: t('operatingLevel.input.lowerLimit'),
          errors: errors?.minLength?.message as string,
          helpertext: errors?.minLength?.message as string,
          control: control,
          options: listSelectsText || [],
          isOptionEqualToValue: isOptionEqualToValue,
        },
      }}
      to={{
        nameTo: `maxLength`,
        inputTo: {
          disableClearable: true,
          value: selectedMaxValues ?? null,
          label: t('operatingLevel.input.upperLimit'),
          errors: errors?.maxLength?.message as string,
          helpertext: errors?.maxLength?.message as string,
          control: control,
          options: selectTextWithouZero || [],
          isOptionEqualToValue: isOptionEqualToValue,
        },
      }}
    />
  )
}
