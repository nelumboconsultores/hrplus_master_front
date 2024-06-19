import { Typography } from '@mui/material'
import { useStyles } from './useStyles'
import { useTranslation } from 'react-i18next'
type StateComponentProps = {
  value: boolean
}
export const StateComponent: React.FC<StateComponentProps> = ({ value }) => {
  const { text } = useStyles(value)
  const { t } = useTranslation()

  const returnLabel = () =>
    value ? t('workingDays.table.active') : t('workingDays.table.inactive')

  return <Typography sx={text}>{returnLabel()}</Typography>
}
