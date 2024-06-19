import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'container' | 'titleBlock' | 'title' | 'subtitle' | 'arrow'> = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  titleBlock: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    paddingBottom: '10px',
    paddingLeft: '10px',
  },
  title: {
    fontSize: '18px',
    fontFamily: FontName.RobotoBold,
    marginBottom: '2px',
    color: '#686868',
  },
  subtitle: {
    fontSize: '14px',
    fontFamily: FontName.RobotoRegular,
    color: '#8C8C8C',
  },
  arrow: {
    color: '#24A9E2',
    fontSize: '25px',
    margin: ' 0 16px',
  },
}
