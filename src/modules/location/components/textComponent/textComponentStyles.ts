import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'text' | 'subText' | 'description'> = {
  text: {
    textAlign: 'left',
    color: '#000000',
    opacity: 1,
    fontSize: { md: '2.2rem', lg: '1.9rem', xl: '2.3rem' },
    fontFamily: FontName.RobotoMedium,
  },
  subText: {
    textAlign: 'left',
    color: '#000000',
    opacity: 1,
    fontSize: { md: '2.2rem', lg: '1.9rem', xl: '2.3rem' },
    fontFamily: FontName.RobotoMedium,
    paddingBottom: '40px',
  },
  description: {
    fontSize: { md: '18px', lg: '17px', xl: '18px' },
    textAlign: 'left',
    letterSpacing: '0px',
    color: ' #333333',
    opacity: 1,
    fontFamily: FontName.RobotoRegular,
  },
}
