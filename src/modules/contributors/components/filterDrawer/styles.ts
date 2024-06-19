import { SxStyles } from 'core'
const drawerWidth = 360

export const styles: SxStyles<'container' | 'boxForm' | 'button' | 'close'> = {
  container: {
    /*  border: 'blue 1px solid', */
    width: { md: '300px', lg: '320px', xl: drawerWidth },
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: { md: '300px', lg: '320px', xl: drawerWidth },
    },
  },
  boxForm: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  button: {
    alignSelf: 'flex-end',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}
