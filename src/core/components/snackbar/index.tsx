import { Alert, AlertColor, Snackbar } from '@mui/material'
import { AppContext } from 'core'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const SnackbarComponent = () => {
  const { actMessage, setActMessage } = useContext(AppContext)
  const { code, elementInsertError, message, type } = actMessage ?? {}
  const [show, setShow] = useState(false)
  const { t } = useTranslation()
  const onClose = () => {
    setShow(false)
    sleep(40).then(() => setActMessage(undefined))
  }
  const returnLabel = () => {
    if (code) return prepareMessageError() ?? t('general.validations.errorService')
    if (message) return elementInsertError ? message.replace('xxxxxx', elementInsertError) : message
    return t('general.validations.errorService')
  }
  const prepareMessageError = () => {
    if (!code) return
    let message = t(`errorCodes.${code}`)
    if (elementInsertError) message = message.replace('xxxxxx', elementInsertError)
    return message.includes(code) ? undefined : message
  }

  useEffect(() => setShow(Boolean(actMessage)), [actMessage])
  return (
    <Snackbar
      open={show}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={(type as AlertColor) ?? 'info'} sx={{ width: '100%' }}>
        {returnLabel()}
      </Alert>
    </Snackbar>
  )
}
