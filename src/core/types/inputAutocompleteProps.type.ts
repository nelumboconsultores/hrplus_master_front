import { AutocompleteProps } from '@mui/material'
import { Control, FieldValues } from 'react-hook-form'
import { ItemsSelectType } from '.'

export type InputAutocompleteProps<TControl extends FieldValues = any> = {
  label?: string
  required?: boolean
  name: string
  control: Control<TControl>
  error?: string
  helpertext?: string
} & Omit<AutocompleteProps<ItemsSelectType, boolean, boolean, boolean>, 'renderInput'>
