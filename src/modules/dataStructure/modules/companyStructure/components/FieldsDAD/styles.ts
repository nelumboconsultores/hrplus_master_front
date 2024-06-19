import { SxStyles } from 'core'

export const styles: SxStyles<
  | 'title'
  | 'paper'
  | 'icon'
  | 'textTitle'
  | 'optional'
  | 'only'
  | 'edit'
  | 'view'
  | 'remove'
  | 'lastGrid'
  | 'general'
  | 'container'
> = {
  title: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  paper: {
    padding: '8px 4px',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'grey.300',
    '& .MuiSvgIcon-root': {
      fontSize: '2rem',
    },
  },
  textTitle: {
    fontWeight: 600,
    fontSize: '0.9rem',
    '&.noSort': { marginLeft: '16px' },
  },
  optional: { fontSize: '0.9rem', fontWeight: 600 },
  only: { color: 'error.main', fontStyle: 'italic', fontSize: '0.9rem', whiteSpace: 'nowrap' },
  edit: {
    color: 'secondary.main',
  },
  view: {
    color: 'primary.main',
  },
  remove: {
    color: 'error.main',
  },
  lastGrid: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  general: { fontSize: '0.9rem', fontStyle: 'italic' },
  container: { display: 'flex', flexDirection: 'column', gap: 2, width: '100%' },
}
