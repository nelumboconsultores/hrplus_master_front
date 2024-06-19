import { Button, Icon, Typography } from '@mui/material'
import { icons } from 'core'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
type ButtonBackProps = {
  click: () => void
}

export const ButtonBack: React.FC<ButtonBackProps> = (props) => {
  const { click, ...rest } = props
  const { t } = useTranslation()

  return (
    <Button sx={styles.container} onClick={click} variant="text" {...rest}>
      <Icon sx={styles.iconStyles}>{icons.arrowBack}</Icon>
      <Typography>{t('creationRecords.button.return')}</Typography>
    </Button>
  )
}
