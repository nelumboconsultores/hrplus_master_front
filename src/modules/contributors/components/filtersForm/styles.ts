import { SxStyles } from 'core'

export const styles: SxStyles<'button' | 'container'> = {
  button: {
    alignSelf: 'flex-end',
  },
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    /* overflow: 'auto', */
  },
}
