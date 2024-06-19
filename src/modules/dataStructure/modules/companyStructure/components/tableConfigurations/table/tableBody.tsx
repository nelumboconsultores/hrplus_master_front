import { Checkbox, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { CHECKS, NAME, NAME_MAIN } from '../../../utils/orderData'
import { FirstChild } from './firstChild'
import { useContext } from 'react'
import { TableContext } from '../../../context'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { SwitchIOS } from 'core'

export const TableBodyMain: React.FC = () => {
  const { rows, columns, changeCheckedStatuses, changeSwitch } = useContext(TableContext)
  const { t } = useTranslation()
  return (
    <TableBody
      sx={{
        '& .rows': {
          '&:nth-of-type(odd)': {
            backgroundColor: '#ffffff',
          },
          backgroundColor: '#f3f4ff',
        },
      }}
    >
      {rows?.map((row, index) => {
        console.log(row, 'row')
        if (row.typeItem === NAME_MAIN)
          return (
            <TableRow className="nameMain">
              <TableCell sx={{ backgroundColor: '#92929D' }} colSpan={columns.length + 1}>
                <Typography sx={styles.names}>{row.name}</Typography>
              </TableCell>
            </TableRow>
          )

        if (row?.children && row?.children?.length > 1)
          return <FirstChild columns={columns} row={row} />

        return (
          <TableRow className="rows">
            {columns?.map((column) => {
              if (column.field === NAME)
                return (
                  <TableCell
                    sx={{
                      '& .MuiTypography-root': {
                        fontSize: '0.9rem',
                        letterSpacing: '0.01071em',
                        color: '#828282',
                      },
                    }}
                  >
                    <Typography>{row.name}</Typography>
                  </TableCell>
                )

              if (row.typeItem === CHECKS)
                return (
                  <TableCell
                    align="center"
                    sx={{
                      '& .MuiFormControlLabel-root': {
                        marginRight: 0,
                      },
                    }}
                  >
                    <SwitchIOS
                      disabled={
                        !column.disabledSwitch?.includes(Number(row.str)) ||
                        column.disabledColumn?.includes(Number(row.str))
                      }
                      checked={column.hasMany?.includes(Number(row.str))}
                      onClick={() => changeSwitch(row.str, column)}
                    />
                  </TableCell>
                )

              return (
                <TableCell align="center">
                  <Tooltip
                    title={index === 1 ? t('companyStructure.toolTip.notPossibleToDisable') : ''}
                  >
                    <span>
                      <Checkbox
                        sx={{ padding: 0 }}
                        disabled={column.disabledColumn?.includes(Number(row.str)) || index === 1}
                        checked={column?.orgEntityId?.[row.str]?.includes(Number(row.id))}
                        onClick={() => changeCheckedStatuses(column, row)}
                      />
                    </span>
                  </Tooltip>
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
