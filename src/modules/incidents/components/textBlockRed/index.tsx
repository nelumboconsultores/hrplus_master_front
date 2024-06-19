import { Box, Typography } from '@mui/material'
import { styles } from './textBlockRedStyles'
import { TemplateTextBlockProps } from '../../types/componentsMap'

export const TextBlockRed: React.FC<TemplateTextBlockProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>

      <Typography sx={styles.descrip} lineHeight={1}>
        {description}
      </Typography>
    </Box>
  )
}
