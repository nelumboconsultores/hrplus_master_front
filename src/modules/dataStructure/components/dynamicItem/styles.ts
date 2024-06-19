import { SxStyles } from 'core'

export const styles: SxStyles<
  'paper' | 'iconDelete' | 'iconRemove' | 'containerIcon' | 'iconSwitch'
> = {
  paper: {
    padding: '16px 24px',
    position: 'relative',
    backgroundColor: '#F8F8F8',
    display: 'flex',
    alignItems: 'flex-start',
  },
  iconDelete: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRemove: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem',
    },
    '&.MuiIconButton-root': {
      padding: '4px',
    },
  },

  containerIcon: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '72px',
    alignItems: 'flex-start',
  },
  iconSwitch: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
  },
}

export const iconPen = (loading: boolean) => ({
  '& .MuiSvgIcon-root': {
    borderRadius: '50%',
    padding: '0.5rem',
    fontSize: '3.1rem',
    color: 'white',
    backgroundColor: loading ? 'gray.main' : 'secondary.main',
  },
})
