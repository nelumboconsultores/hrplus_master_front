import { Box, IconButton, Typography } from '@mui/material'
import { icons } from 'core/utils'
import { styles } from './styles'
import { GridSlotsComponentsProps } from '@mui/x-data-grid'

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    setPagination: (value: number) => void
    pages: number
    rowCount: number
  }
}

export const TableFooter: React.FC<NonNullable<GridSlotsComponentsProps['footer']>> = ({
  setPagination,
  pages,
  rowCount,
}) => {
  return (
    <Box sx={styles.container}>
      <IconButton
        sx={styles.iconButton}
        onClick={() => {
          if (setPagination && pages !== undefined) setPagination(pages - 1)
        }}
        disabled={pages === 0}
      >
        {icons.arrowLeft}
      </IconButton>

      <Box sx={styles.containerText}>
        <Typography sx={styles.text}>{(pages ?? 0) + 1}</Typography>
      </Box>

      <IconButton
        sx={styles.iconButton}
        onClick={() => {
          if (setPagination && pages !== undefined) setPagination(pages + 1)
        }}
        disabled={pages === (rowCount ?? 0) - 1}
      >
        {icons.arrowRight}
      </IconButton>
    </Box>
  )
}
