import { Tooltip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { DataCatalog } from '../types'
import { ActionButtons, FontName } from 'core'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'
import { useContext, useMemo } from 'react'
import { ModelContext } from '../context'

export const useTableIncidentsRecords = (
  visualizeRadioClick: (data: DataCatalog) => void,
  handleRadioClick: (data: DataCatalog) => void,
  deleteRadioClick: (data: DataCatalog) => void,
  activeRadioClick: (data: DataCatalog) => void,
) => {
  const { hasUpdatePermission, hasDeletePermission } = usePermissions()
  const { loadingStatus } = useContext(ModelContext)
  const { canEdit, canDelete } = useMemo(
    () => ({
      canEdit: hasUpdatePermission(ServicesKeys.Catalogs),
      canDelete: hasDeletePermission(ServicesKeys.Catalogs),
    }),
    [], // eslint-disable-line
  )

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      disableColumnMenu: true,
    },

    {
      field: 'relationship',
      headerName: 'Relacionado con',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      disableColumnMenu: true,
      renderCell: (params) => {
        const title = params.value.map((item: string) => item).join(', ')

        return (
          <>
            {title && (
              <Tooltip title={title} arrow>
                <Typography
                  color="text.primary"
                  sx={{
                    color: '#828282',
                    fontFamily: FontName.RobotoRegular,
                    fontSize: '0.875rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            )}
          </>
        )
      },
    },
    {
      field: 'isActive',
      headerName: 'Estatus',
      headerAlign: 'left',
      align: 'left',
      sortable: true,
      renderCell: (params) => {
        return (
          <Typography color="text.primary" sx={{ color: '#828282', fontSize: '0.9rem' }}>
            {params.value
              ? params.row.catalogueTypeId === 1
                ? 'Activo'
                : 'Activa'
              : params.row.catalogueTypeId === 2
                ? 'Inactiva'
                : 'Inactivo'}
          </Typography>
        )
      },
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.8,
      sortable: false,
      align: 'left',
      disableColumnMenu: true,

      renderCell: (params: { row: DataCatalog }) => {
        const { isActive } = params.row

        return (
          <ActionButtons
            isActivate={isActive}
            disabled={loadingStatus}
            onClick={{
              ...(canEdit && { visualize: () => visualizeRadioClick(params.row) }),
              ...(canEdit && { edit: () => handleRadioClick(params.row) }),
              ...(canDelete && { remove: () => deleteRadioClick(params.row) }),
              ...(canEdit && {
                power: () => {
                  if (!loadingStatus) {
                    activeRadioClick(params.row)
                  }
                },
              }),
            }}
          />
        )
      },
    },
  ]

  return { columns }
}
