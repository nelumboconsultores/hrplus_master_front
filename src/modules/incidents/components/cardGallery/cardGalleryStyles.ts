import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'checked'
  | 'boxContainer'
  | 'componentContainer'
  | 'box'
  | 'padSelect'
  | 'pad'
  | 'padInput'
  | 'cardStyles'
> = {
  checked: {
    '&.Mui-checked': {
      color: '#33cf4d',
    },
  },
  boxContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    width: '100%',
  },
  cardStyles: {
    margin: '0px 12px',
    color: '#707070',
    fontFamily: FontName.RobotoRegular,
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
  },
  pad: {},
  padSelect: {
    minWidth: '150px',
  },
  padInput: {
    width: '150px',
  },

  componentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '430px',
    justifyContent: 'center',
    marginBottom: '12px',
  },
}
