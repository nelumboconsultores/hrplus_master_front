import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'checked'
  | 'boxContainer'
  | 'componentContainer'
  | 'box'
  | 'padSelect'
  | 'padInput'
  | 'cardStyles'
  | 'btnAling'
  | 'container'
  | 'text'
  | 'btnCancel'
  | 'btnAdd'
> = {
  checked: {
    '&.Mui-checked': {
      color: '#33cf4d',
    },
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardStyles: {
    mx: 2,
    color: '#707070',
    fontFamily: FontName.RobotoRegular,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
  },
  padSelect: {
    minWidth: '150px',
  },
  padInput: {
    width: '150px',
  },
  container: {
    paddingBottom: '24px',
  },
  componentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '430px',
    justifyContent: 'center',
  },
  text: {
    color: '#686868',
    fontSize: '16px',
    paddingBottom: '8px',
    fontFamily: FontName.RobotoBold,
  },

  btnAdd: {
    background: '#31C462',
    color: '#fff',
    width: '100px',
    height: '42px',
  },
  btnCancel: {
    background: '#fff',
    color: '#31c462',
    width: '100px',
    height: '42px',
  },

  btnAling: {
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end',
  },
}
