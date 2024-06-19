import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'text'> = {
  text: {
    textTransform: 'capitalize',
    fontSize: '0.9rem',
    fontFamily: FontName.RobotoRegular,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'grey.400',
  },
}
