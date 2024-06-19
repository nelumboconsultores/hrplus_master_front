import { darken } from '@mui/material'
import { FontName, SxStyles } from 'core'
import { colors } from 'core/styles/colors'

export const styles: SxStyles<'detailCard' | 'chip'> = {
  chip: {
    backgroundColor: colors.color40,
    color: colors.color5,
    '& .MuiChip-deleteIcon': {
      color: colors.color5,
      '&:hover': { color: darken(colors.color5, 0.2) },
    },
  },
  detailCard: {
    display: 'flex',
    '& .name': {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: 1,
      '&.detail': {
        fontSize: '18px',
        fontFamily: FontName.RobotoBold,
        color: colors.color9,
      },
    },
    '& .type': {
      fontSize: '0.9rem',
      color: 'gray',
    },
    '& .containerArrow': {
      display: 'flex',
      gap: '12px',
      marginRight: '12px',
    },
  },
}
