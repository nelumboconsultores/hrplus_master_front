import { SxStyles } from 'core/types'

export const styles: SxStyles<
  'container' | 'containerInput' | 'text' | 'chipStyle' | 'btn' | 'heightChip' | 'pad' | 'btnAling'
> = {
  container: {
    width: '100%',
    paddingBottom: '20px',
  },
  text: {
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
    paddingBottom: '16px',
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
  heightChip: {
    height: 'calc(100vh - 469px)',
    overflowY: 'auto',
  },
  pad: {
    paddingBottom: '20px',
  },
  btnAling: {
    textAlign: 'end',
    width: '100%',
    paddingTop: '25px',
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
