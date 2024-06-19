import { Box, Button, Typography } from '@mui/material'
import { FontName, PathName } from 'core'
import { WrapperBackground } from 'modules/authentication/components'

import { styles } from './styles'
import { keyImg } from 'core'
import { useNavigate } from 'react-router-dom'

export const SetupPage = () => {
  const navigate = useNavigate()
  const termsAndConditions = () => {
    navigate(PathName.Setup + PathName.TermsConditions)
  }
  return (
    <WrapperBackground img={keyImg.setup1}>
      <Box sx={{ position: 'absolute', top: '25px', right: '30px', width: '70px', height: '20px' }}>
        <img src={keyImg.logoCheck} alt="Logo" style={{ width: '100%', height: '100%' }} />
      </Box>

      <Box sx={styles.container}>
        <Box sx={{ width: '150px', height: '75px' }}>
          <img src={keyImg.macropayLogo} alt="Logo" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={{ display: 'flex', padding: '16px 2px' }}>
          <Typography
            sx={{
              fontSize: '25px',
              fontFamily: FontName.RobotoBold,
              color: '#333333',
              paddingRight: '8px',
            }}
          >
            Ahora{' '}
          </Typography>
          <Typography
            sx={{
              fontSize: '25px',
              fontFamily: FontName.RobotoBold,
              color: '#9F31F6',
              paddingRight: '8px',
            }}
          >
            Check+{' '}
          </Typography>
          <Typography sx={{ fontSize: '25px', fontFamily: FontName.RobotoBold, color: '#333333' }}>
            es tuya!{' '}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: '14px',
            fontFamily: FontName.RobotoRegular,
            color: ' #242021',
            paddingRight: '8px',
            padding: '12px 2px',
          }}
        >
          {' '}
          Gracias por confiar en nuestra plataforma para gestionar la calidad y rendimiento de tu
          empresa y del equipo de talento humano que hace que la magia ocurra!.
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontFamily: FontName.RobotoRegular,
            color: '#242021',
            paddingRight: '8px',
            paddingBottom: '12px',
          }}
        >
          {' '}
          Vamos a iniciar el asistente de configuración maestra con el que podrás configurar todos
          los parámetros claves para operar la plataforma y obtener el mayor provecho de cada una de
          las funciones que puedes acceder con tu licencia!
        </Typography>
        <Box sx={{ padding: '20px 0px' }}>
          <Button
            variant={'contained'}
            color={'secondary'}
            onClick={termsAndConditions}
            sx={{ width: '180px', height: '42px' }}
          >
            COMENCEMOS
          </Button>
        </Box>
      </Box>
      <Box>
        <Button
          variant="text"
          sx={{
            fontFamily: FontName.RobotoRegular,
            position: 'absolute',
            right: '14px',
            fontSize: '14px',
            color: '#24A9E2',
            textTransform: 'capitalize',
          }}
        >
          Necesito asistencia técnica
        </Button>
      </Box>
    </WrapperBackground>
  )
}
