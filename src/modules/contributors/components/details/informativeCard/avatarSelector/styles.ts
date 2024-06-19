import { SxStyles } from 'core'

export const styles: SxStyles<
  'root' | 'avatarContainer' | 'iconContainer' | 'progressBar' | 'avatar'
> = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    height: '173px',
    width: '173px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    cursor: 'pointer',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '6px',
      left: '6px',
      height: '160px',
      width: '160px',
      backgroundColor: '#51459e',
      opacity: 0,
      borderRadius: '50%',
      zIndex: 1,
      transition: 'all 0.3s',
    },

    '&:hover': {
      '&:before': {
        opacity: 0.3,
      },
    },
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 2,
  },
  progressBar: {
    '& .MuiCircularProgress-circle': {
      color: '#51459e',
    },

    position: 'absolute',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  avatar: { width: 160, height: 160 },
}
