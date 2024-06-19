import { Box, Typography } from '@mui/material'
import {
  ActionButtons,
  AppContext,
  ConfirmationModal,
  GeneralList,
  ModalStart,
  PathName,
  Variant,
  generateQueryParams,
} from 'core'
import { getFather, getInstances, removeInstance } from 'core/services'
import { MouseEvent, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from 'core/components/spinner'
import { GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { getDetailsEntity } from 'core/services/createRecords'
import { WrapperSelect } from 'core/components/popovers'
import { DefineStructButton, HeaderTitle } from '../../components'
import { useLocalState, usePermissions } from 'core/hooks'
import { RouteRoad } from '../../types'
import { ServicesKeys } from 'core/enum/routerEnum'
import {
  returnPathEdit,
  returnPathRouteCreate,
  returnPathTree,
} from 'modules/manageOrganization/utils'
import { dateToSpanish } from 'core/utils/textFormat'
import { ButtonBack } from 'modules/manageOrganization/components'

type InformationType = {
  title: string
  Children?: {
    id: number | string
    name: string
    function: (id?: number | string) => void
  }[]
}

export const ListInstances = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isResponse, setIsResponse] = useState(false)
  const [rowsTable, setRowsTable] = useState<GridRowsProp>([])
  const [information, setInformation] = useState<InformationType>()
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
  const [routeRoad, setRouteRoad] = useLocalState<RouteRoad[]>('routeRoad', [])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [openModal, setOpenModal] = useState<number>()
  const activeRemove = routeRoad.length > 1 || id !== '1'
  const { hasUpdatePermission } = usePermissions()
  const [isFirst, setIsFirst] = useState(true)
  const isHiddenButton =
    routeRoad.length === 1 &&
    id === '1' &&
    rowsTable &&
    (rowsTable?.length > 0 || (rowsTable.length === 0 && !isFirst))

  const { canEdit } = useMemo(
    () => ({
      canEdit: hasUpdatePermission(ServicesKeys.OrgEntitiesRelationships),
    }),
    [], // eslint-disable-line
  )
  const columns: GridColDef[] = [
    { field: 'id', headerName: t('operatingLevel.table.id'), flex: 1, sortable: true },
    { field: 'name', headerName: t('operatingLevel.table.name'), flex: 2, sortable: true },
    { field: 'date', headerName: t('operatingLevel.table.date'), flex: 3, sortable: true },
    {
      field: 'sublevels',
      headerName: t('operatingLevel.table.recordCount'),
      flex: 3,
      sortable: true,
    },
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const showSchema = id !== '1'
        return (
          <ActionButtons
            onClick={{
              ...(canEdit && {
                edit: () =>
                  navigate(
                    returnPathEdit(id ?? '1') +
                      `/${id}/${routeRoad?.[routeRoad.length - 1]?.oe_pid}/${routeRoad?.[
                        routeRoad.length - 1
                      ]?.oe_id}/${params.row.id}`,
                  ),
              }),
              ...(showSchema && {
                schema: () => {
                  const parentId = routeRoad?.[1]?.oe_id ? routeRoad?.[1]?.oe_id : params.row.id
                  navigate(returnPathTree(id ?? '1') + `/${id}/${parentId}`)
                },
              }),
              arrow: !information?.Children
                ? undefined
                : (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
                    setAnchorEl(event.currentTarget)
                    setIsFirst(true)
                    const newChildren = information?.Children?.map((item) => {
                      return {
                        id: item.id,
                        name: item.name,
                        function: () => {
                          setRouteRoad([
                            ...routeRoad,
                            {
                              oe_pid: Number(item.id),
                              oe_id: params.row.id,
                              instanceName: params.row.name,
                              entityName: information?.title ?? '',
                            },
                          ])

                          setAnchorEl(null)
                          setIsResponse(false)
                        },
                      }
                    })

                    setInformation({ title: information?.title ?? '', Children: newChildren })
                  },
              remove: activeRemove ? () => setOpenModal(params.row.id) : undefined,
            }}
          />
        )
      },
    },
  ]
  useEffect(() => {
    if (routeRoad.length === 0) initialFunction()
    else {
      getDataTable()
      getDetailsTables()
    }
  }, [routeRoad]) // eslint-disable-line
  const initialFunction = async () => {
    const response = await getFather(Number(id))
    if (response.data) {
      setRouteRoad([
        ...routeRoad,
        {
          oe_pid: response.data.data.id,
          oe_id: 0,
          instanceName: '',
          entityName: '',
        },
      ])
    }
  }

  const getDataTable = async (
    page: string = '0',
    size: string = '20',
    search: string = '',
    name?: string | null,
    sort?: string | null,
  ) => {
    const oe_pid = routeRoad?.[routeRoad.length - 1]?.oe_pid
    const oe_id = routeRoad?.[routeRoad.length - 1]?.oe_id

    const body = {
      page: page,
      size: size,
      search: search,
      order: sort,
      column: name,
    }
    const queryParams = generateQueryParams(body)

    const response = await getInstances(Number(oe_pid), Number(oe_id), queryParams)
    setIsResponse(true)

    if (response.data?.data.content.length === 0) {
      setRowsTable([])
      setOpenConfirmation(true)
    } else if (response.data) {
      const newTable = response.data.data.content.map((item) => ({
        id: item.id,
        name: item.name,
        date: dateToSpanish(item.createdAt),
        recordCount: item.recordCount,
        sublevels: item.sublevels,
      }))
      setRowsTable(newTable)
      if (newTable.length > 0) setIsFirst(false)
      setSizeTable(response.data.data.totalElements)
    }
  }

  const getDetailsTables = async () => {
    const oe_pid = routeRoad?.[routeRoad.length - 1]?.oe_pid
    const response = await getDetailsEntity(Number(oe_pid))
    if (response.data) {
      const newChildren = response.data?.data?.childs?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          function: () => {},
        }
      })

      setInformation({ title: response.data?.data?.name, Children: newChildren })
    }
  }

  const returnRouteRoad = () => {
    const newRouteRoad = routeRoad.slice(0, routeRoad.length - 1)
    setRouteRoad(newRouteRoad)
    setIsResponse(false)
  }

  const onReturn = () => {
    if (routeRoad.length > 1) returnRouteRoad()
    else navigate(-1)
  }

  const navigateToCreate = () => {
    const oe_pid = routeRoad?.[routeRoad.length - 1]?.oe_pid
    const oe_id = routeRoad?.[routeRoad.length - 1]?.oe_id
    navigate(returnPathRouteCreate(id ?? '1') + `/${id}/${oe_pid}/${oe_id}`)
  }
  const removeItem = async () => {
    const response = await removeInstance(
      Number(routeRoad?.[routeRoad.length - 1]?.oe_pid),
      Number(openModal),
    )
    if (response.data) {
      setActMessage({ message: t('creationRecords.messages.successRemove'), type: Variant.success })
      getDataTable()
    }
    if (response.error) {
      setActMessage({ code: response.error.errors.code, type: Variant.error })
    }
    setOpenModal(undefined)
  }

  if (isResponse) {
    if (rowsTable.length === 0 && isFirst)
      return (
        <ModalStart
          open={!!openConfirmation}
          title={t('creationRecords.noRecords')}
          description={t('creationRecords.noRecordsDescription')}
          onClose={() => setOpenConfirmation(false)}
          textButton={t('operatingLevel.button.letsStart')}
          clickButton={navigateToCreate}
          onReturn={onReturn}
          disableOnClose
        />
      )

    return (
      <Box>
        <Box sx={{ display: 'flex' }}>
          {routeRoad.length > 1 && (
            <ButtonBack click={returnRouteRoad} sx={{ position: 'inherit' }} />
          )}
        </Box>

        <GeneralList
          marginY={'14px'}
          routeBreadCrumbs={false}
          titleRender={<HeaderTitle title={information?.title ?? ''} routeRoad={routeRoad} />}
          tableProps={{
            columns,
            rows: rowsTable ?? [],
            rowCount: sizeTable,
            onSortModelChange: (newSortModel) => {
              getDataTable(
                undefined,
                undefined,
                undefined,
                newSortModel[0]?.field,
                newSortModel[0]?.sort,
              )
            },
          }}
          inputSearch
          searchProps={{
            getSearchValue: (value) => getDataTable('0', '20', value),
          }}
          children={<DefineStructButton />}
          buttonLabel={isHiddenButton ? '' : t('creationRecords.button.new')}
          buttonProps={{
            onClick: () => {
              navigate(
                PathName.creationInsOrnManagementView +
                  `/${id}/${routeRoad?.[routeRoad.length - 1]?.oe_pid}/${routeRoad?.[
                    routeRoad.length - 1
                  ]?.oe_id}`,
              )
            },
          }}
        />
        {rowsTable?.length === 0 && !isFirst && (
          <Typography variant="h6">{t('operatingLevel.message.noData')}</Typography>
        )}
        <WrapperSelect
          list={information?.Children ?? []}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
        />
        <ConfirmationModal
          open={Boolean(openModal)}
          onClose={() => setOpenModal(undefined)}
          title={t('creationRecords.modal.titleRemove')}
          description={t('creationRecords.modal.messageRemove')}
          onConfirm={removeItem}
        />
      </Box>
    )
  }

  if (!isResponse) return <Spinner />
}
