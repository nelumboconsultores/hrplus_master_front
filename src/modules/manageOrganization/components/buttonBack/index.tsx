import { Box, Icon, Typography, ButtonBaseProps } from '@mui/material'
import { icons } from 'core'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
type ButtonBackProps = {
  click: () => void
  sx?: ButtonBaseProps['sx']
}

export const ButtonBack: React.FC<ButtonBackProps> = ({ click, sx }) => {
  const { t } = useTranslation()
  const style = { ...styles.returnButton, ...sx }
  return (
    <Box sx={style} onClick={click}>
      <Icon sx={styles.iconStyles}>{icons.arrowBack}</Icon>
      <Typography>{t('creationRecords.button.return')}</Typography>
    </Box>
  )
}
