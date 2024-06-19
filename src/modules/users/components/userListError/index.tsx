import { Checkbox } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { TableBase, Variant } from 'core'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'

export const UserListError = () => {
  const { rowsError, profileIds, idListSave, checkAll, setProfileIds, setCheckAll } =
    useContext(UsersContext)

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
            const ids = rowsError.map((item) => item.id)
            if (!checkAll) setProfileIds(ids)
            else {
              setProfileIds([])
            }

            setCheckAll(!checkAll)
          }}
        />
      ),
    },
    { field: 'name', headerName: 'Nombres y Apellidos', flex: 2 },
    {
      field: 'sex',
      headerName: 'Sexo',
      flex: 1,
    },
    {
      field: 'position',
      headerName: 'Cargo',
      flex: 1,
    },
    {
      field: 'conflict_detected',
      headerName: 'Conflicto detectado',
      flex: 3,
    },
  ]

  return (
    <TableBase
      variant={Variant.error}
      rows={rowsError}
      pageSizeOptions={[20]}
      columns={columns}
      hideFooter
    />
  )
}
