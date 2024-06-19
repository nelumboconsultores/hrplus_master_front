import { Box, Button, ButtonProps } from '@mui/material'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'

type GrayFooterProps = {
  buttonOne: ButtonProps
  buttonTwo: ButtonProps
}

export const GrayFooter: React.FC<GrayFooterProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.containerButtons}>
      <Button {...props.buttonOne} type="submit">
        {t('operatingLevel.button.save')}
      </Button>
      <Button {...props.buttonTwo} color="secondary">
        {t('operatingLevel.button.finish')}
      </Button>
    </Box>
  )
}
