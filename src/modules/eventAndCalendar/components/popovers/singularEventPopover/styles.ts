import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'closeIcon' | 'container'> = {
  root: { padding: 2, width: '550px', position: 'relative' },
  closeIcon: { position: 'absolute', top: '2px', right: '2px' },
  container: {
    height: '230px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '5px',
    },
  },
}
