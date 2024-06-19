import { Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { DataCatalogIncidents } from 'modules/catalogMotifs/types'
import { ActionButtons, FontName } from 'core'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'
import { useContext, useMemo } from 'react'
import { ModelContext } from '../context'

export const useTableIncidentsRecords = (
  handleRadioClick: (data: DataCatalogIncidents) => void,
  /*  deleteRadioClick: (data: DataCatalogIncidents) => void, */
  activeRadioClick: (data: DataCatalogIncidents) => void,
) => {
  const { hasUpdatePermission /* hasDeletePermission */ } = usePermissions()
  const { loadingStatus } = useContext(ModelContext)
  const { canEdit /* canDelete */ } = useMemo(
    () => ({
      canEdit: hasUpdatePermission(ServicesKeys.SolicitationCatalogs),
      /*   canDelete: hasDeletePermission(ServicesKeys.Catalogs), */
    }),
    [], // eslint-disable-line
  )
  const getCellClassName = (field: string) => {
    if (field === 'amountRegisters') {
      return 'green-text'
    }
    return ''
  }

  const NameCell = ({ value }: { value: string }) => (
    <Box sx={{ padding: '8px 0px 8px 0px' }}>
      <Typography
        sx={{
          fontFamily: FontName.RobotoRegular,
          color: 'grey.400',
          lineHeight: 1.2,
          letterSpacing: '0.1px',
          textAlign: 'center',
          fontSize: '0.9rem',
        }}
      >
        {value}
      </Typography>
    </Box>
  )

  const DescriptionCell = ({ value }: { value: string }) => (
    <Box sx={{ padding: '8px 0px 8px 0px' }}>
      <Typography
        sx={{
          fontFamily: FontName.RobotoRegular,
          color: 'grey.400',
          lineHeight: 1.2,
          letterSpacing: '0.1px',
          fontSize: '0.9rem',
        }}
      >
        {value}
      </Typography>
    </Box>
  )

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre de la Incidencia',
      flex: 1.3,
      headerAlign: 'left',
      align: 'left',
      disableColumnMenu: true,
      renderCell: (params) => <NameCell value={params.value} />,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      flex: 2,
      headerAlign: 'left',
      align: 'left',
      disableColumnMenu: false,
      renderCell: (params) => <DescriptionCell value={params.value} />,
    },
    {
      field: 'amountAssociations',
      headerName: '# Asociaciones',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      cellClassName: getCellClassName('amountAssociations'),
    },
    {
      field: 'amountRegisters',
      headerName: '# Registros',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      cellClassName: getCellClassName('amountRegisters'),
    },
    {
      field: 'isActive',
      headerName: 'Estatus',
      headerAlign: 'center',
      align: 'center',
      sortable: true,
      renderCell: (params) => (
        <Typography color="text.primary" sx={{ color: '#828282', fontSize: '0.9rem' }}>
          {params.value ? 'Activo' : 'Inactivo'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.7,
      sortable: false,
      align: 'right',
      disableColumnMenu: true,
      renderCell: (params: { row: DataCatalogIncidents }) => {
        const { isActive } = params.row

        return (
          <ActionButtons
            isActivate={isActive}
            disabled={loadingStatus}
            onClick={{
              ...(canEdit && { edit: () => handleRadioClick(params.row) }),
              /*   ...(canDelete && { remove: () => deleteRadioClick(params.row) }), */
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
