import { FontName } from 'core/enum'
import { SxStyles } from 'core/types'

export const styles: SxStyles<'value' | 'title' | 'gridTooltip'> = {
  value: {
    fontFamily: FontName.RobotoBold,
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: 1,
  },
  title: {
    fontSize: '0.9rem',
    color: 'gray',
  },
  gridTooltip: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
}
