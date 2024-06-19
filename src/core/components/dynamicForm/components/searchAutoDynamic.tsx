import { InputAutoSearch, ItemDynamicFormType, ItemsSelectType } from 'core'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const SearchAutoDynamic = ({
  input,
  getNameAndValue,
}: {
  input: ItemDynamicFormType
  getNameAndValue?: boolean
}) => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const isAllValue = input?.fathers?.map((father) => watch(father))
  const isExistFather = isAllValue?.every((father) => !!father)
  const isDisabled = input.options?.length === 0 && options.length === 0
  const bestOption = input?.options
    ? input?.options.length > 0
      ? input?.options
      : options
    : options

  useEffect(() => {
    if (input.fathers) {
      setValue(input.name, undefined)
      if (isExistFather) {
        let value = watch(input.fathers?.join(','))
        if (value && typeof value === 'object') value = value.value
        input.getOptions?.(input?.url?.replace('idElection', value) ?? '').then((response) => {
          setOptions(response)
        })
      } else if (isExistFather === false) {
        setOptions([])
      }
    }
  }, [watch(input?.fathers?.[0] ?? '')]) //eslint-disable-line

  const selectedValues = useMemo(
    () => {
      let value = watch(input.name)
      if (value && typeof value === 'object') value = value.value
      return bestOption.find((v) => v.value === value)
    },
    [watch(input.name), isDisabled], //eslint-disable-line
  )

  return (
    <InputAutoSearch
      value={selectedValues ?? ''}
      propsInput={{ name: input.name, label: input.label }}
      control={control}
      options={bestOption}
      disabled={input.disabled ?? isDisabled}
      placeholder={input.placeHolder}
      errors={errors[input.name]?.toString()}
      getNameAndValue={getNameAndValue}
      helpertext={errors[input.name]?.message as string}
    />
  )
}
