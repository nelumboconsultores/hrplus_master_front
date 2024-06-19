import { Box } from '@mui/material'
import {
  ActionButtons,
  AppContext,
  ConfirmationModal,
  GeneralList,
  PathName,
  Variant,
  generateQueryParams,
  useValidations,
} from 'core'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { NameBold, ScheduledShifts } from 'modules/workingDays/components'
import { useNavigate } from 'react-router-dom'
import { getWorkPeriods, removeWorkPeriod, updateStatus } from 'core/services'
import { useCallback, useContext, useMemo, /* useEffect ,*/ useState } from 'react'
import { TableMainType } from 'modules/workingDays/types'
import { StaWorkingEnum, connectingWorkshops } from 'modules/workingDays/utils'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FilterBody } from 'modules/workingDays/components/filterBody'
import { workPerioType } from 'modules/workingDays/enums/workPerioType'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'
import { errorCodes } from 'core/locale/es/errorCodes'

const options = [
  { value: 1, label: 'valor 1' },
  { value: 2, label: 'valor 2' },
]

interface FormData {
  search: string
  daysOfWeek: Array<string> | undefined
  statusWorkingDay: number | undefined
  dateFrom: number | undefined
  dateTo: number | undefined
}

type DeleteRow = {
  id: string
  state: boolean
}

const ListWorking = () => {
  const { t } = useTranslation()
  const [openConfirmation, setOpenConfirmation] = useState<DeleteRow | undefined>()
  const [rows, setRows] = useState<TableMainType>([])
  const [isLoad, setIsLoad] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const { optionalString } = useValidations()
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const methods = useForm<FormData>({
    defaultValues: {
      statusWorkingDay: StaWorkingEnum.Todos,
    },
    resolver: zodResolver(
      z.object({
        search: optionalString(),
      }),
    ),
  })
  const { hasUpdatePermission, hasDeletePermission, hasCreatePermission } = usePermissions()

  const { canEdit, canDelete, canCreate } = useMemo(
    () => ({
      canEdit: hasUpdatePermission(ServicesKeys.WorkPeriods),
      canDelete: hasDeletePermission(ServicesKeys.WorkPeriods),
      canCreate: hasCreatePermission(ServicesKeys.WorkPeriods),
    }),
    [], // eslint-disable-line
  )

  const onSubmit = async () => {
    setLoading(true)
    await getDataTable()
    setLoading(false)
  }

  const handleClearFilters = () => {
    methods.setValue('search', '')
    methods.setValue('daysOfWeek', undefined)
    methods.setValue('statusWorkingDay', 3)
    methods.setValue('dateFrom', undefined)
    methods.setValue('dateTo', undefined)
    setRows([])
  }
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('workingDays.table.descriptiveName'),
      flex: 1,
      sortable: true,
      align: 'left',

      renderCell: (params) => <NameBold value={params.value} />,
    },
    {
      field: 'workPeriodType',
      headerName: t('workingDays.table.type'),
      flex: 1,
      align: 'left',
      sortable: true,
      renderCell: (params) => <NameBold value={params.value} />,
    },
    {
      field: 'scheduled_Shifts',
      headerName: t('workingDays.table.scheduledShifts'),
      flex: 2.5,
      sortable: false,
      renderCell: (params) => <ScheduledShifts value={params.value} />,
    },
    {
      field: 'quantityProfiles',
      headerName: t('workingDays.table.associatedUsers'),
      flex: 1,
      sortable: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <NameBold value={params.value} />,
    },
    {
      field: 'state',
      headerName: 'Estatus',
      headerAlign: 'center',
      align: 'center',
      sortable: true,
      renderCell: (params) => (
        <NameBold
          value={params.value ? t('workingDays.table.active') : t('workingDays.table.inactive')}
        />
      ),
    },
    {
      field: 'action',
      flex: 1,
      sortable: false,
      renderHeader: () => <></>,
      renderCell: (params: { row: { state: boolean; id: string } }) => {
        const { state, id } = params.row

        return (
          <ActionButtons
            isActivate={state}
            disabled={loadingStatus}
            onClick={{
              ...(canEdit && { edit: () => navigate(PathName.EditScheduleView + `/${id}`) }),
              ...(canDelete && {
                remove: () => setOpenConfirmation(params.row as DeleteRow | undefined),
              }),
              ...(canEdit && {
                power: () => {
                  if (!loadingStatus) {
                    updateButton(state as boolean, id as string)
                  }
                },
              }),
            }}
          />
        )
      },
    },
  ]
  const updateButton = async (active: boolean, id: string) => {
    setLoadingStatus(true)
    const body = {
      active: !active,
    }
    const response = await updateStatus(id, body)
    if (response?.data) {
      getDataTable()
      setActMessage({
        type: Variant.success,
        message: active ? t('workingDays.snackbar.desc') : t('workingDays.snackbar.act'),
      })
    }

    if (response?.error) {
      if (response?.error?.errors?.code === 'C01WRKP06') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01WRKP06,
        })
      } else {
        setActMessage({
          type: Variant.error,
          message: 'No se pudo actualizar',
        })
      }
    }
    setLoadingStatus(false)
  }

  const removeButton = async (row: DeleteRow | undefined) => {
    if (row && !row?.state) {
      const response = await removeWorkPeriod(row?.id)
      if (response?.data) {
        getDataTable()
        setActMessage({
          type: Variant.success,
          message: t('workingDays.snackbar.delete'),
        })
        setOpenConfirmation(undefined)
      }
      if (response?.error) {
        setActMessage({
          type: Variant.error,
          message: t('workingDays.snackbar.couldNotEliminated'),
        })
      }
    } else {
      setActMessage({
        type: Variant.error,
        message: t('workingDays.snackbar.errorDelete'),
      })
    }
  }

  const getDataTable = useCallback(
    async (page?: number, pageSize?: number, name?: string | null, sort?: string | null) => {
      setIsLoad(true)
      /*   const search = methods.getValues('search')
      const daysOfWeek = methods.getValues('daysOfWeek')
      const timeFrom = methods.getValues('dateFrom')
      const timeTo = methods.getValues('dateTo') */
      /*      if (search || daysOfWeek || timeFrom || timeTo) { */
      const body = {
        search: methods.getValues('search'),
        daysOfWeek: methods.getValues('daysOfWeek'),
        isActive:
          methods.getValues('statusWorkingDay') === StaWorkingEnum.Activo
            ? 'true'
            : methods.getValues('statusWorkingDay') === StaWorkingEnum.Inactivo
              ? 'false'
              : undefined,
        timeFrom: methods.getValues('dateFrom'),
        timeTo: methods.getValues('dateTo'),
        page: page,
        size: pageSize,
        order: sort,
        column: name,
      }

      const queryParams = generateQueryParams(body)

      const response = await getWorkPeriods(queryParams)
      if (response.data) {
        if (response.data.data.content.length > 0) {
          const newsRows = response?.data?.data?.content.map((item) => {
            return {
              id: item?.workPeriod?.id,
              name: item?.workPeriod?.name ?? '',
              workPeriodType:
                workPerioType[item?.workPeriod.workPeriodType.name as keyof typeof workPerioType] ??
                '',
              scheduled_Shifts: connectingWorkshops(item?.workTurns) ?? [],
              quantityProfiles: item.quantityProfiles ?? 0,
              state: item?.active ?? false,
              sex: '',
              position: '',
            }
          })

          setSizeTable(response.data.data.totalElements)

          setRows(newsRows ?? [])
        } else {
          setActMessage({
            type: Variant.info,
            message: 'No se encontraron resultados.',
          })
          setRows([])
        }
      }
      if (response.error) {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }
      /*    } else {
        setActMessage({
          type: Variant.info,
          message:
            'Para iniciar la búsqueda, por favor selecciona al menos un filtro adicional junto con el estado.',
        })
        setRows([])
        setIsLoad(false)
      } */
      setIsLoad(false)
    },
    [methods], // eslint-disable-line
  )

  return (
    <Box>
      <GeneralList
        filters={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {<FilterBody getDataFilter={getDataTable} options={options} loading={loading} />}
            </form>
          </FormProvider>
        }
        title={t('workingDays.title.WorkingDays')}
        buttonLabelFilter={t('incidents.filter')}
        buttonFilterProps={{
          onClick: handleClearFilters,
        }}
        buttonLabel={canCreate ? t('workingDays.button.newDay') : ''}
        tableProps={{
          sortModel: sortModel,
          rows: rows,
          columns: columns,
          loading: isLoad,
          rowCount: sizeTable,
          getDataTable: getDataTable,
          onSortModelChange: (newSortModel) => {
            getDataTable(undefined, undefined, newSortModel[0]?.field, newSortModel[0]?.sort)
            setSortModel(newSortModel)
          },
        }}
        buttonProps={{ onClick: () => navigate(PathName.NewScheduleView) }}
      />

      <ConfirmationModal
        open={!!openConfirmation}
        title={t('workingDays.modal.title')}
        description={t('workingDays.modal.subtitle')}
        onClose={() => setOpenConfirmation(undefined)}
        onConfirm={() => removeButton(openConfirmation as DeleteRow | undefined)}
      />
    </Box>
  )
}

export default ListWorking
