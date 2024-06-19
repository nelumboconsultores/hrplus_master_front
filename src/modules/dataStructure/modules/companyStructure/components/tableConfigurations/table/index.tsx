import { Table, TableContainer } from '@mui/material'
import { TableHeader } from './tableHeader'
import { TableBodyMain } from './tableBody'

export const TableMain: React.FC = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, width: '100%' }}>
        <TableHeader />
        <TableBodyMain />
      </Table>
    </TableContainer>
  )
}
