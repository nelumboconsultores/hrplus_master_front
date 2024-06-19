import { InputsEnum, ItemsSelectType, ValueEnum } from 'core'

export type DynamicFormType = Array<ItemDynamicFormType>

export type ItemDynamicFormType = {
  label: string
  type: InputsEnum
  placeHolder: string
  name: string
  hidden?: boolean
  disabled?: boolean
  options?: Array<ItemsSelectType>
  fathers?: Array<string>
  url?: string
  validations?: ValidationsDynamicType
  getOptions?: (id: string) => Promise<ItemsSelectType[]>
  getHierarchyOptions?: (url: string, fatherValue: string) => Promise<ItemsSelectType[]>
  disabledDelete?: boolean
  value?: string | number | boolean | undefined | { label: string; value: number }
}

export type ValidationsDynamicType = {
  type: ValueEnum
  message: string
  required?: boolean
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  min?: { value: number; message: string }
  max?: { value: number; message: string }
}
