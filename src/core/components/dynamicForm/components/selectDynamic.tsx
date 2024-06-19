import { InputAutocomplete, ItemDynamicFormType, ItemsSelectType } from 'core'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

type SelectDynamicProps = { input: ItemDynamicFormType }

export const SelectDynamic: React.FC<SelectDynamicProps> = ({ input }) => {
  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const isDisabled = input.options?.length === 0 && options.length === 0
  const isAllValue = input?.fathers?.map((father) => watch(father))
  const isExistFather = isAllValue?.every((father) => !!father)
  const isHierarchy = input?.url && input?.fathers && input.getHierarchyOptions
  const noHasFather = input.fathers?.length === 0
  const parentValue = input.getHierarchyOptions
    ? watch(input.fathers?.[input.fathers.length - 1] ?? '')
    : ''

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

  useEffect(() => {
    const fetchOptions = async () => {
      if (noHasFather) {
        const response = await input.getHierarchyOptions?.(input.url as string, '')
        if (response) setOptions(response)
      } else if (parentValue) {
        const response = await input.getHierarchyOptions?.(
          input.url as string,
          parentValue as string,
        )
        if (response) setOptions(response)
      }
    }
    if (isHierarchy) fetchOptions()
  }, [isHierarchy, parentValue]) //eslint-disable-line

  const selectedValues = useMemo(
    () => bestOption.find((v) => v.value === watch(input.name)),
    [watch(input.name), isDisabled], //eslint-disable-line
  )
  return (
    <InputAutocomplete
      value={selectedValues ?? null}
      name={input.name}
      control={control}
      options={bestOption}
      disabled={input.disabled ?? isDisabled}
      label={input.label}
      placeholder={input.placeHolder}
      errors={errors[input.name]?.toString()}
      helpertext={errors[input.name]?.message as string}
    />
  )
}
