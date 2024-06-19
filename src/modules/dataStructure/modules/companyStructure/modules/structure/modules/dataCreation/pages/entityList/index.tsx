import { Box, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
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
import Spinner from 'core/components/spinner'
import { getListOrganizations, removeOrganization } from 'core/services'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import { TableType } from '../../enums'
import {
  returnBodyModal,
  returnNavigationEdit,
  returnNavigationModalInit,
  returnTitleModal,
  returnTitleTable,
} from 'modules/dataStructure/modules/companyStructure/modules/structure/utils'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'

export const EntityList = () => {
  const [loading, setLoading] = useState(false)
  const [tableRows, setTableRows] = useState<TableType[]>([])
  const [response, setResponse] = useState<boolean>(false)
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [openConfirmation, setOpenConfirmation] = useState<string>()
  const { setActMessage } = useContext(AppContext)
  const [completed, setCompleted] = useState(false)
  const [isFirst, setIsFirst] = useState(true)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  useEffect(() => {
    getDataTable()
  }, []) // eslint-disable-line
  const { hasCreatePermission, hasUpdatePermission, hasDeletePermission } = usePermissions()

  const { canCreate, canDelete } = useMemo(
    () => ({
      canCreate: hasCreatePermission(ServicesKeys.OrgEntities),
      canEdit: hasUpdatePermission(ServicesKeys.OrgEntities),
      canDelete: hasDeletePermission(ServicesKeys.OrgEntities),
    }),
    [], // eslint-disable-line
  )
  const columns = useMemo(() => {
    const realColumns: GridColDef[] = [
      { field: 'id', headerName: t('operatingLevel.table.id'), flex: 1 },
      { field: 'name', headerName: t('operatingLevel.table.name'), flex: 2 },
      {
        field: 'recordCount',
        headerName: t('operatingLevel.table.associatedRecords'),
        flex: 3,
      },
    ]

    const actionColumsn: GridColDef = {
      field: 'actions',
      headerName: '',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <ActionButtons
          onClick={{
            edit: () => navigate(returnNavigationEdit(id ?? '', params.row.id as string)),
            ...(canDelete &&
              !completed && { remove: () => setOpenConfirmation(params.row.id as string) }),
          }}
        />
      ),
    }
    realColumns.push(actionColumsn)

    return realColumns
  }, [completed]) //eslint-disable-line

  const removeItem = async (id?: string) => {
    if (!id) return
    const response = await removeOrganization(id)
    if (response.data) {
      setActMessage({
        message: t('operatingLevel.message.successDelete'),
        type: Variant.success,
      })
      getDataTable()
    } else {
      setActMessage({
        code: response.error?.errors.code,
        type: Variant.error,
      })
    }
    setOpenConfirmation(undefined)
  }
  const getDataTable = useCallback(
    async (
      page?: number,
      pageSize?: number,
      sort?: string | null,
      name?: string | null,
      search: string = '',
    ) => {
      setResponse(false)
      const body = {
        page: page ?? 1,
        size: pageSize ?? 20,
        orgEntityTypeId: Number(id),
        parentId: 0,
        order: sort,
        column: name,
        search,
      }
      const queryParams = generateQueryParams(body)

      const { data: resp } = await getListOrganizations(queryParams)

      if (resp) {
        setResponse(true)
        setCompleted(
          resp?.data?.content[0]?.orgEntityType?.complete ||
            (resp.data.content.length === 0 && !isFirst),
        )
        const contentData = resp.data.content.map((item) => {
          return {
            id: item.id,
            name: item.name ?? '-',
            recordCount: item.recordCount ?? '-',
            actions: '',
          }
        })
        setSizeTable(resp.data.totalElements)
        setTableRows(contentData ?? [])
        if (contentData.length > 0) setIsFirst(false)
      }

      setLoading(false)
    },
    [tableRows], // eslint-disable-line
  )
  if (tableRows?.length === 0 && isFirst) {
    if (isFirst)
      return (
        <Box>
          <Spinner />
          <ModalStart
            open={tableRows?.length === 0 && response}
            title={t(returnTitleModal(id ?? ''))}
            description={t(returnBodyModal(id ?? ''))}
            textButton={t('operatingLevel.button.letsStart')}
            clickButton={() => navigate(returnNavigationModalInit(id ?? ''))}
          />
        </Box>
      )
  }
  return (
    <>
      <GeneralList
        routeBreadCrumbs={false}
        inputSearch
        searchProps={{
          getSearchValue: (value) =>
            getDataTable(undefined, undefined, undefined, undefined, value),
        }}
        title={t(returnTitleTable(id ?? ''))}
        tableProps={{
          columns: columns,
          rows: tableRows,
          loading: loading,
          getDataTable: getDataTable,
          rowCount: sizeTable,
          getRowHeight: () => 40,
          onSortModelChange: (newOrder) => {
            getDataTable(undefined, undefined, newOrder[0]?.sort, newOrder[0]?.field)
          },
        }}
        buttonProps={{
          onClick: () => {
            navigate(PathName.creationDataEntity + `/${id}`)
          },
        }}
        buttonLabel={!canCreate ? '' : completed ? '' : 'Nuevo'}
      />
      {tableRows.length === 0 && !isFirst && (
        <Typography variant="h6">{t('operatingLevel.message.noData')}</Typography>
      )}
      <ConfirmationModal
        open={!!openConfirmation}
        title={t('operatingLevel.modals.deleteEntity')}
        description={t('operatingLevel.modals.subtitle')}
        onClose={() => setOpenConfirmation(undefined)}
        onConfirm={() => removeItem(openConfirmation as string)}
      />
    </>
  )
}
