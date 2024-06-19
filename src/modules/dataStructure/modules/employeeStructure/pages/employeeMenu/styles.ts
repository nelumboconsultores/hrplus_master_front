import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  'container' | 'typography' | 'titleModal' | 'subtitleModal' | 'paddingModal'
> = {
  container: {
    padding: { lg: '20px 60px 30px', md: '18px 44px 32px' },
    textAlign: 'end',
  },

  typography: {
    textDecoration: 'underline',
    fontFamily: FontName.RobotoBold,
    fontSize: '16px',
    letterSpacing: '0px',
    color: '#24A9E2',
    opacity: '1',
    cursor: 'pointer',
  },

  paddingModal: {
    padding: '30px 45px 20px',
    textAlign: 'center',
  },

  titleModal: {
    fontWeight: 600,
    fontSize: '1.3rem',
    fontFamily: FontName.RobotoBold,
    padding: '20px 0px 20px',
  },
  subtitleModal: {
    color: '#333333',
    fontSize: '0.9rem',
    fontFamily: FontName.RobotoRegular,
    padding: '10px 0px 30px',
  },
}
