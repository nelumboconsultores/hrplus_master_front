import { SxStyles } from 'core'

export const styles: SxStyles<
  'container' | 'containerButtons' | 'buttonsL' | 'buttonsR' | 'containerModalStart'
> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: '24px',
  },
  containerButtons: {
    width: '100%',
  },
  buttonsL: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomLeftRadius: '20px',

    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grey.300',
    overflow: 'hidden',
    height: '50px',
    fontSize: '0.8rem',
  },
  buttonsR: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: '0px',
    borderTopLeftRadius: '0px',
    borderBottomRightRadius: '20px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grey.300',
    overflow: 'hidden',
    fontSize: '0.8rem',
  },
  containerModalStart: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
}
