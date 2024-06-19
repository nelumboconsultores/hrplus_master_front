import { DataGridProps } from '@mui/x-data-grid'
import { Variant } from 'core'

export type TableBaseProps = {
  variant?: Variant
  getDataTable?: (
    page: number,
    pageSize: number,
    name?: string | null,
    sort?: string | null,
  ) => void
} & DataGridProps
