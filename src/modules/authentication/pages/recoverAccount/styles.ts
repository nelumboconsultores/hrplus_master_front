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
  | 'userBtn'
  | 'passBtn'
> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
    marginTop: '32px',
    gap: { md: '16px', lg: '0' },
    marginBottom: { md: '16px', lg: '0' },
  },
  conHead: {
    textAlign: 'center',
  },
  textHead: {
    fontFamily: FontName.RobotoLight,
    fontSize: '0.8rem',
    color: 'grey.400',
    lineHeight: '1.1rem',
    paddingTop: '12px',
  },
  containerForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '32px',
    paddingTop: '12px',
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
    position: 'absolute',
    bottom: '40px',
  },
  logo: {
    width: '140px',
    height: '36px',
  },
  userBtn: {
    background: '#24A9E2',
    fontFamily: FontName.RobotoBold,
    fontSize: '0.8rem',
    padding: '14px 2px',
    width: '100%',
    borderRadius: '6px',
    '&:hover': {
      background: '#0077B6',
    },
  },
  passBtn: {
    background: '#0062FF',
    fontFamily: FontName.RobotoBold,
    fontSize: '0.8rem',
    padding: '14px 2px',
    width: '100%',
    borderRadius: '6px',
    '&:hover': {
      background: '#004080',
    },
  },
}
