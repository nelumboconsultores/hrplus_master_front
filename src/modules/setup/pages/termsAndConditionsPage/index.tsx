import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Checkbox, Chip, Grid, Paper, Typography } from '@mui/material'

import {
  AppContext,
  FontName,
  PathName,
  Variant,
  getLocalStorage,
  keyImg,
  saveLocalStorage,
} from 'core'
import { getSetting, saveSettings } from 'core/services'
import { useTranslation } from 'react-i18next'
import { dateToSpanish } from 'core/utils/textFormat'

export const TermsAndConditionsPage = () => {
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const { t } = useTranslation()
  const [isChecked, setIsChecked] = useState(false)
  const [licenseTo, setLicenseTo] = useState('')

  const saveSetting = async () => {
    const body = {
      column: 'accepted_terms',
      value: 'true',
    }
    const response = await saveSettings(body)

    if (response.error) {
      setActMessage({
        type: Variant.error,
        message: t('authentication.alertError'),
      })
    } else {
      const dataLogin = getLocalStorage()
      if (dataLogin) {
        saveLocalStorage({ ...dataLogin, isAcceptedTerms: true })
      }
      navigate(`${PathName.LocationView}`, { state: { stateData: 'stateData' } })
    }
  }
  const getSettings = async () => {
    const response = await getSetting()
    if (response.data) {
      if (response.data.data && response.data.data.acceptedTerms) {
        setIsChecked(true)
        setLicenseTo(response.data.data.licenseTo)
      }
    }
  }

  useEffect(() => {
    getSettings()
  }, []) //eslint-disable-line
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid
        item
        xs={12}
        lg={5.5}
        sx={{ display: 'flex', paddingTop: '20px', paddingBottom: { md: '30px', lg: '0px' } }}
      >
        <Grid container sx={{ alignItems: 'flex-end' }}>
          <Grid item xs={12}>
            <Chip
              label="TERMINOS Y CONDICIONES"
              variant="filled"
              sx={{
                backgroundColor: '#333333',
                color: 'white',
                fontSize: '12px',
                fontFamily: FontName.RobotoRegular,
                padding: '4px',
                marginBottom: '20px',
                borderRadius: '8px',
              }}
            />
            <Typography
              sx={{
                color: '#333333',
                fontSize: '30px',
                fontFamily: FontName.RobotoMedium,
              }}
            >
              Revisemos los términos
            </Typography>
            <Typography
              sx={{
                color: '#333333',
                fontSize: '30px',
                fontFamily: FontName.RobotoMedium,
                marginBottom: '80px',
              }}
            >
              de tu licencia Check+
            </Typography>

            <Paper sx={{ padding: '20px', position: 'relative' }}>
              <Box
                sx={{
                  width: '200px',
                  height: '75px',
                  position: 'absolute',
                  top: '-64px',
                  left: '-24px',
                }}
              >
                <img src={keyImg.premiun} alt="Logo" style={{ width: '100%', height: '100%' }} />
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                <Typography
                  sx={{
                    color: '#686868',
                    fontSize: '16px',
                    fontFamily: FontName.RobotoRegular,
                    paddingRight: '10px',
                  }}
                >
                  Vence:
                </Typography>
                <Typography
                  sx={{
                    color: '#24A9E2',
                    fontSize: '16px',
                    fontFamily: FontName.RobotoBold,
                  }}
                >
                  {licenseTo && dateToSpanish(licenseTo)}
                </Typography>
              </Box>

              <Typography
                sx={{
                  color: '#333333',
                  fontSize: '16px',
                  fontFamily: FontName.RobotoRegular,
                  marginBottom: '10px',
                }}
              >
                Tu licencia te permite Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </Typography>
              <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                <Checkbox
                  color="primary"
                  checked={isChecked}
                  onChange={(event) => setIsChecked(event.target.checked)}
                />
                <Typography
                  sx={{
                    color: '#3C3C3C',
                    fontSize: '14px',
                    paddingTop: '10px',
                    fontFamily: FontName.RobotoRegular,
                  }}
                >
                  He leído y acepto los términos y condiciones de uso
                </Typography>
              </Box>
              <Button
                variant={'contained'}
                color={'secondary'}
                sx={{ width: '120px', height: '42px' }}
                disabled={!isChecked}
                onClick={saveSetting}
              >
                Continuar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} lg={5.5}>
        <Paper sx={{ height: '100%' }}>
          <Typography
            sx={{
              padding: '20px 40px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              '&&::-webkit-scrollbar': { width: '4px' },
              '&&::-webkit-scrollbar-thumb': {
                background: 'rgba(0,0,0,.3)',
                borderRadius: '3px',
              },
            }}
          >
            Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
            Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
            cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una
            galería de textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno
            en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado
            en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus
            PageMaker, el cual incluye versiones de Lorem Ipsum. ¿Por qué lo usamos? Es un hecho
            establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto
            de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una
            distribución más o menos normal de las letras, al contrario de usar textos como por
            ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se
            puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum
            como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por
            resultado muchos sitios web que usan este texto si se encuentran en estado de
            desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por
            accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el
            estilo). Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de
            texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año
            1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó
            una galería de textos y los mezcló de tal manera que logró hacer un libro de textos
            especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno
            en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado
            en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de
            Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus
            PageMaker, el cual incluye versiones de Lorem Ipsum. ¿Por qué lo usamos? Es un hecho
            establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto
            de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una
            distribución más o menos normal de las letras, al contrario de usar textos como por
            ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se
            puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum
            como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por
            resultado muchos sitios web que usan este texto si se encuentran en estado de
            desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por
            accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el
            estilo).
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}
