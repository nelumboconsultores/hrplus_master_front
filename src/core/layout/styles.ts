import { SxStyles } from 'core'
const headerHeight = 61
export const styles: SxStyles<'containerStaff' | 'containerAuth' | 'infoUp' | 'subBox'> = {
  containerStaff: {
    maxWidth: '1600px',
    padding: { xs: '16px 16px', lg: '16px 10px', xl: '32px 24px' },
    position: 'relative',
    minHeight: `calc(100vh - ${headerHeight}px)`,
    '&.open': {
      width: `calc(100vw - 279px)`,
    },
    '&.closed': {
      width: `96%`,
    },
  },
  containerAuth: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent linear-gradient(180deg, #3A87D9 0%, #5807D3 47%, #9F31F6 100%)',
    minHeight: '100vh',
  },
  infoUp: {
    color: 'white',
    mb: '16px',
    fontSize: '0.8rem',
  },
  subBox: {
    background: '#F9FAFF',
    width: '100%',
    minHeight: '100vh, ',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
}
