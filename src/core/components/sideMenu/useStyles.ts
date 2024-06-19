import { SxStyles } from 'core/types'

export const useStyles = (
  open: boolean,
  isSelect?: boolean,
): SxStyles<
  | 'container'
  | 'logo'
  | 'containerMenu'
  | 'itemMenu'
  | 'textItem'
  | 'boxInner'
  | 'iconStyles'
  | 'boxColor'
> => ({
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    minHeight: '100vh',
    width: open ? '260px' : '80px',
    paddingTop: '20px',
    transition: 'width 0.3s ease',
    zIndex: 1,
  },
  logo: {
    marginBottom: '16px',
  },
  containerMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    px: '16px',
  },
  itemMenu: {
    display: 'flex',
    justifyItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: '8px',

    '& .MuiIcon-root': {
      display: 'flex',
      color: '#828282',
      fontSize: '1.6rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.6rem',
      },
    },
    ':hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },
  boxInner: {
    display: 'flex',
    padding: '8px',

    '& .MuiIcon-root': {
      display: 'flex',
      color: '#828282',
      fontSize: '1.6rem',
      '& .MuiSvgIcon-root': {
        fontSize: '1.6rem',
      },
    },
    ':hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },
  textItem: {
    whiteSpace: 'nowrap',
    marginLeft: 2,
    color: isSelect ? 'primary.800' : '#828282',
  },
  iconStyles: {
    transform: 'translateX(1%)',
    '& svg': {
      color: isSelect ? 'primary.800' : '#828282',
    },
  },
  boxColor: {
    visibility: isSelect ? 'visible' : 'hidden',
    backgroundColor: 'primary.700',
    height: '44px',
    width: '4px',
    position: 'absolute',
    left: -15,
  },
})
