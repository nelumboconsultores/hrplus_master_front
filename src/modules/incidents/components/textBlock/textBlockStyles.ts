import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<'title' | 'descrip'> = {
  title: {
    color: '#333333',
    paddingBottom: '4px',
    fontFamily: FontName.RobotoBold,
  },
  descrip: {
    color: '#333333',
    fontFamily: FontName.RobotoRegular,
  },
}
