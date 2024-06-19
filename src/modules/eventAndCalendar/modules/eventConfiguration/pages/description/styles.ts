import { SxStyles } from 'core'

export const styles: SxStyles<'form' | 'gridSwitch'> = {
  form: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  gridSwitch: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& .MuiFormControlLabel-root': {
      marginLeft: '4px',
    },
  },
}
