import { Switch, styled } from '@mui/material'
import { CardSwichStyles } from '../styles/cardSwichStyles'

export const CardSwitch = styled(Switch)(({ theme }) => ({
  ...CardSwichStyles(theme).switch,
}))
