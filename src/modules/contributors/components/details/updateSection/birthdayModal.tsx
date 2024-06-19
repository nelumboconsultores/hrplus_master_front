import { ConfirmationModal } from 'core'
import { useTranslation } from 'react-i18next'

type BirthdayModalProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const BirthdayModal: React.FC<BirthdayModalProps> = ({ showModal, setShowModal }) => {
  const { t } = useTranslation()
  return (
    <ConfirmationModal
      open={showModal}
      title={t('contributors.title.underAge')}
      description={t('contributors.messages.underAge')}
      onClose={() => setShowModal(false)}
      onConfirm={() => setShowModal(false)}
      disableClose
    />
  )
}
