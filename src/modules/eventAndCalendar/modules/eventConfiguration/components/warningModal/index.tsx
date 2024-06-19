import { ConfirmationModal } from 'core'

type WarningModalProps = {
  open: boolean
  onClose: () => void
  onConfirmen: () => void
  onCancel: () => void
}

export const WarningModal: React.FC<WarningModalProps> = ({
  onClose,
  open,
  onConfirmen,
  onCancel,
}) => {
  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      title="Se perderán los datos"
      description="Si realiza esta acción se perderán los datos guardados hasta el momento"
      onConfirm={onConfirmen}
      onCancel={onCancel}
    />
  )
}
