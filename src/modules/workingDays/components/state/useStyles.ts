import { FontName, SxStyles } from 'core'

export const useStyles = (status: boolean): SxStyles<'text'> => ({
  text: {
    fontSize: '0.9rem',
    fontFamily: FontName.RobotoRegular,
    color: status ? 'secondary.main' : 'error.main',
  },
})
