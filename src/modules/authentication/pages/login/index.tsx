import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Checkbox, FormControlLabel, Typography, TypographyProps } from '@mui/material'
import {
  AlertComponent,
  AppContext,
  InputPassword,
  InputRoot,
  PathName,
  isNull,
  saveLocalStorage,
  useValidations,
} from 'core'
import { MainTitle, WrapperBackground } from 'modules/authentication/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { login } from 'core/services'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { keyImg } from 'core'
type FormInput = {
  email: string | number
  password: string
}

const Login = () => {
  const { val } = useValidations()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorEmail, setErrorEmail] = useState(false)
  const [msgError, setMsgError] = useState('')
  const { setIsAuthenticated } = useContext(AppContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(
      z.object({
        password: val.password,
        email: val.e,
      }),
    ),
  })
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const { data: res, error } = await login(data)
    setLoading(false)
    if (res) {
      const canSetup = !isNull(res.data.acceptedTerms) && !isNull(res.data.finishedLocalization)
      const noAreConfirmed = !res.data.acceptedTerms || !res.data.finishedLocalization
      const dataLogin = {
        token: res.data.token,
        refreshToken: res.data.refreshToken,
        isAcceptedTerms: res.data.acceptedTerms,
        isFinishedLocalization: res.data.finishedLocalization,
        canSetup,
      }
      saveLocalStorage(dataLogin)
      setIsAuthenticated(true)

      if (canSetup && noAreConfirmed) navigate(PathName.Setup)
      else navigate(PathName.Home)
    }

    if (error) {
      if (error.errors?.code === 'C01') {
        setMsgError(t('authentication.error.invalidEmailOrPassword'))
      } else if (error.errors?.code === 'C01USER02') {
        setMsgError(t('authentication.error.invalidEmailOrPassword'))
      } else if (error.errors?.code === 'C01USER04') {
        setMsgError(t('authentication.error.theUserIsSuspended'))
      } else if (error.errors?.code === 'C01USER03') {
        setMsgError(t('authentication.error.theUserIsSuspended'))
      } else {
        setMsgError(t('authentication.error.invalidEmailOrPassword'))
      }

      setErrorEmail(true)
    }
  }

  return (
    <WrapperBackground img={keyImg.authImg}>
      <Box sx={styles.logo}>
        <img src={keyImg.logoCheck} alt="Logo" style={{ width: '100%', height: '100%' }} />
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.conHead}>
          <MainTitle marginBottom={'4px'}>{t('authentication.title.welcomeTo')}</MainTitle>
          {/* <Typography sx={styles.textHead}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna.
          </Typography> */}
        </Box>

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

            <InputPassword
              {...register('password')}
              label={t('authentication.input.contrasena')}
              inputProps={{ maxLength: 75 }}
              error={!!errorEmail || !!errors.password}
              helperText={errorEmail || errors.password?.message}
              InputLabelProps={{ sx: styles.input }}
            />
            {errorEmail && <AlertComponent>{msgError}</AlertComponent>}
            <Box sx={styles.down}>
              <FormControlLabel
                control={<Checkbox />}
                label={t('authentication.input.rememberMeOnThisDevice')}
                slotProps={{
                  typography: styles.checkboxText as TypographyProps,
                }}
              />
              <LoadingButton loading={loading} variant="contained" type="submit" sx={styles.start}>
                {t('authentication.button.start')}
              </LoadingButton>
            </Box>
          </Box>
        </form>

        <Typography
          sx={styles.textDown}
          onClick={() => {
            navigate(PathName.RecoverAccount)
          }}
        >
          {t('authentication.question.youNeedHelp')}
        </Typography>
      </Box>
    </WrapperBackground>
  )
}

export default Login
