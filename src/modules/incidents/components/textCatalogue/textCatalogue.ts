import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<
  | 'paper'
  | 'catalogue'
  | 'title'
  | 'type'
  | 'subTitle'
  | 'subTitle2'
  | 'btn'
  | 'descrip'
  | 'iconColor'
  | 'padSelec'
  | 'inputPad'
> = {
  paper: {
    display: 'flex',
    padding: '8px 4px',
    borderRadius: '20px',
    justifyContent: 'start',
  },
  title: {
    color: '#333333',
    fontFamily: FontName.RobotoBold,
    paddingBottom: '8px',
  },
  iconColor: {
    color: '#31C462',
  },
  catalogue: {
    textAlign: 'left',
    color: '#333333',
    fontFamily: FontName.RobotoRegular,
    font: 'normal normal normal 18px/22px',
    paddingLeft: '10px',
  },
  type: {
    fontSize: '18px',
    fontWeight: 'bold',
    fontFamily: FontName.RobotoRegular,
    color: '#000066',
    paddingLeft: '7px',
    paddingBottom: '12px',
  },
  inputPad: {
    padding: '20px 4px',
    maxWidth: '300px',
  },
  subTitle: {
    color: '#999999',
    fontFamily: FontName.RobotoRegular,
    paddingTop: '12px',
    paddingLeft: '7px',
    fontSize: '16px',
    textTransform: 'lowercase',
    '&:first-letter': {
      textTransform: 'uppercase',
    },
  },
  descrip: {
    color: '#9F31F6',
    fontFamily: FontName.RobotoRegular,
    paddingLeft: '10px',
  },
  subTitle2: {
    color: '#999999',
    fontFamily: FontName.RobotoRegular,
    fontSize: '16px',
  },
  padSelec: {
    padding: '20px 30px',
  },
  btn: {
    background: '#31C462',
    color: '#fff',
    margin: '20px 0px 20px 7px',
    width: '155px',
    height: '42px',
  },
}
