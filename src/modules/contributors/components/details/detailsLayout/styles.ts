import { SxStyles } from 'core'

export const styles: SxStyles<'grid' | 'gridLeft' | 'gridRight'> = {
  grid: { gap: 4, display: 'flex', flexWrap: 'nowrap' },
  gridLeft: { width: '350px', minWidth: '350px' },
  gridRight: { flex: 1 },
}
