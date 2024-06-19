import { Variant } from 'core'

export type AlertMessType =
  | {
      message?: string
      type?: Variant
      code?: string
      elementInsertError?: string
    }
  | undefined
