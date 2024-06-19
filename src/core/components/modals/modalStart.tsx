import { Box, Button, Typography } from '@mui/material'
import { BaseModal } from '.'
import { BaseModalProps } from 'core/types/baseModalProps.type'
import { styles } from './styles'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type ModalStartProps = {
  title: string
  description?: string
  textButton?: string
  clickButton?: () => void
  onClose?: () => void
  buttonOneProps?: LoadingButtonProps
  disableOnClose?: boolean
  onReturn?: () => void
} & Omit<BaseModalProps, 'children'>

export const ModalStart: React.FC<ModalStartProps> = ({
  description,
  title,
  textButton,
  clickButton,
  onClose,
  buttonOneProps,
  disableOnClose = false,
  ...props
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleReturn = () => {
    if (props.onReturn) props.onReturn()
    else navigate(-1)
  }
  return (
    <BaseModal
      {...props}
      onClose={onClose}
      width={'460px'}
      borderRadius={2}
      disableClose={disableOnClose}
    >
      <Box sx={styles.containerModalStart}>
        <Typography sx={{ color: 'primary.900', fontWeight: 600 }}>{title}</Typography>
        <Typography variant="grayText">{description}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Button onClick={handleReturn} variant="text" sx={{ padding: 0 }}>
            {t('general.button.doItLater')}
          </Button>
          <LoadingButton
            {...buttonOneProps}
            variant="contained"
            onClick={clickButton}
            color="secondary"
          >
            {textButton}
          </LoadingButton>
        </Box>
      </Box>
    </BaseModal>
  )
}
