import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'container'
  | 'textHead'
  | 'conHead'
  | 'containerForm'
  | 'input'
  | 'down'
  | 'checkboxText'
  | 'start'
  | 'textDown'
  | 'logo'
> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    marginTop: { lg: '12px', xl: '32px' },
  },
  conHead: {
    textAlign: 'center',
  },
  textHead: {
    fontFamily: FontName.RobotoLight,
    fontSize: '0.8rem',
    color: 'grey.400',
    lineHeight: '1.1rem',
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '32px',
  },
  input: {
    fontFamily: FontName.RobotoRegular,
    color: 'grey.400',
    fontSize: '0.9rem',
  },
  down: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkboxText: {
    color: 'grey.400',
    fontSize: '0.9rem',
    fontFamily: FontName.RobotoRegular,
  },
  start: {
    width: '100px',
  },
  textDown: {
    fontSize: '0.9rem',
    color: 'grey.400',
    lineHeight: '1rem',
    fontFamily: FontName.RobotoRegular,
    cursor: 'pointer',
    paddingTop: '14px',
  },
  logo: {
    width: '140px',
    height: '36px',
  },
}
