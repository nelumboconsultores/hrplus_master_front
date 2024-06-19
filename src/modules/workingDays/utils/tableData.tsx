import { GridColDef } from '@mui/x-data-grid'
import { ActionButtons } from 'core'
import { NameBold, ScheduledShifts } from '../components'
import { StateComponent } from '../components/state'
import { t } from 'i18next'

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: t('workingDays.table.descriptiveName'),
    flex: 1,
    sortable: true,
    align: 'center',
    renderCell: (params) => <NameBold value={params.value} />,
  },
  {
    field: 'scheduled_Shifts',
    headerName: t('workingDays.table.scheduledShifts'),
    flex: 2,
    sortable: false,
    renderCell: (params) => <ScheduledShifts value={params.value} />,
  },
  {
    field: 'quantityProfiles',
    headerName: t('workingDays.table.associatedUsers'),
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <NameBold value={params.value} />,
  },
  {
    field: 'state',
    headerName: t('workingDays.table.status'),
    flex: 1,
    sortable: false,
    headerAlign: 'center',
    align: 'center',

    renderCell: (params) => <StateComponent value={params.value} />,
  },
  {
    field: 'action',
    flex: 1,
    sortable: false,
    renderHeader: () => <></>,
    renderCell: () => <ActionButtons onClick={{}} />,
  },
]
