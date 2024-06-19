import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'header'> = {
  root: {
    minHeight: 'calc( 100vh - 125px )',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}
