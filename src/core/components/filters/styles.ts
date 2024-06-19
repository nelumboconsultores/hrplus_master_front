import { SxStyles } from 'core/types'

export const styles: SxStyles<'icono' | 'container' | 'close'> = {
  icono: {
    position: 'fixed',
    top: 120,
    right: 0,
    backgroundColor: 'error.500',
    '&:hover': {
      backgroundColor: 'error.700',
    },
    borderRadius: '4px 0 0 4px',
    color: '#fff',
    zIndex: 1,
    '& .MuiSvgIcon-root': {
      fontSize: '2.3rem',
    },
  },
  container: {
    position: 'relative',
    padding: '48px 36px',
    width: '440px',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}
