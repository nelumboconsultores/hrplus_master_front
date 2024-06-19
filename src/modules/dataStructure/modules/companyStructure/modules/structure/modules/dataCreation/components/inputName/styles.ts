import { SxStyles } from 'core'

export const styles: SxStyles<'input' | 'container' | 'containerButton'> = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: '300px',
    justifyContent: 'center',
  },
  input: {
    '& .MuiFormLabel-root': {
      color: 'primary.main',
      fontWeight: 'bold',
      fontSize: '1.3rem',
      zIndex: '1',
    },
    '& .MuiInput-input': {
      padding: '6px 0 5px',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'primary.main',
    },
    '& .MuiInput-root': {},
    '& .MuiInputBase-input': {
      '&.MuiInput-input': {
        height: '20px',
      },
    },
  },
  containerButton: {
    marginTop: '16px',
  },
}
