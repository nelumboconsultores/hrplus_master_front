import { FontName, SxStyles } from 'core'
import { colors } from 'core/styles/colors'

export const styles: SxStyles<
  | 'root'
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
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'space-between',
    flex: 1,
  },
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
    fontSize: '1.3rem',
    fontFamily: FontName.RobotoMedium,
    color: '#24A9E2',
    lineHeight: '1.2',
  },
  titleCode: {
    fontSize: '1.2rem',
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
    fontWeight: 600,
    fontSize: '1.1rem',
    fontFamily: FontName.RobotoMedium,
    color: colors.color39,
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
    '& .MuiSvgIcon-root': {
      fontSize: '1.3rem',
    },
    '&.MuiButtonBase-root': {
      padding: '5px',
    },
  },
}
