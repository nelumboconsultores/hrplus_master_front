import { SelectProps } from '@mui/material'
import { typeRQ } from 'core'
import { ControllerProps } from 'react-hook-form'

export type DropdownColorProps = {
  services: {
    getAll: ServicesConfig
    get: ServicesConfig
    edit: ServicesConfig
    create: ServicesConfig
    delete: ServicesConfig
  }
  onEventTypeChange?: (eventType: number) => void
  isFestivo?: boolean
  defaultValue?: boolean
  controlProps: Omit<ControllerProps, 'render'>
  selectProps?: Omit<SelectProps, 'children'> & { helpertext?: string }
  required?: boolean
  /*  onFinish?: () => void */
}

export type ServicesConfig = { path: string; type: typeRQ }
