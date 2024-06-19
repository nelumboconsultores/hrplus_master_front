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
  | 'textModal'
  | 'subTextModal'
  | 'containerModal'
  | 'check'
  | 'loading'
> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    marginTop: '32px',
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
  },
  input: {
    fontFamily: FontName.RobotoRegular,
    color: 'grey.400',
    fontSize: '0.9rem',
  },
  down: {
    display: 'flex',
    justifyContent: 'end',
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
    bottom: '20px',
  },
  logo: {
    width: '140px',
    height: '36px',
  },
  textModal: {
    fontFamily: FontName.RobotoBold,
    fontSize: '20px',
    color: '#0062FF',
    lineHeight: '1.1rem',
    padding: '10px 1px',
  },
  subTextModal: {
    fontFamily: FontName.RobotoRegular,
    fontSize: '14px',
    color: '#686868',
    lineHeight: '1.1rem',
    padding: '10px 1px',
  },

  containerModal: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: '30px 30px',
  },
  check: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '10px',
    color: 'green',
  },
  loading: { display: 'inline-flex', alignItems: 'center', marginLeft: '10px' },
}
