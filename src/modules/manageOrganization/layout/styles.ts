import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'containerPaper'> = {
  root: {
    minHeight: 'calc(100vh - 124.8px )',
    position: 'relative',
    mb: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  containerPaper: {
    flex: 1,
    display: 'flex',
    borderRadius: '0px',
    marginTop: '16px',
    padding: '16px 24px',
    flexDirection: 'column',
  },
}
