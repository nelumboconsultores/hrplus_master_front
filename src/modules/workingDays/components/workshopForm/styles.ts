import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  | 'container'
  | 'firstImage'
  | 'templete'
  | 'iconPlus'
  | 'text'
  | 'form'
  | 'buttonEnd'
  | 'delete'
  | 'divider'
  | 'information'
  | 'textDays'
  | 'textHours'
  | 'hoursTotal'
> = {
  templete: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  firstImage: {
    position: 'relative',
    top: -33,
    maxWidth: { xs: '80px', lg: '100px' },
  },
  iconPlus: {
    color: 'primary.main',
    svg: {
      fontSize: '2.5rem',
    },
  },
  text: {
    color: 'grey.400',
    fontFamily: FontName.RobotoBold,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 28,
  },
  buttonEnd: { minWidth: '140px' },
  delete: {
    svg: {
      color: 'red',
    },
  },
  divider: {
    margin: '4px 0px',
    '&.MuiDivider-root': {
      borderColor: 'primary.main',
    },
  },
  information: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textDays: {
    fontFamily: FontName.RobotoBold,
    lineHeight: 1,
    fontSize: '0.9rem',
  },
  textHours: {
    fontFamily: FontName.RobotoRegular,
    lineHeight: 1,
    fontSize: '0.9rem',
  },
  hoursTotal: {
    fontFamily: FontName.RobotoBold,
    lineHeight: 1,
    fontSize: '1rem',
  },
}
