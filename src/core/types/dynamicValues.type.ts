export type DynamicFormValues = {
  [fieldName: string]: DynamicFormValuesType
}

export type eventDynamicFormValues = {
  [fieldName: string]:
    | string
    | {
        url?: string
        name?: string
        description?: string
        type?: string
      }[]
}

export type DynamicFormValuesType =
  | string
  | number
  | boolean
  | number[]
  | Array<{ name: string; id: number }>
