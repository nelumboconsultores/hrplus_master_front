import { Box, Typography } from '@mui/material'
import { styles } from './styles'

type NameBoldProps = { value: string }

export const NameBold: React.FC<NameBoldProps> = ({ value }) => (
  <Box>
    <Typography sx={styles.text}>{value}</Typography>
  </Box>
)
