import { ButtonProps } from '@mui/material'
import { InputSearchProps } from '.'

export type HeaderListProps = {
  children?: React.ReactElement
  title?: string
  subTitle?: string
  titleRender?: React.ReactNode
  buttonLabel?: string
  inputSearch?: boolean
  buttonProps?: ButtonProps
  buttonFilterProps?: ButtonProps
  buttonLabelFilter?: string
  buttonLabelDownload?: string
  buttonDownloadProps?: ButtonProps
  buttonLabelOpenFilter?: string
  buttonLabelOpenFilterProps?: ButtonProps
  buttonLabelCollaborators?: string
  buttonLabelCollaboratorsProps?: ButtonProps
  additionalButtonProps?: ButtonProps
  searchProps?: InputSearchProps & { getSearchValue: (value: string) => void }
  marginY?: number | string
}
