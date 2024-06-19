import { SxStyles } from 'core'

export const styles: SxStyles<'container'> = {
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',

    '& .label': {
      fontWeight: 600,
      fontSize: '16px',
      color: '#686868',
    },
    '& .title': {
      fontSize: '0.9rem',
      color: 'gray',
    },
  },
}
