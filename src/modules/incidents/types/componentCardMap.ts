import { DataCard } from '.'

export type TemplateCardProps = {
  /*  label: string
  isRequired: boolean
  switchIsRequired: boolean
  checkboxes?: CheckboxData[] | undefined
  amounts?: number
  sizes?: number
  list?: SelectData[]
  lists?: { label: string; value: number; id: string }[] */
  value: DataCard
}

/* type CheckboxData = {
  name: string
  checked: boolean
}

type SelectData = {
  label: string
  value: number
} */

export type CardPropsResponse = {
  type: string
  props: TemplateCardProps
}
