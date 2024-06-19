import { SxStyles } from 'core'

export const styles: SxStyles<'root' | 'sectionsContainer' | 'footer' | 'backButton'> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minHeight: 'calc(100% - 88px)',
    boxSizing: 'border-box',
    flex: 1,
  },
  sectionsContainer: { flexGrow: 1 },
  footer: { display: 'flex', justifyContent: 'flex-end' },
  backButton: { position: 'relative', top: 0, left: 0, right: 0, bottom: 0 },
}
