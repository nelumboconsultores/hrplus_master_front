import { ValueEnum } from 'core'

export type SectionType = {
  id: number
  name: string
  title: string
  weight: number
  position: number
  validations: {
    type: ValueEnum
  }
}
