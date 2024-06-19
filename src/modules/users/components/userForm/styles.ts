import { FontName, SxStyles } from 'core'

export const styles: SxStyles<'title' | 'search'> = {
  title: {
    marginTop: '24px',
    fontFamily: FontName.RobotoMedium,
    marginBottom: '12px',
    fontWeight: 600,
  },
  search: {
    alignSelf: 'flex-end',
    marginTop: '16px',
  },
}
