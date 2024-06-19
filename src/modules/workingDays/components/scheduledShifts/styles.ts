import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'container' | 'days' | 'hour'> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    width: '100%',
    minHeight: '140px',
    alignItems: 'center',
    justifyContent: 'center',
    py: 2,
  },
  days: {
    fontFamily: FontName.RobotoRegular,
    color: 'grey.400',
    lineHeight: 1.2,
    letterSpacing: '0.1px',
    fontSize: '0.9rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  hour: {
    fontSize: '0.9rem',
    lineHeight: 1.2,
    fontFamily: FontName.RobotoRegular,
    color: 'grey.400',
    letterSpacing: '0.1px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}
