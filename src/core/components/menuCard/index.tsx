import { Icon, Paper, Typography, PaperProps } from '@mui/material'
import { styles } from './styles'
import { useNavigate } from 'react-router-dom'

type MenuCardProps = {
  item: {
    icon?: { img: React.ReactElement; color: string }
    name?: string
    render?: () => React.ReactElement
    url?: string
    disabled?: boolean
    click?: () => void
  }
  sx?: PaperProps['sx']
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, sx }) => {
  const { icon, name, render, url, disabled, click } = item

  const navigate = useNavigate()
  if (render) return render()

  const redirection = () => {
    if (disabled) return
    navigate(url ?? '#')
    if (click) click()
  }

  const paperStyles: PaperProps['sx'] = { ...styles.container, ...(sx ?? Object({})) }

  return (
    <Paper
      className={`btn ${disabled ? 'containerDisabled' : ''}`}
      elevation={2}
      sx={paperStyles}
      onClick={redirection}
    >
      <Icon className={disabled ? 'disabled' : ''} sx={{ ...styles.icon, color: icon?.color }}>
        {icon?.img}
      </Icon>
      <Typography className={disabled ? 'disabled' : ''} sx={styles.font}>
        {name}
      </Typography>
    </Paper>
  )
}
