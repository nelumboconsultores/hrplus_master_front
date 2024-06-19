import { FieldTypeEnumSelect } from 'core/enum'
import { ItemsSelectType } from './itemsSelect.types'
import { DynamicFieldValues } from './dinamicFieldValues.type'

export type ReturnInputFields = {
  type: FieldTypeEnumSelect
  optionsId?: number
  optionsOut?: ItemsSelectType[]
  name: string
  label: string
  placeHolder?: string
  validations?: DynamicFieldValues
  parents?: string[]
  optionsUrl?: string
  value?: string | number
  disabled?: boolean
  onBlur?: () => void
}
