import { IconButton, IconButtonProps, Tooltip, TooltipProps } from '@mui/material'

type CapitalIconButtonProps = IconButtonProps & {
  title: TooltipProps['title']
  href?: string
  target?: string
}
export const CapitalIconButton: React.FC<CapitalIconButtonProps> = ({ title, ...rest }) => (
  <Tooltip title={rest.disabled ? '' : title}>
    <IconButton {...rest} />
  </Tooltip>
)
