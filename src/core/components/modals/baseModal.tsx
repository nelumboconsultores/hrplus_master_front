import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { IconButton } from '@mui/material'
import { icons } from 'core/utils'
import { useStyles } from './useStyles'
import { BaseModalProps } from 'core/types/baseModalProps.type'

export const BaseModal: React.FC<BaseModalProps & { disableClose?: boolean }> = ({
  onClose,
  width,
  borderRadius,
  disableClose,
  ...props
}) => {
  const { modalGeneral, iconClose } = useStyles(Boolean(onClose), width, borderRadius)

  const handleOnClose: BaseModalProps['onClose'] = (e, reason) => {
    if (onClose) {
      if ((reason === 'backdropClick' || reason === 'escapeKeyDown') && disableClose) return
      onClose(e, reason)
    }
  }
  return (
    <Modal {...props} onClose={handleOnClose}>
      <Box sx={modalGeneral} className={'chBaseModal'}>
        {onClose && !disableClose && (
          <IconButton sx={iconClose} disableRipple onClick={() => onClose({}, 'backdropClick')}>
            {icons.close}
          </IconButton>
        )}

        {props.children}
      </Box>
    </Modal>
  )
}
