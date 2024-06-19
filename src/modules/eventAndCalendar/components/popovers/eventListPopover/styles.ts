import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'closeIcon' | 'container'> = {
  root: { padding: 2, width: '250px', position: 'relative' },
  closeIcon: { position: 'absolute', top: '2px', right: '2px' },
  container: {
    height: '190px',
    width: '100%',
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
