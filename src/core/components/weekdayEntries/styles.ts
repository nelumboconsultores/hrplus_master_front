import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'container' | 'itemClean' | 'containerError'> = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '500px',
  },

  itemClean: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'secondary.main',
    width: { xs: '44px', lg: '50px' },
    height: { xs: '44px', lg: '50px' },
    borderRadius: '50%',
    '& .MuiTypography-root': {
      color: 'white',
      fontFamily: FontName.RobotoBold,
      fontSize: { xs: '1.1rem', lg: '1.2rem' },
    },
  },
  containerError: { display: 'flex', flexDirection: 'column', gap: 1, width: '100%' },
}

export const itemCheck = (disable: boolean = false) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: disable ? 'grey.100' : 'grey.200',
    width: { xs: '44px', lg: '50px' },
    height: { xs: '44px', lg: '50px' },
    borderRadius: '50%',
    '& .MuiTypography-root': {
      color: disable ? 'grey.200' : 'grey.500',
      fontFamily: FontName.RobotoBold,
      fontSize: { xs: '1.1rem', lg: '1.2rem' },
    },
  }
}
