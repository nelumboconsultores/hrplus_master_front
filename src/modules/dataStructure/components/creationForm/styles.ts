import { SxStyles } from 'core'

export const styles: SxStyles<
  'buttonAdd' | 'fieldContainer' | 'containerForm' | 'containerButtons'
> = {
  buttonAdd: {
    marginTop: '16px',
    textDecoration: 'underline',
    textTransform: 'none',
  },
  fieldContainer: {
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  containerForm: {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: '26px',
  },
}
