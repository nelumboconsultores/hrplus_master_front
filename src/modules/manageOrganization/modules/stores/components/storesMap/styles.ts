import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'title' | 'address'> = {
  title: {
    fontSize: '16px',
    fontFamily: FontName.RobotoBold,
    marginBottom: '2px',
    color: '#686868',
  },
  address: {
    fontSize: '14px',
    fontFamily: FontName.RobotoRegular,
    color: '#8C8C8C',
  },
}
