import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'container' | 'icon' | 'font'> = {
  container: {
    height: '100%',
    transition: 'background 400ms',
    position: 'relative',
    borderRadius: '7px',
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
      boxShadow: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
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
  font: {
    color: 'grey.500',
    fontFamily: FontName.RobotoRegular,
    '&.disabled.MuiTypography-root': {
      color: '#707070',
    },
  },
}
