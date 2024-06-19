import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material'

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#828282',
  },
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F3F4FF',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
