import { SxStyles } from 'core'

export const styles: SxStyles<'detailCard'> = {
  detailCard: {
    display: 'flex',
    '& .name': {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: 1,
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
