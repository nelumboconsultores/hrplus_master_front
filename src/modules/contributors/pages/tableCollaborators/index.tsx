import { Box, Typography } from '@mui/material'
import {
  ActionButtons,
  AppContext,
  DynamicFormValues,
  PathName,
  Variant,
  generateQueryParams,
} from 'core'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getProfiles } from 'core/services'
import { useCallback, useContext, useMemo, useState } from 'react'
import { FilterDrawer } from 'modules/contributors/components/filterDrawer'
import { GeneralListColab } from 'core/components/generalListColab'
import { GenderEnumComplete } from 'modules/users/components/enum/genderEnum'
import { TableMainType } from 'modules/contributors/types/TableMainType'
import { StatusEnum } from 'modules/users/components/enum/statusEnum'
import { FilterType } from 'modules/contributors/types/filterType'
import dayjs from 'dayjs'
import { formatCurrency, formatPhone } from 'core/utils/textFormat'
import { useLocation } from 'react-router-dom'

const TableCollaborators = () => {
  const location = useLocation()
  const { flag } = location.state || {}
  const { t } = useTranslation()
  const [open, setOpen] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [seeCollaborators, setSeeCollaborators] = useState(!flag)
  const [rows, setRows] = useState<TableMainType[]>([])
  const [isLoad, setIsLoad] = useState(false)
  const [initVal, setInitVal] = useState<DynamicFormValues>({})
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [inicial, setInicial] = useState(true)
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    statusId: [1, 3],
    costCenterId: undefined,
    groupIds: undefined,
    workPositionId: undefined,
    geographyStructIds: undefined,
  })

  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)

  const handleToggleFilterDrawer = () => {
    setOpen(!open)
  }

  const handleSeeCollaborators = () => {
    setSeeCollaborators(!seeCollaborators)
    setRows([])
    setSizeTable(0)
    setFilters({
      search: '',
      statusId: [1, 3],
      costCenterId: undefined,
      groupIds: undefined,
      workPositionId: undefined,
      geographyStructIds: undefined,
    })
    setOpen(false)
  }

  const { canCreate } = useMemo(
    () => ({
      canEdit: true,
      canCreate: true,
    }),
    [], // eslint-disable-line
  )

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 0.2, minWidth: 80 },
    { field: 'firstName', headerName: 'Nombres', flex: 2, minWidth: 200 },
    { field: 'lastName', headerName: 'Apellidos', flex: 2, minWidth: 200 },
    { field: 'sex', headerName: 'Sexo', flex: 1, minWidth: 80 },
    { field: 'rol', headerName: 'Rol', flex: 0.2, minWidth: 75 },
    { field: 'hiredDate', headerName: 'F. ingreso', flex: 0.5, minWidth: 130 },
    { field: 'userPhone', headerName: 'Teléfono', flex: 1, minWidth: 130 },
    { field: 'minSalary', headerName: 'Salario Mín. General', flex: 1.5, minWidth: 180 },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 0.5,
      minWidth: 100,
      renderCell: ({ row }) => {
        const status = row?.status ? StatusEnum[row.status] : 'N/A'
        return <Typography sx={{ fontSize: '14px', color: '#828282' }}>{status}</Typography>
      },
    },
    {
      field: 'action',
      flex: 0.3,
      sortable: false,
      minWidth: 50,
      renderHeader: () => <></>,
      renderCell: (params: { row: { state: boolean; idOrig: string } }) => {
        const { state, idOrig } = params.row

        return (
          <ActionButtons
            isActivate={state}
            onClick={{
              visualize: () => navigate(PathName.contributorsListDetail + `/${idOrig}`),
            }}
          />
        )
      },
    },
  ]

  const getDataTable = useCallback(
    async (
      page?: number,
      pageSize?: number,
      name?: string | null,
      sort?: string | null,
      search?: string,
      statusId?: number | number[],
      costCenterId?: number,
      groupsIds?: number[],
      workPositionId?: number,
      geographyStructIds?: number[],
    ) => {
      if (inicial) {
        setInicial(false)
        return
      }
      setIsLoad(true)
      const body = {
        size: pageSize,
        page: page,
        statusId: statusId ? statusId : [1, 3],
        search: search,
        groupIds: groupsIds,
        geographyStructIds: geographyStructIds,
        costCenterId: costCenterId,
        workPositionId: workPositionId,
        name,
        sort,
      }

      const queryParams = generateQueryParams(body)

      const response = await getProfiles(queryParams)
      if (response.data) {
        const newsRows = response?.data?.data?.content.map((item) => ({
          idOrig: item?.id ?? 'N/A',
          id: item?.usernameCode ?? 'N/A',
          firstName: item?.firstName ? item?.firstName + ' ' + (item?.middleName ?? '') : 'N/A',
          lastName: item?.lastName ? item?.lastName + ' ' + (item?.maidenName ?? '') : 'N/A',
          sex: item?.gender ? GenderEnumComplete[item?.gender] : 'N/A',
          rol: item?.rol ?? 'N/A',
          hiredDate: item?.hiredDate ? dayjs(item?.hiredDate).format('DD/MM/YYYY') : 'N/A',
          userPhone: item?.userPhone ? formatPhone(item?.userPhone) : 'N/A',
          minSalary: item?.workPosition?.minSalary
            ? formatCurrency(Number(item?.workPosition?.minSalary))
            : 'N/A',
          status: item?.profileStatus.id ?? 'N/A',
        }))

        setSizeTable(response.data.data.totalElements)
        setOpen(false)
        setRows(newsRows ?? [])
      } else if (response.error) {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }

      setIsLoad(false)
    },
    [inicial, setActMessage, t],
  )
  console.log(filters)

  const getDataTableOrder = async (
    page?: number,
    pageSize?: number,
    name?: string | null,
    sort?: string | null,
  ) => {
    if (inicial) {
      setInicial(false)
      return
    }
    setIsLoad(true)
    console.log(filters, 'desde getDataTableOrder')

    const body = {
      size: pageSize,
      page: page,
      statusId: filters?.statusId ? filters?.statusId : [1, 3],
      search: filters.search,
      groupIds: filters.groupIds,
      geographyStructIds: filters.geographyStructIds,
      costCenterId: filters.costCenterId,
      workPositionId: filters.workPositionId,
      name,
      sort,
    }
    const queryParams = generateQueryParams(body)
    const response = await getProfiles(queryParams)
    if (response.data) {
      const newsRows = response?.data?.data?.content.map((item) => ({
        idOrig: item?.id ?? 'N/A',
        id: item?.usernameCode ?? 'N/A',
        firstName: item?.firstName ? item?.firstName + ' ' + (item?.middleName ?? '') : 'N/A',
        lastName: item?.lastName ? item?.lastName + ' ' + (item?.maidenName ?? '') : 'N/A',
        sex: item?.gender ? GenderEnumComplete[item?.gender] : 'N/A',
        rol: item?.rol ?? 'N/A',
        hiredDate: item?.hiredDate ? dayjs(item?.hiredDate).format('DD/MM/YYYY') : 'N/A',
        userPhone: item?.userPhone ? formatPhone(item?.userPhone) : 'N/A',
        minSalary: item?.workPosition?.minSalary
          ? formatCurrency(Number(item?.workPosition?.minSalary))
          : 'N/A',
        status: item?.profileStatus.id ?? 'N/A',
      }))

      setSizeTable(response.data.data.totalElements)
      setOpen(false)
      setRows(newsRows ?? [])
    } else if (response.error) {
      setActMessage({
        type: Variant.error,
        message: t('authentication.alertError'),
      })
    }

    setIsLoad(false)
  }

  return (
    <>
      <Box>
        <GeneralListColab
          title={
            seeCollaborators ? t('contributors.title.contributors') : 'Contrataciones Pendientes'
          }
          buttonLabelOpenFilterProps={{
            onClick: handleToggleFilterDrawer,
          }}
          buttonLabelCollaboratorsProps={{
            onClick: handleSeeCollaborators,
          }}
          buttonLabelCollaborators={
            seeCollaborators ? 'Ver contrataciones pendientes' : 'Ver colaboradores'
          }
          buttonLabelOpenFilter={'filter'}
          buttonLabel={canCreate && !seeCollaborators ? t('workingDays.button.newDay') : ''}
          tableProps={{
            sortModel: sortModel,
            rows: rows,
            columns: columns,
            loading: isLoad,
            rowCount: sizeTable,
            getDataTable: (page, pageSize, name, sort) => {
              setPage(page)
              setPageSize(pageSize)
              getDataTable(
                page,
                pageSize,
                name,
                sort,
                filters.search,
                filters.statusId,
                filters.costCenterId,
                filters.groupIds,
                filters.workPositionId,
              )
            },
            onSortModelChange: (newSortModel) => {
              getDataTableOrder(page, pageSize, newSortModel[0]?.field, newSortModel[0]?.sort)
              setSortModel(newSortModel)
            },
            getRowId: (row) => row.idOrig,
          }}
          buttonProps={{ onClick: () => navigate(PathName.contributorsCreate) }}
        />
      </Box>
      <FilterDrawer
        open={open}
        seeCollaborators={seeCollaborators}
        status={!seeCollaborators ? 2 : undefined}
        onClose={handleToggleFilterDrawer}
        getDataTable={getDataTable}
        initVal={initVal}
        setInitVal={setInitVal}
        setFilters={setFilters}
      />
    </>
  )
}

export default TableCollaborators
