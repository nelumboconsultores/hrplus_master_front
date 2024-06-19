import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { icons } from 'core'
import { useContext, useState } from 'react'
import { ColumnsType, RowsType, TableContext } from '../../../context'
import { TableHeader } from './tableHeader'
import { NAME } from '../../../utils/orderData'
import { styles } from './styles'

export type RecursiveChildType = {
  row: RowsType
  columns: ColumnsType[]
  marginChildren?: number
}

export const RecursiveChild: React.FC<RecursiveChildType> = ({
  columns,
  row,
  marginChildren = 2.1,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { changeCheckedStatuses } = useContext(TableContext)
  const InheritedMargin = marginChildren
  if (row?.children && row?.children?.length > 0) {
    return (
      <Table sx={{ minWidth: 650, width: '100%' }}>
        <TableHeader hidden />
        <TableBody>
          <TableRow>
            {columns?.map((column) => {
              if (column.field === NAME)
                return (
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '4px', marginLeft: InheritedMargin }}>
                      <IconButton sx={{ padding: 0 }} onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? icons.IndeterminateCheckBoxOutlined : icons.AddBoxOutlined}
                      </IconButton>
                      <Typography sx={styles.names}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                )

              return (
                <TableCell align="center">
                  <Checkbox
                    sx={{ padding: 0 }}
                    checked={column?.orgEntityId?.[row.str]?.includes(Number(row.id))}
                    onClick={() => {
                      changeCheckedStatuses(column, row)
                    }}
                  />
                </TableCell>
              )
            })}
          </TableRow>

          <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell style={{ padding: 0 }} colSpan={columns.length + 1}>
              <Box>
                {row.children?.map((child) => {
                  return (
                    <Collapse in={collapsed} timeout="auto" unmountOnExit>
                      <RecursiveChild
                        row={child}
                        columns={columns}
                        marginChildren={InheritedMargin + 2.1}
                      />
                    </Collapse>
                  )
                })}
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table sx={{ minWidth: 650, width: '100%' }}>
      <TableHeader hidden />
      <TableBody>
        <TableRow>
          {columns?.map((column) => {
            if (column.field === 'name') {
              return (
                <TableCell>
                  <Typography
                    sx={{
                      marginLeft: InheritedMargin + 1,
                      '& .MuiTypography-root': {
                        fontSize: '0.875rem',
                        letterSpacing: '0.01071em',
                        color: '#828282',
                      },
                    }}
                  >
                    {row.name}
                  </Typography>
                </TableCell>
              )
            }

            return (
              <TableCell align="center">
                <Checkbox
                  sx={{ padding: 0 }}
                  checked={column?.orgEntityId?.[row.str]?.includes(Number(row.id))}
                  onClick={() => {
                    changeCheckedStatuses(column, row)
                  }}
                />
              </TableCell>
            )
          })}
        </TableRow>
      </TableBody>
    </Table>
  )
}
