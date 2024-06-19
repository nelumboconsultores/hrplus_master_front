import { ConfirmationModal } from 'core'

type SaveWorkingModalProps = {
  open: boolean
  setOpen: (value: boolean) => void
  handleUpdate: () => void
}

export const SaveWorkingModal: React.FC<SaveWorkingModalProps> = (props) => {
  const { open, setOpen, handleUpdate } = props

  return (
    <ConfirmationModal
      open={open}
      onClose={() => {
        setOpen(false)
      }}
      description={`¿Esta seguro de querer actualizar la información de ${'editSelection.length'} usuarios?`}
      onConfirm={handleUpdate}
      title="Confirmación"
    />
  )
}
