import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'form'> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: 'calc(100% - 80px)',
    justifyContent: 'space-between',
    marginTop: '16px',
    flex: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
}
