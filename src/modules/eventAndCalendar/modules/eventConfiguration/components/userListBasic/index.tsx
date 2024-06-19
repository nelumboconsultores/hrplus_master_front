import { Checkbox } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { TableBase } from 'core'
import { DataUserTable } from 'modules/eventAndCalendar/types/dataUserTable'

type UserListBasicProps = {
  isLoad: boolean
  checkAll: boolean
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>
  profileIds: number[]
  setProfileIds: React.Dispatch<React.SetStateAction<number[]>>
  sizeTable: number
  rows: DataUserTable[]
  getDataTable: () => void
  idListSave: (id: number) => void
}

export const UserListBasic: React.FC<UserListBasicProps> = ({
  isLoad,
  getDataTable,
  sizeTable,
  rows,
  /* checkAll,
  setCheckAll,
  setProfileIds, */
  profileIds,
  idListSave,
}) => {
  const columns: GridColDef[] = [
    {
      field: 'check',
      headerName: '',
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
      /* renderHeader: () => (
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
      ), */
    },
    { field: 'idOrig', headerName: 'ID', flex: 0.5, minWidth: 70 },
    { field: 'firstName', headerName: 'Nombre', flex: 2, minWidth: 200 },
    { field: 'lastName', headerName: 'Apellidos', flex: 2, minWidth: 200 },
    { field: 'sex', headerName: 'Sexo', flex: 0.2, minWidth: 80 },
    { field: 'rol', headerName: 'Rol', flex: 0.2, minWidth: 75 },
    { field: 'email', headerName: 'Correo Electrónico', flex: 2, minWidth: 220 },
    { field: 'position', headerName: 'Puesto', flex: 2, minWidth: 120 },
    { field: 'branch', headerName: 'Sucursal', flex: 2, minWidth: 120 },
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
