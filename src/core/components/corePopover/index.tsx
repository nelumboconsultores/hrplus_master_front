import { Popover, PopoverProps } from '@mui/material'

type CorePopoverProps = PopoverProps

export const CorePopover: React.FC<CorePopoverProps> = (props) => {
  return <Popover {...props} />
}
