import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'checked'
  | 'labelChecked'
  | 'cardStyles'
  | 'title'
  | 'container'
  | 'label'
  | 'containerBtn'
  | 'btn'
  | 'grid'
  | 'paper'
  | 'paperData'
> = {
  checked: {
    fontSize: '20px',
    color: '#24A9E2',
  },
  labelChecked: {
    paddingTop: '14px',
    maxWidth: '240px',
  },
  paper: {
    padding: '10px 20px',
    background: '#333333',
    borderRadius: '20px 20px 0px 0px',
  },
  paperData: {
    padding: '10px 2px 0px 0px',
    minHeight: '418px',
    maxHeight: '450px',
    overflow: 'auto',
    borderRadius: '0px 0px 20px 20px',
    flexGrow: 1,
  },
  cardStyles: {
    margin: '4px',
    color: '#707070',
    fontFamily: FontName.RobotoRegular,
    '& .MuiSwitch-switchBase': {
      color: 'black',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: 'black',
    },
  },
  title: {
    color: '#fff',
    fontSize: { lg: '12px', xl: '15px' },
    padding: { lg: '16px 2px', xl: '16px' },
    fontFamily: FontName.RobotoRegular,
  },
  container: {
    padding: '10px',
    height: '100%',
    backgroundColor: 'white',
    '&&::-webkit-scrollbar': { width: '4px' },
    '&&::-webkit-scrollbar-thumb': {
      background: 'rgba(0,0,0,.3)',
      borderRadius: '3px',
    },
  },

  label: {
    fontSize: '15px',
    fontFamily: FontName.RobotoRegular,
    color: '#686868',
  },
  containerBtn: {
    padding: '20px',
    marginTop: '15px',
    paddingBottom: '15PX',
    paddingRight: '18px',
    position: 'relative',
  },
  btn: {
    width: '140px',
    height: '40px',
    position: 'absolute',
    bottom: '10px',
  },

  grid: {
    display: 'flex',
    marginLeft: '20px',
  },
}
