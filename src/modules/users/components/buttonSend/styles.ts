import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'btn'> = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    width: '200px',
    height: '42px',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  },
}
