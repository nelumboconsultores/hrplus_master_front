import { TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useContext } from 'react'
import { TableContext } from '../../../context'

type TableHeaderProps = {
  hidden?: boolean
}

export const TableHeader: React.FC<TableHeaderProps> = ({ hidden }) => {
  const { columns } = useContext(TableContext)
  return (
    <TableHead sx={{ background: '#686868', visibility: hidden ? 'collapse' : 'visible' }}>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {columns.map((column, index) => (
          <TableCell
            key={column.field}
            align={index === 0 ? 'left' : 'center'}
            sx={{ width: index === 0 ? '440px' : 'auto' }}
          >
            <Typography
              sx={{
                color: '#ffffff',
                fontSize: '0.875rem',
                letterSpacing: '0.01071em',
                fontWeight: 'bold',
              }}
            >
              {column.headerName}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
