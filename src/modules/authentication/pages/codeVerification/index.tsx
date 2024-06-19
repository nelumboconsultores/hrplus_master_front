import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import {
  AlertComponent,
  AppContext,
  BaseModal,
  InputPassword,
  PathName,
  Variant,
  icons,
  useValidations,
} from 'core'
import { MainTitle, WrapperBackground } from 'modules/authentication/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import {
  authPasswordRecover,
  emailCode,
  passwordRecovery,
  passwordRecoveryCancel,
} from 'core/services'
import { useNavigate } from 'react-router-dom'
import { SetStateAction, useContext, useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { keyImg } from 'core'
import ReactCodeInput from 'react-code-input'
import { obscureEmail } from 'core/utils/obscureEmail'

type FormInput = {
  password: string
  passwordConfirmation: string
}

const CodeVerification = () => {
  const { val } = useValidations()
  const [loading, setLoading] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [seePassword, setSeePassword] = useState(false)
  const [loadingForwarding, setLoadingForwarding] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [msgError, setMsgError] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorUpdatePass, setErrorUpdatePass] = useState(false)
  const { saveEmail, setSaveEmail, setActMessage } = useContext(AppContext)
  const [code, setCode] = useState('')

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInput>({
    resolver: zodResolver(
      z
        .object({
          password: val.password,
          passwordConfirmation: z.string(),
        })
        .refine((data) => data.password === data.passwordConfirmation, {
          message: t('authentication.passMatch'),
          path: ['passwordConfirmation'],
        }),
    ),
  })

  useEffect(() => {
    if (saveEmail === '') {
      navigate(PathName.Login)
    }
  }, [saveEmail]) //eslint-disable-line
  const handleCodeChange = async (value: SetStateAction<string>) => {
    if (value.length === 6) {
      setLoadingCode(true)
      setCode(value)

      const body = {
        email: saveEmail,
        accessCode: code || (value as string),
        app: false,
      }
      const response = await passwordRecovery(body)

      if (response.data) {
        setSuccessful(true)
        setLoadingCode(false)
        setErrorEmail(false)
        setSeePassword(true)
      }
      if (response.error) {
        if (response.error.errors.code === 'C01USRP06') {
          setMsgError(t('authentication.codeBlocked'))
        } else if (response.error.errors.code === 'C01USRP03') {
          setMsgError(t('authentication.codeBlocked'))
        } else if (response.error.errors.code === 'C01USRP05') {
          setMsgError(t('authentication.error.code'))
        } else {
          setMsgError(t('authentication.alertError'))
        }
        setSeePassword(false)
        setSuccessful(false)
        setErrorEmail(true)
        setLoadingCode(false)
      }
    }
  }

  const handleFormSubmit = async () => {
    setLoadingForwarding(true)
    const body = {
      email: saveEmail,
      app: false,
    }
    const response = await emailCode(body)
    setLoadingForwarding(false)
    if (response.data) {
      setActMessage({
        type: Variant.success,
        message: t('authentication.alertSucces'),
      })
    }

    if (response.error) {
      setActMessage({
        type: Variant.error,
        message: t('authentication.alertError'),
      })
    }
    setLoadingForwarding(false)
  }
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setLoading(true)
    const body = {
      email: saveEmail,
      password: data.password,
      confirmPassword: data.passwordConfirmation,
      app: false,
    }

    const response = await authPasswordRecover(body)
    setLoading(false)
    if (response.data) {
      setErrorUpdatePass(false)
      setOpen(true)
    }
    if (response.error) {
      setErrorUpdatePass(true)
      setOpen(false)
    }
  }

  const handleUpdate = () => {
    setOpen(false)
    setSaveEmail('')
    navigate(PathName.Login)
  }

  const handleDelete = async () => {
    const body = {
      email: saveEmail,
      accessCode: '',
      app: false,
    }
    await passwordRecoveryCancel(body)
    navigate(PathName.Login)
  }
  return (
    <>
      <WrapperBackground img={keyImg.authImg}>
        <Box sx={styles.logo}>
          <img src={keyImg.logoCheck} alt="Logo" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box sx={styles.container}>
          {seePassword && (
            <Box sx={styles.conHead}>
              <MainTitle marginBottom={'4px'} marginTop={'10px'}>
                {t('authentication.resetPassword')}
              </MainTitle>
              <Typography sx={styles.textHead}>{t('authentication.newPassword')}</Typography>
            </Box>
          )}
          {!seePassword && (
            <>
              {' '}
              <Box sx={styles.conHead}>
                <MainTitle marginBottom={'4px'} marginTop={'10px'}>
                  {t('authentication.verification')}
                </MainTitle>
                <Typography sx={styles.textHead}>
                  {t('authentication.codeinsert')} {obscureEmail(saveEmail)}
                </Typography>
              </Box>
              <Box>
                <ReactCodeInput
                  type="text"
                  fields={6}
                  value={code}
                  onChange={handleCodeChange}
                  autoFocus
                  inputStyle={{
                    width: '40px',
                    color: '#707070',
                    marginLeft: '10px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontSize: '22px',
                    height: '60px',
                    backgroundColor: '#e2e2e2',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                  name={''}
                  inputMode={'email'}
                />

                {loadingCode && (
                  <Box sx={styles.loading}>
                    <CircularProgress size={20} sx={{ marginRight: '10px' }} />
                  </Box>
                )}
                {successful && !seePassword && <Box sx={styles.check}>{icons.check}</Box>}
              </Box>
              {errorEmail && <AlertComponent>{msgError}</AlertComponent>}
            </>
          )}

          {seePassword && (
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <Box sx={styles.containerForm}>
                <InputPassword
                  {...register('password')}
                  label={t('authentication.input.newPass')}
                  error={!!errorEmail || !!errors.password}
                  inputProps={{ maxLength: 75 }}
                  helperText={errorEmail || errors.password?.message}
                  InputLabelProps={{ sx: styles.input }}
                />

                <InputPassword
                  {...register('passwordConfirmation')}
                  label={t('authentication.input.confirmPass')}
                  inputProps={{ maxLength: 75 }}
                  error={!!errorEmail || !!errors.passwordConfirmation}
                  helperText={errorEmail || errors.passwordConfirmation?.message}
                  InputLabelProps={{ sx: styles.input }}
                />
                {errorUpdatePass && (
                  <AlertComponent>{t('authentication.alertPass')}</AlertComponent>
                )}
                <Box sx={styles.down}>
                  <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    sx={styles.start}
                  >
                    {t('authentication.acept')}
                  </LoadingButton>
                </Box>
              </Box>
            </form>
          )}
          {!seePassword && (
            <Button
              variant="text"
              color="primary"
              disabled={loadingForwarding}
              sx={{ textDecoration: 'underline', textTransform: 'capitalize', fontSize: '12px' }}
              onClick={handleFormSubmit}
            >
              {t('authentication.codeVerification')}
            </Button>
          )}

          <Box></Box>
        </Box>

        <Typography sx={styles.textDown} onClick={handleDelete}>
          {t('authentication.cancel')}
        </Typography>
      </WrapperBackground>
      <BaseModal
        open={open}
        width={'350px'}
        onClose={() => {
          handleUpdate()
        }}
      >
        <Box sx={styles.containerModal}>
          <Box sx={{ width: '150px', height: '150px', padding: '10px' }}>
            <img src={keyImg.dog} alt="Logo" style={{ width: '100%', height: '100%' }} />
          </Box>
          <Typography lineHeight={1.3} sx={styles.textModal}>
            {t('authentication.updatePass')}
          </Typography>
          <Typography lineHeight={1.3} sx={styles.subTextModal}>
            {t('authentication.successPass')}
          </Typography>
          <Box sx={{ marginTop: '30px' }}>
            <Button onClick={handleUpdate}> {t('authentication.start')}</Button>
          </Box>
        </Box>
      </BaseModal>
    </>
  )
}

export default CodeVerification
