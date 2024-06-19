import { SxStyles } from 'core/types'

export const styles: SxStyles<'boxContainer' | 'container' | 'close'> = {
  boxContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
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
