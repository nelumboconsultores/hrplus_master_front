import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<
  | 'container'
  | 'containerInput'
  | 'text'
  | 'subtext'
  | 'chipStyle'
  | 'textValue'
  | 'btn'
  | 'heightChip'
  | 'pad'
  | 'btnAling'
> = {
  container: {
    width: '100%',
    paddingTop: '0px',
    paddingBottom: '20px',
  },
  text: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingBottom: '4px',
  },
  subtext: {
    letterSpacing: '0.00938em',
    fontFamily: FontName.RobotoRegular,
    fontSize: ' 0.9rem',
    paddingBottom: '20px',
    '& .MuiTypography-root': {
      fontFamily: FontName.RobotoRegular,
      fontSize: ' 0.9rem',
    },
  },
  containerInput: {
    paddingBottom: '28px',
    width: '100%',
  },
  btn: {
    background: '#31C462',
    color: '#fff',
    width: '140px',
    height: '42px',
  },
  textValue: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  heightChip: {
    height: { lg: 'calc(100vh - 424px)', xl: 'calc(100vh - 438px)' },
    overflowY: 'auto',
    '& .MuiListItem-root': { padding: '0px 16px' },
  },
  pad: {
    paddingBottom: '20px',
  },
  btnAling: {
    textAlign: 'end',
    width: '100%',
    marginTop: '15px',
    display: 'flex',
    justifyItems: 'end',
    alignItems: 'end',
    justifyContent: 'end',
    height: '10vh',
  },
  chipStyle: {
    background: '#24A9E2',
    color: '#fff',
    '& .MuiChip-deleteIcon': {
      color: '#24A9E2',
      backgroundColor: '#fff',
      borderRadius: '12px',
      fontSize: '16px',
    },
    marginRight: '8px',
    marginBottom: '8px',
  },
}
