import { Box, Typography } from '@mui/material'
import { styles } from './styles'

export const OnlyTitleTabs: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box sx={styles.onlyTitle}>
      <Typography className="title">{title}</Typography>
    </Box>
  )
}
