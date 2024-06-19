import { darken } from '@mui/material'
import { SxStyles } from 'core'

export const useStyles = (color: string): SxStyles<'root' | 'text'> => {
  const hexaColor = `#${color}`

  return {
    root: {
      backgroundColor: `${hexaColor}`,
      borderRadius: '5px',
      padding: 0.5,
      my: 0.5,
      cursor: 'pointer',
      '&:hover': { backgroundColor: darken(hexaColor, 0.2) },
    },
    text: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: 'white',
    },
  }
}
