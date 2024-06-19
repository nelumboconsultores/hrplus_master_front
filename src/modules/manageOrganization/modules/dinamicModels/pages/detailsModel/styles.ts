import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'container'
  | 'titleDenomination'
  | 'titleDate'
  | 'titleCode'
  | 'box'
  | 'titleSuc'
  | 'titleNumSuc'
  | 'backButton'
  | 'icon'
> = {
  container: {
    backgroundColor: '#F5F5F5',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '20px',
  },
  titleDate: {
    fontSize: '16px',
    fontFamily: FontName.RobotoMedium,
    color: '#000000',
  },
  titleDenomination: {
    fontSize: '25px',
    fontFamily: FontName.RobotoMedium,
    color: '#24A9E2',
    lineHeight: '1.2',
  },
  titleCode: {
    fontSize: '20px',
    fontFamily: FontName.RobotoMedium,
    color: '#24A9E2',
    lineHeight: '1.2',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSuc: {
    fontSize: '18px',
    fontFamily: FontName.RobotoMedium,
    color: '#474747',
  },
  titleNumSuc: {
    fontSize: '18px',
    fontFamily: FontName.RobotoMedium,
    color: '#24A9E2',
    paddingRight: '20px',
  },
  backButton: { position: 'relative', top: 55, left: 0, right: 0, bottom: 0 },
  icon: {
    color: '#31C462',
  },
}
