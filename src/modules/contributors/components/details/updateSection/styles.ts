import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  'root' | 'title' | 'formContainer' | 'actionsContainer' | 'typography' | 'boxTitle' | 'text'
> = {
  root: {
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    gap: 3,
  },
  title: {
    fontSize: '20px',
    fontFamily: FontName.RobotoBold,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'flex-end',
    marginTop: '16px',
    width: '100%',
  },
  actionsContainer: {
    marginTop: '16px',
    alignSelf: 'flex-end',
  },
  typography: {
    textDecoration: 'underline',
    display: 'inline',
    fontSize: '1.2rem',
    textAlign: 'center',
    fontFamily: FontName.RobotoBold,
    letterSpacing: '0px',
    color: '#24A9E2',
    opacity: '1',
    cursor: 'pointer',
  },
  boxTitle: {
    textAlign: 'center',
    margin: '0',
    padding: '0px 60px',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FontName.RobotoRegular,
    display: 'inline',
    fontSize: '1.2rem',
  },
}
