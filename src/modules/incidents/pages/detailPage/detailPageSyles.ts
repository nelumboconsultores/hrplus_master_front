import { FontName } from 'core'
import { SxStyles } from 'core/types'

export const styles: SxStyles<'container' | 'title' | 'config' | 'padrig' | 'pad' | 'padComp'> = {
  container: {
    justifyContent: 'center',
  },
  title: {
    width: '100%',
    margin: '28px 0px',
  },
  config: {
    fontFamily: FontName.RobotoBold,
    color: '#707070',
    padding: '0px 0px 10px 0px',
  },
  padrig: {
    paddingRight: '20px',
  },
  pad: {
    padding: '7px 0px',
  },
  padComp: {
    padding: '10px',
  },
}
