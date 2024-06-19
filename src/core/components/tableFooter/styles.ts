import { SxStyles } from 'core/types'

export const styles: SxStyles<'container' | 'iconButton' | 'containerText' | 'text'> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    gap: '10px',
  },
  iconButton: {
    borderRadius: '50%',
    border: '1px solid #707070',
    padding: '0rem',
    '& .MuiSvgIcon-root': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
    },
  },
  containerText: {
    display: 'flex',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid #BE4D00 1px',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    color: '#BE4D00',
  },
  text: {
    fontSize: '0.7rem',
  },
}
