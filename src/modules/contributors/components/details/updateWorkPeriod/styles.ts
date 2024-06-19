import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'root' | 'title' | 'formContainer' | 'actionsContainer'> = {
  root: {
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flexGrow: 1,
  },
  title: {
    fontSize: '20px',
    fontFamily: FontName.RobotoBold,
  },
  formContainer: { flexGrow: 1 },
  actionsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}
