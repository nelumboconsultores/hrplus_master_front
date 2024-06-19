import { Box, Grid, Typography } from '@mui/material'
import { TemplateTextBlockProps } from '../../types/componentsMap'
import { styles } from './textRecordStyles'
import { FontName } from 'core'

export const TextRecord: React.FC<TemplateTextBlockProps> = ({ title, textRecordData }) => {
  const sortedData = textRecordData?.slice().sort((a, b) => a.position - b.position)
  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>
      {sortedData?.map((value) => (
        <Grid container key={value.id} sx={{ paddingBottom: '12px' }}>
          <Grid item xs={0.5}>
            <Box sx={styles.item}>
              <Typography
                sx={{ fontSize: '0.8rem', fontFamily: FontName.RobotoRegular, lineHeight: 1 }}
              >
                {value.position}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3.5} sx={styles.gridContainer}>
            <Box>
              <Typography sx={styles.text}>{value.actionType.name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Typography
              sx={{
                lineHeight: 1.2,
                fontFamily: FontName.RobotoRegular,
                color: '#333333',
                fontSize: '1rem',
              }}
            >
              {value.description}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  )
}
