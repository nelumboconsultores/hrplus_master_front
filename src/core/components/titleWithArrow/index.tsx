import React from 'react'
import { Box, Typography } from '@mui/material'
import { styles } from './styles'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'

type TitleWithArrowProps = {
  titles: string[]
  subtitles: string[]
}

export const TitleWithArrow: React.FC<TitleWithArrowProps> = (props) => {
  return (
    <Box sx={{ ...styles.container, flexWrap: 'wrap' }}>
      {props.titles.map((title, index) => (
        <Box key={index} sx={{ ...styles.titleBlock, maxWidth: '400px', paddingBottom: '10px' }}>
          <Box>
            <Typography lineHeight={1} sx={styles.title}>
              {title}
            </Typography>
            <Typography lineHeight={1} sx={styles.subtitle}>
              {props.subtitles[index]}
            </Typography>
          </Box>
          {index < props.titles.length - 1 && (
            <Box sx={styles.arrow}>
              <ArrowForwardOutlinedIcon />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
