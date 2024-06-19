import { InputMultiSelect, ItemDynamicFormType } from 'core'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

type MultiSelectDynamicProps = { input: ItemDynamicFormType }

export const MultiSelectDynamic: React.FC<MultiSelectDynamicProps> = ({ input }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const selectedValues = useMemo(
    () => input?.options?.filter((v) => watch(input.name)?.includes(v.value)),
    [input?.options, watch(input.name)], // eslint-disable-line
  )
  return (
    <InputMultiSelect
      control={control}
      options={input?.options ?? []}
      errors={errors[input.name]?.message as string}
      helpertext={errors[input.name]?.message as string}
      label={input.label}
      disabled={input.disabled}
      name={input.name}
      placeholder={input.placeHolder}
      value={selectedValues}
    />
  )
}
