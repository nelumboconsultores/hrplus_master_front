import { ModalProps } from '@mui/material'

export type BaseModalProps = Omit<ModalProps, 'children'> & {
  children: React.ReactNode
  width?: string | number
  borderRadius?: number
}
