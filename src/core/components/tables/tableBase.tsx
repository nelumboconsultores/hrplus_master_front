import { Box } from '@mui/material'
import { StripedDataGrid } from './styles'
import { AppContext, TableBaseProps, Variant } from 'core'
import { useContext, useState } from 'react'
import { GridPaginationModel } from '@mui/x-data-grid'

export const TableBase: React.FC<TableBaseProps> = ({
  variant = Variant.standard,
  getDataTable,
  ...props
}) => {
  const { open } = useContext(AppContext)
  const [page, setPage] = useState(1)
  const handlePageChange = (params: GridPaginationModel) => {
    setPage(params.page + 1)
    if (getDataTable)
      getDataTable(
        params.page + 1,
        params.pageSize,
        props.sortModel?.[0]?.field,
        props.sortModel?.[0]?.sort,
      )
  }
  return (
    <Box sx={{ overflowX: 'auto' }}>
      <StripedDataGrid
        {...props}
        variant={variant}
        open={open}
        autoHeight
        hideFooterSelectedRowCount
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20, page: page - 1 },
          },
        }}
        disableColumnMenu
        getRowHeight={props.getRowHeight ?? (() => 'auto')}
        paginationMode="server"
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        onPaginationModelChange={handlePageChange}
        localeText={{
          noRowsLabel: 'No se encontraron resultados',
          columnHeaderSortIconLabel: 'Ordenar',
        }}
        pageSizeOptions={props.pageSizeOptions ?? [20]}
      />
    </Box>
  )
}
