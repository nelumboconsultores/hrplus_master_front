import React from 'react'
import { Icon, Paper, Typography, PaperProps, Box } from '@mui/material'
import { styles } from './styles'
import { useNavigate } from 'react-router-dom'

type MenuCardProps = {
  item: {
    icon?: { img: React.ReactElement; color: string }
    name?: string
    weight?: number
    render?: () => React.ReactElement
    url?: string
    disabled?: boolean
    click?: () => void
  }
  sx?: PaperProps['sx']
}

export const PercentageCard: React.FC<MenuCardProps> = ({ item, sx }) => {
  const { icon, name, url, click, weight } = item
  const navigate = useNavigate()

  const redirection = () => {
    if (weight === 0) return
    navigate(url ?? '#')
    if (click) click()
  }

  const conditionalStyles = weight && weight > 0 ? styles.hoverStyles : undefined
  const paperStyles: PaperProps['sx'] = { ...styles.container, ...(sx ?? Object({})) }

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        height: '100%',
        borderRadius: '12px',
        ...conditionalStyles,
      }}
    >
      <Box
        className={`btn paper ${weight === 0 ? 'containerDisabled' : ''}`}
        sx={paperStyles}
        onClick={redirection}
      >
        <Icon
          className={weight === 0 ? 'disabled' : ''}
          sx={{ ...styles.icon, color: icon?.color }}
        >
          {icon?.img}
        </Icon>
        <Typography className={weight === 0 ? 'disabled' : ''} sx={styles.font}>
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          ...styles.box,
          background: item.weight ? '#24a9e2' : '#e0e0e0',
        }}
      >
        {weight && weight > 0 ? weight + '%' : '?'}
      </Box>
    </Paper>
  )
}
