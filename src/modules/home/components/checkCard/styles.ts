import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'img'> = {
  container: {
    background: '#9F31F6',
    position: 'relative',
    borderRadius: '7px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#5807d3',
    },
    ':active': {
      transform: 'scale(1)',
      boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.20)',
    },
    transition: 'all 0.3s ease',
  },
  img: {
    height: '100%',
    width: '77px',
  },
}
