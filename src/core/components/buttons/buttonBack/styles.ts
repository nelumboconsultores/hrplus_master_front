import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'container' | 'iconStyles'> = {
  container: {
    display: 'flex',
    cursor: 'pointer',
    alignContent: 'center',
    alignItems: 'center',
    padding: 0,
    gap: '2px',
    '& .MuiTypography-root': {
      textTransform: 'capitalize',
      color: 'primary.800',
      fontSize: '0.76rem',
      fontFamily: FontName.RobotoMedium,
    },
    '&:hover': {
      '& .MuiTypography-root': {
        textDecoration: 'underline',
        color: 'primary.700',
      },
    },
  },
  iconStyles: {
    fontSize: '0.9rem',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },
  },
}
