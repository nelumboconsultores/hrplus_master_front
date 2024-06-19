import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'formContainer' | 'inputFile' | 'containerScroll'> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  inputFile: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  containerScroll: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    width: '100%',
    maxHeight: '350px',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '1px',
  },
}
