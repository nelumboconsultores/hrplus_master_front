import { SxStyles } from 'core'
import { FontName } from 'core'
export const styles: SxStyles<'filter' | 'gridBtn' | 'container'> = {
  container: {
    justifyContent: 'end',
    alignItems: 'center',
  },
  filter: {
    color: '#707070',
    fontFamily: FontName.RobotoRegular,
    fontSize: '0.9rem',
    paddingBottom: '10px',
  },
  gridBtn: {
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'end',
    paddingBottom: '2px',
  },
}
