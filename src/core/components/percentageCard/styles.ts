import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'box' | 'container' | 'icon' | 'font' | 'hoverStyles'> = {
  container: {
    height: '90px',
    transition: 'background 400ms',
    position: 'relative',
    borderRadius: '10px 0px 0px 10px',
    padding: '20px 20px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 2,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: '#F5F5F5',
    },
    ':active': {
      transform: 'scale(1)',
      boxShadow: '0px 0px 15px 1px rgba(0, 0, 0, 0.20)',
    },
    '&.containerDisabled': {
      color: 'rgba(0, 0, 0, 0.26)',

      backgroundColor: '#fff',
      cursor: 'default',
    },
  },

  icon: {
    fontSize: '2.5rem',
    height: '1.1em',
    svg: {
      fontSize: '2.5rem',
    },
    '&.disabled .MuiSvgIcon-root': {
      color: '#828282',
    },
  },
  box: {
    width: '86px',
    height: '90px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    borderRadius: '0px 10px 10px 0px',
  },
  font: {
    color: 'grey.500',
    fontFamily: FontName.RobotoRegular,
    '&.disabled.MuiTypography-root': {
      color: '#707070',
    },
  },
  hoverStyles: {
    display: 'flex',
    height: '100%',
    position: 'relative',
    '&:hover': {
      '& .MuiTypography-root': { color: '#fff' },
      'div:last-child': {
        background: '#24a9e2',
        color: '#fff',
        transition: 'background 400ms',
      },
      '.paper': {
        background: '#24a9e2',
        color: '#fff',
        transition: 'background 400ms',
        '& .css-19of194-MuiTypography-root': {
          color: '#fff',
        },
        '& .MuiSvgIcon-root': {
          color: '#fff',
        },
      },
    },
  },
}
