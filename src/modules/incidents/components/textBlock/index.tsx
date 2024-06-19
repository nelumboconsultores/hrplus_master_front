import { Box, Typography } from '@mui/material'
import { styles } from './textBlockStyles'
import { TemplateTextBlockProps } from '../../types/componentsMap'
import { transformTextInaSpanishParragraph } from 'core/utils/textFormat'

export const TextBlock: React.FC<TemplateTextBlockProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>

      {description && (
        <Typography lineHeight={1.3} sx={styles.descrip}>
          {transformTextInaSpanishParragraph(description.toLowerCase())}
        </Typography>
      )}
    </Box>
  )
}
