import { FontName, SxStyles } from 'core'

export const styles: SxStyles<
  'container' | 'titleBlock' | 'title' | 'subtitle' | 'margin' | 'gridContainer'
> = {
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  titleBlock: {
    display: 'flex',
  },
  title: {
    fontFamily: FontName.RobotoBold,
    color: '#686868',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    fontSize: '14px',
    fontFamily: FontName.RobotoRegular,
    color: '#8C8C8C',
  },
  margin: {
    margin: ' 0 16px',
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 1,
    boxSizing: 'border-box',
  },
}
