import { SxStyles } from 'core'

export const styles: SxStyles<'detailCard'> = {
  detailCard: {
    display: 'flex',
    gap: 1,
    '& .name': {
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: 1,
      color: '#686868',
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
