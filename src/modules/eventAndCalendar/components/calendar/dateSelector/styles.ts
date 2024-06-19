import { SxStyles } from 'core'

export const styles: SxStyles<'container' | 'dateSelector' | 'buttons'> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    left: 0,
    top: '-21px',
  },
  dateSelector: {
    display: 'inline-flex',
    justifyContent: 'center',
    gap: 2,
    alignItems: 'center',
    backgroundColor: '#707070',
    borderRadius: 8,
    padding: 1,
  },
  buttons: {
    color: 'white',
    border: 'white solid 1px',
    padding: '2px',
  },
}
