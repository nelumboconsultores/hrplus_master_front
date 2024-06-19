import { Box, Checkbox, Collapse, IconButton, TableCell, TableRow, Typography } from '@mui/material'
import { RecursiveChild } from './recursiveChild'
import { icons } from 'core'
import { useContext, useState } from 'react'
import { ColumnsType, RowsType, TableContext } from '../../../context'
import { NAME } from '../../../utils/orderData'
import { styles } from './styles'

export type FirstChildType = {
  row: RowsType
  columns: ColumnsType[]
}

export const FirstChild: React.FC<FirstChildType> = ({ columns, row }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { changeCheckedStatuses } = useContext(TableContext)
  return (
    <>
      <TableRow>
        {columns?.map((column) => {
          if (column.field === NAME)
            return (
              <TableCell>
                <Box sx={{ display: 'flex', gap: '4px' }}>
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
                checked={column.orgEntityId?.[row.str]?.includes(Number(row.id))}
                onClick={() => changeCheckedStatuses(column, row)}
              />
            </TableCell>
          )
        })}
      </TableRow>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell style={{ padding: 0 }} colSpan={columns.length}>
          <Box>
            {row.children?.map((child) => (
              <Collapse in={collapsed} timeout="auto" unmountOnExit>
                <RecursiveChild row={child} columns={columns} />
              </Collapse>
            ))}
          </Box>
        </TableCell>
      </TableRow>
    </>
  )
}
