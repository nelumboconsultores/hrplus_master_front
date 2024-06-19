import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'logo'
  | 'title'
  | 'card'
  | 'descriptiom'
  | 'boxImg'
  | 'iconStyles'
  | 'grid'
  | 'btnCancel'
  | 'btnAdd'
  | 'cardOp'
> = {
  logo: {
    width: { xs: '34px ', lg: '50px', xl: '50px' },
  },
  title: {
    fontSize: { xs: '100px ', lg: '80px', xl: '96px' },
    fontFamily: FontName.RobotoMedium,
    paddingTop: '35px',
  },
  descriptiom: {
    paddingLeft: '6px',
    fontSize: { lg: '13px', xl: '15px' },
    color: '#686868',
    fontFamily: FontName.RobotoRegular,
  },
  card: {
    '& .MuiCardContent-root:last-child': { padding: '4px 12px 24px 20px' },
  },
  boxImg: {
    textAlign: 'center',
    display: 'grid',
    justifyContent: 'end',
  },
  iconStyles: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    paddingTop: '30px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnCancel: {
    color: 'white',
    borderRadius: '3px',
    width: '90px',
    fontSize: '12px',
  },
  cardOp: {
    '& .MuiCardContent-root:last-child': {
      padding: '14px 8px 13px 10px',
      minHeight: { lg: '155px', xl: '174px' },
    },
  },
  btnAdd: {
    color: 'white',
    borderRadius: '3px',
    background: '#24A9E2',
    width: '90px',
    fontSize: '12px',
  },
}
