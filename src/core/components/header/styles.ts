import { SxStyles } from 'core/types'

export const styles: SxStyles<'container' | 'icon'> = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    background: `linear-gradient(to right, #9F31F6, #5807D3, #3A87D9)`,
    padding: '4px 24px',
    alignItems: 'center',
    gap: '4px',
  },
  icon: {
    '.MuiSvgIcon-root': {
      fontSize: '2.3rem',
      color: '#fff',
    },
  },
}
