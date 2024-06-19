import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'firstImage'> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  firstImage: {
    position: 'relative',
    top: -33,
    maxWidth: { xs: '80px', lg: '100px' },
  },
}
