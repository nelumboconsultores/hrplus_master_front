import { ConfirmationModal } from 'core'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

type SaveWorkingModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  handleUpdate: () => void
}

export const ConfirmationWorkingModal: React.FC<SaveWorkingModalProps> = (props) => {
  const { open, setOpen, handleUpdate } = props
  const { profileIds } = useContext(UsersContext)
  const { t } = useTranslation()
  return (
    <ConfirmationModal
      open={open}
      onClose={() => setOpen(false)}
      description={t('users.msg.messageConfirmation', { length: profileIds.length })}
      onConfirm={handleUpdate}
      title="Confirmación"
    />
  )
}
