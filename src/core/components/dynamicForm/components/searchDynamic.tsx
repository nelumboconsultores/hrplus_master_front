import { InputSearch, ItemDynamicFormType } from 'core'
import React from 'react'
import { useFormContext } from 'react-hook-form'

type SearchDynamicProps = { input: ItemDynamicFormType }

export const SearchDynamic: React.FC<SearchDynamicProps> = ({ input }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <InputSearch
      {...register(input.name)}
      error={errors[input.name] && true}
      helperText={errors[input.name]?.message as string}
      label={input.label}
      disabled={input.disabled}
      name={input.name}
      inputProps={{ maxLength: 75 }}
      placeholder={input.placeHolder}
    />
  )
}
