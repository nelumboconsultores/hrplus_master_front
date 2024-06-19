import { Box, Checkbox, Icon, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { TableBase, icons } from 'core'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'

export const UserListBasic = () => {
  const {
    idListSave,
    getDataTable,
    isLoad,
    sizeTable,
    rows,
    checkAll,
    setCheckAll,
    setProfileIds,
    profileIds,
  } = useContext(UsersContext)
  const columns: GridColDef[] = [
    {
      field: 'check',
      headerName: 'check',
      flex: 0.2,
      sortable: false,
      renderCell: (params) => {
        return (
          <Checkbox
            checked={profileIds.includes(params.row.id)}
            onClick={() => idListSave(params.row.id)}
          />
        )
      },
      renderHeader: () => (
        <Checkbox
          checked={checkAll}
          onClick={() => {
            const ids = rows.map((item) => item.id)

            if (!checkAll) setProfileIds(ids)
            else {
              setProfileIds([])
            }
            setCheckAll(!checkAll)
          }}
        />
      ),
    },
    { field: 'name', headerName: 'Nombres y Apellidos', flex: 2, minWidth: 190 },
    {
      field: 'sex',
      headerName: 'Sexo',
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'position',
      headerName: 'Cargo',
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'journey',
      headerName: 'Jornada',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const journey = params?.row?.journey
        return (
          <Box>
            {journey && (
              <Tooltip title={journey}>
                <Icon sx={{ color: 'grey.400' }}>{icons.accessTime}</Icon>
              </Tooltip>
            )}
          </Box>
        )
      },
    },
    {
      field: 'groups',
      headerName: 'Grupos',
      flex: 1,
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const groups = params?.row.groups

        return (
          <Box>
            {groups && (
              <Tooltip title={groups}>
                <Icon sx={{ color: 'grey.400' }}>{icons.group}</Icon>
              </Tooltip>
            )}
          </Box>
        )
      },
    },
  ]

  return (
    <TableBase
      getRowHeight={() => 'auto'}
      rows={rows}
      pageSizeOptions={[20]}
      rowCount={sizeTable}
      loading={isLoad}
      columns={columns}
      getDataTable={getDataTable}
    />
  )
}
