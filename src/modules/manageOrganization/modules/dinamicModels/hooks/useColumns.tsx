import { useTranslation } from 'react-i18next'
import { GridColDef } from '@mui/x-data-grid'

import { ActionButtons } from 'core'

import { ModelStatus } from '../enums'
import { Model } from '../types/model.type'
import { useContext } from 'react'
import { ModelContext } from '../context'
import { Typography } from '@mui/material'
import { dateToSpanish } from 'core/utils/textFormat'

type Params = {
  status: (status: Model) => void
  visualize: (data: Model) => void
  delete: (data: Model) => void
  edit: (data: Model) => void
}

export const useColumns = ({ status, visualize, delete: deleteModel, edit }: Params) => {
  const { modelLocale, loadingStatus } = useContext(ModelContext)
  const { t } = useTranslation()
  const columns: GridColDef<Model>[] = [
    {
      field: 'createdAt',
      headerName: t(`${modelLocale}.view.columns.registerDate`),
      flex: 1,
      sortable: true,
      renderCell: ({ value }) => dateToSpanish(value),
    },
    {
      field: 'code',
      headerName: t(`${modelLocale}.view.columns.code`),
      flex: 1,
      sortable: true,
    },
    {
      field: 'denomination',
      headerName: t(`${modelLocale}.view.columns.denomination`),
      flex: 1,
      sortable: true,
    },
    {
      field: 'status',
      sortable: true,
      headerName: t(`${modelLocale}.view.columns.status`),
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: '14px', color: '#828282' }}>
          {t(`${modelLocale}.view.status.${row.status.name.toLowerCase()}`)}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: '',
      flex: 0.8,
      sortable: false,
      align: 'left',
      disableColumnMenu: true,

      renderCell: (params) => {
        const { status: modelStatus } = params.row

        return (
          <ActionButtons
            isActivate={modelStatus.id === ModelStatus.Active}
            disabled={loadingStatus}
            onClick={{
              visualize: () => visualize(params.row),
              edit: () => edit(params.row),
              remove: () => deleteModel(params.row),
              power: () => {
                if (!loadingStatus) {
                  status(params.row)
                }
              },
            }}
          />
        )
      },
    },
  ]
  return columns
}
