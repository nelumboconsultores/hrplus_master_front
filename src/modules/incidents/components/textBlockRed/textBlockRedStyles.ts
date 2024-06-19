import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<'title' | 'descrip'> = {
  title: {
    color: '#333333',
    fontFamily: FontName.RobotoBold,
  },
  descrip: {
    fontFamily: FontName.RobotoRegular,
    color: '#EC6666',
  },
}
