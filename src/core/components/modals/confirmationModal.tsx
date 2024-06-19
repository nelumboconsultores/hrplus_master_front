import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import { BaseModal } from 'core'
import { styles } from './styles'

type ConfirmationModalProps = {
  open: boolean
  onClose?: () => void
  onConfirm: () => void
  title?: string
  description: string
  cancelText?: string
  confirmText?: string
  isFetching?: boolean
  onCancel?: () => void
  disableClose?: boolean
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  const { cancelText = 'Cancelar', confirmText = 'Aceptar', isFetching, onCancel } = props

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    if (props.onClose) {
      props.onClose()
    }
  }
  return (
    <BaseModal
      open={props.open}
      onClose={props.onClose}
      width={350}
      sx={{ '& .chBaseModal': { overflow: 'hidden' } }}
      disableClose={props.disableClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '0.9rem',
            color: 'grey.600',
          }}
        >
          {props.title}
        </Typography>
        <Typography
          color={'GrayText'}
          sx={{ fontSize: '0.8rem', textAlign: 'center', lineHeight: '1.1rem' }}
        >
          {props.description}
        </Typography>
      </Box>

      <ButtonGroup variant="outlined" sx={styles.containerButtons}>
        <Button
          onClick={props.onConfirm}
          color="primary"
          fullWidth
          sx={styles.buttonsL}
          disabled={isFetching}
        >
          {confirmText}
        </Button>
        {!!onCancel && (
          <Button
            onClick={handleCancel}
            color="error"
            fullWidth
            sx={styles.buttonsR}
            disabled={isFetching}
          >
            {cancelText}
          </Button>
        )}
      </ButtonGroup>
    </BaseModal>
  )
}
