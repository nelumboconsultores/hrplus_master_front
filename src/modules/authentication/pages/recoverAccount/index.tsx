import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Typography } from '@mui/material'
import { AlertComponent, AppContext, InputRoot, PathName, useValidations } from 'core'
import { MainTitle, WrapperBackground } from 'modules/authentication/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { authUserRecove, emailCode } from 'core/services'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { keyImg } from 'core'
import { isNotEmail, obscureEmail } from 'core/utils/obscureEmail'
type FormInput = {
  email: string
}

const RecoverAccount = () => {
  const { val } = useValidations()
  const [loading, setLoading] = useState(false)
  const [recover, setRecover] = useState('')
  const [msgError, setMsgError] = useState('')
  const [seeInput, setSeeInput] = useState(false)
  const [seeEmail, setSeeEmail] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorEmail, setErrorEmail] = useState(false)
  const { setSaveEmail } = useContext(AppContext)

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(
      z.object({
        email: val.e,
      }),
    ),
  })
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    if (recover === 'user') {
      const body = {
        email: data.email,
        app: false,
      }

      const { data: res } = await authUserRecove(body)
      if (res) {
        setErrorEmail(false)
        setSeeInput(false)
        setSeeEmail(true)
      }
    } else {
      const body = {
        email: data.email,
        app: false,
      }
      const response = await emailCode(body)
      if (response.data) {
        setSaveEmail(data.email)
        setErrorEmail(false)
        setSeeInput(false)
        setSeeEmail(true)
      }
      if (response.error) {
        if (response.error.errors?.code === 'C01USRP03') {
          setMsgError(t('authentication.noMoreAccessCodes'))
        } else {
          setMsgError(t('authentication.error.invalidEmailOrPassword'))
        }
        setErrorEmail(true)
      }
      setLoading(false)
    }
    setLoading(false)
  }

  const recoverNavigate = () => {
    if (recover === 'pass') {
      navigate(PathName.RestorePassword)
    } else {
      navigate(PathName.Login)
    }
  }

  return (
    <WrapperBackground img={keyImg.authImg}>
      <Box sx={styles.logo}>
        <img src={keyImg.logoCheck} alt="Logo" style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={styles.container}>
        {!seeEmail && (
          <Box sx={styles.conHead}>
            <MainTitle marginBottom={'4px'}>{t('authentication.help')}</MainTitle>
            <Typography sx={styles.textHead}>{t('authentication.option')}</Typography>
          </Box>
        )}

        {!seeInput && recover === '' && (
          <>
            {' '}
            <Button
              sx={styles.userBtn}
              onClick={() => {
                setSeeInput(true)
                setRecover('user')
              }}
            >
              {t('authentication.user')}
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setSeeInput(true), setRecover('pass')
              }}
              sx={styles.passBtn}
            >
              {t('authentication.password')}
            </Button>
            <Box></Box>
          </>
        )}
        {seeInput && (
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Box sx={styles.containerForm}>
              <InputRoot
                {...register('email')}
                label={t('authentication.input.enterEmailOrMacroPayID')}
                inputProps={{ maxLength: 75 }}
                error={!!errorEmail || !!errors.email}
                helperText={errors.email?.message}
                InputLabelProps={{ sx: styles.input }}
              />
              {errorEmail && <AlertComponent>{msgError}</AlertComponent>}
              <Box sx={styles.down}>
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  type="submit"
                  sx={styles.start}
                >
                  {t('authentication.send')}
                </LoadingButton>
              </Box>{' '}
            </Box>
          </form>
        )}
        {seeEmail && (
          <>
            <Box sx={styles.conHead}>
              <MainTitle marginBottom={'4px'}>{t('authentication.emailSuccess')}</MainTitle>
              {getValues('email') && (
                <Typography sx={styles.textHead}>
                  {t('authentication.emailSend')}{' '}
                  {isNotEmail(getValues('email')) ? 'ID Macropay' : 'correo'}{' '}
                  {obscureEmail(getValues('email'))}
                </Typography>
              )}
            </Box>
            <Box sx={styles.down}>
              <LoadingButton
                loading={loading}
                variant="contained"
                sx={styles.start}
                onClick={() => {
                  recoverNavigate()
                }}
              >
                {t('authentication.ok')}
              </LoadingButton>
            </Box>
          </>
        )}

        <Typography
          sx={styles.textDown}
          onClick={() => {
            navigate(PathName.Login)
          }}
        >
          {' '}
          {t('authentication.cancel')}
        </Typography>
      </Box>
    </WrapperBackground>
  )
}

export default RecoverAccount
