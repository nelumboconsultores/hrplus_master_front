import { SxStyles } from 'core'
import { colors } from 'core/styles/colors'

export const styles: SxStyles<'title' | 'status'> = {
  title: { color: colors.color32 },
  status: {
    color: colors.color5,
    backgroundColor: '#c9c9c9',
    position: 'absolute',
    top: '-1px',
    right: '-2px',
    borderRadius: '4px',
    textAlign: 'center',
    display: 'inline-block',
    padding: '2px 10px',
  },
}
