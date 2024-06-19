import { FieldTypeEnumSelect, ItemsSelectType } from 'core'

export type TypeJson = {
  id?: number
  type: FieldTypeEnumSelect
  name: string
  label: string
  placeholder?: string
  optionsId?: number
  parents?: string[]
  optionsUrl?: string
  optionsOut?: ItemsSelectType[]
  value?: string | number
  onBlur?: () => void
  disabled?: boolean
  validations?: {
    max_chars?: number
    min_chars?: number
    max_value?: number
    min_value?: number
    required?: boolean
    unique?: boolean
    min_currency?: number
    file_type?: string
    max_size?: number
  }
}
