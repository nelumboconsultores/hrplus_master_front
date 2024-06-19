import { ConfirmationModal } from 'core'
import { useTranslation } from 'react-i18next'

type SaveGroupModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  handleUpdate: () => void
}

export const ConfirmationGroupModal: React.FC<SaveGroupModalProps> = (props) => {
  const { open, setOpen, handleUpdate } = props
  const { t } = useTranslation()
  return (
    <ConfirmationModal
      open={open}
      onClose={() => setOpen(false)}
      description={t('users.msg.messageConfirmationGroup')}
      onConfirm={handleUpdate}
      title="Confirmación"
    />
  )
}
