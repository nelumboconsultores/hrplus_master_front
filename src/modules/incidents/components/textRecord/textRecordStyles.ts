import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<'item' | 'text' | 'title' | 'gridContainer' | 'pad'> = {
  item: {
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#333333',
    color: '#fff',

    lineHeight: '24px',
  },
  title: {
    fontFamily: FontName.RobotoBold,
    paddingBottom: '16px',
  },
  gridContainer: {
    display: 'flex',
  },
  text: {
    fontFamily: FontName.RobotoRegular,
    lineHeight: 1.2,
    color: '#EC6666',
    padding: '0px 6px 0px 8px',
    fontSize: '1rem',
  },
  pad: {
    paddingTop: '8px',
  },
}
