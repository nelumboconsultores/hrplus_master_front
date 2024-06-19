import { Box, Button, Typography } from '@mui/material'
import { BaseModal, ConfirmationModal, FontName, keyImg } from 'core'
import { useTranslation } from 'react-i18next'

type LocationModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onFetch: () => void | Promise<void>
  isSetup: boolean
  isFetching: boolean
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isSetup,
  onFetch,
  open,
  setOpen,
  isFetching,
}) => {
  const { t } = useTranslation()
  if (!isSetup) {
    return (
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        isFetching={isFetching}
        description={t('location.modal.confirmUpdate')}
        onConfirm={onFetch}
      />
    )
  }
  return (
    <BaseModal open={open} width={'438px'}>
      <Box>
        <Box sx={{ width: '100%', height: '50vh' }}>
          <img
            src={keyImg.setupStart}
            alt="Logo"
            style={{ width: '100%', height: '100%', padding: '0px 20px' }}
          />
        </Box>
        <Box sx={{ padding: '10px 55px', textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: '25px',
              fontFamily: FontName.RobotoBold,
              color: '#000000',
              marginBottom: '16px',
            }}
          >
            Ya estamos listos!
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontFamily: FontName.RobotoRegular,
              color: '#333333',
              marginBottom: '16px',
            }}
          >
            Vamos a acompañarte en el recorrido de todas nuestras funcionalidades para asegurarnos
            que saques el mejor provecho, y configures los parámetros para solventar tus necesidades
          </Typography>
        </Box>
        <Box sx={{ padding: '2px 40px 20px', textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button
              variant="text"
              onClick={onFetch}
              sx={{
                fontFamily: FontName.RobotoRegular,
                fontSize: '14px',
                color: '#24A9E2',
                textTransform: 'capitalize',
                marginRight: '8px',
              }}
            >
              Omitir
            </Button>
            <Button
              variant={'contained'}
              color={'secondary'}
              onClick={onFetch}
              sx={{ width: '140px', height: '38px' }}
            >
              CONTINUAR
            </Button>
          </Box>
        </Box>
      </Box>
    </BaseModal>
  )
}
