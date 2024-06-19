import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'checked'
  | 'boxContainer'
  | 'componentContainer'
  | 'box'
  | 'padSelect'
  | 'pad'
  | 'padInput'
  | 'cardStyles'
  | 'btn'
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
    marginBottom: '8px',
    padding: '0px 16px',
  },
  cardStyles: {
    m: 2,
    color: '#707070',
    fontFamily: FontName.RobotoRegular,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  padSelect: {
    padding: '8px 4px',
    minWidth: '150px',
  },
  padInput: {
    padding: '8px 4px',
    width: '150px',
  },
  container: {
    width: '100%',
    paddingBottom: '20px',
  },
  componentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '430px',
    justifyContent: 'center',
  },
  text: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingBottom: '10px',
  },
  btn: {
    background: '#31C462',
    color: '#fff',
    width: '180px',
    height: '42px',
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
  pad: {
    paddingBottom: '20px',
  },
  btnAling: {
    textAlign: 'center',
    width: '100%',
    minHeight: '150px',
    height: '100%',
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'end',
  },
}
