import { Box, Tooltip } from '@mui/material'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { LoadingButton } from '@mui/lab'

export const ButtonSend = ({ text, loading }: { text: string; loading: boolean }) => {
  const { t } = useTranslation()
  const { profileIds } = useContext(UsersContext)
  return (
    <Tooltip title={profileIds.length < 1 ? t('users.tooltip') : ''}>
      <Box sx={styles.container}>
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          sx={styles.btn}
          disabled={profileIds.length === 0}
          loading={loading}
        >
          {text}
        </LoadingButton>
      </Box>
    </Tooltip>
  )
}
