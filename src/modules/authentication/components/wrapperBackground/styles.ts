import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'gridMain' | 'logo'> = {
  container: {
    position: 'relative',
    borderRadius: '24px',
    width: '65%',
    overflow: 'hidden',
    maxWidth: '1488px',
    minWidth: { lg: '940px', xl: '960px' },
  },
  gridMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: { md: '52px 48px', lg: '52px 76px' },
  },
  logo: {
    width: '140px',
    height: '36px',
  },
}
