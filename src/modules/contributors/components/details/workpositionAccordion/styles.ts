import { FontName, SxStyles } from 'core'
import { colors } from 'core/styles/colors'

export const styles: SxStyles<'detailCard'> = {
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
