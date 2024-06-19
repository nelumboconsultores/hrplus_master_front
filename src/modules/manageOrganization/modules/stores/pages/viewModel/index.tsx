import { useState, useCallback, useContext, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { GridSortModel } from '@mui/x-data-grid'

import {
  AppContext,
  ConfirmationModal,
  GeneralList,
  ItemsSelectType,
  PathName,
  Variant,
  generateQueryParams,
} from 'core'

import { deleteModel, getModels, updateStatusModel } from '../../services/model.services'
import { Model } from '../../types/model.type'
import { FormProvider, useForm } from 'react-hook-form'
import { FilterBody } from '../../components/filterBody'
import { ActionTypes, ModelStatus } from '../../enums'
import { useColumns } from '../../hooks'
import { errorCodes } from 'core/locale/es/errorCodes'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModelContext } from '../../context'
import { Box, IconButton, Tooltip, darken } from '@mui/material'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'
import { AdvancedFilters, StoresMap } from '../../components'
import { colors } from 'core/styles/colors'
import { structureParams } from '../../utils/structureParams'

export type StrucData = { id: string; data: Record<string, ItemsSelectType> }
type FormData = {
  code: string
  denomination: string
  statusId: number
  geographyStructIds: StrucData[]
  organizativeStructIds: StrucData[]
}

export const ViewModel: React.FC = () => {
  const { setActMessage } = useContext(AppContext)
  const { modelDispatch, setLoadingStatus } = useContext(ModelContext)
  const location = useLocation()
  const locationState = location.state as { id?: string; code?: string; denomination?: string }
  const navigate = useNavigate()
  const methods = useForm<FormData>({ defaultValues: { statusId: ModelStatus.All } })
  const { t } = useTranslation()
  const columns = useColumns({
    status: handleStatusChange,
    visualize: handleVisualizeChange,
    delete: handleShowConfirmation,
    edit: handleEdit,
  })
  const [openConfirmation, setOpenConfirmation] = useState<Model>()
  const [rows, setRows] = useState<Model[]>([])
  const [isLoad, setIsLoad] = useState(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'createdAt', sort: 'asc' }])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)

  const hasLocaltionData = useMemo(
    () => locationState?.denomination && locationState?.code && locationState?.id,
    [locationState?.denomination, locationState?.code, locationState?.id],
  )

  const fetchData = useCallback(
    async (page?: number, pageSize?: number, name?: string | null, sort?: string | null) => {
      setIsLoad(true)
      const filters = methods.getValues()
      const body = {
        code: filters.code,
        denomination: filters.denomination,
        page: page,
        size: pageSize,
        order: sort,
        column: name,
        statusId:
          methods.getValues('statusId') === ModelStatus.All
            ? undefined
            : methods.getValues('statusId'),
        ...(hasLocaltionData && { costCenterIds: locationState.id }),
      }
      let queryParams = generateQueryParams(body)
      if (filters.geographyStructIds) {
        queryParams += `&${structureParams(filters.geographyStructIds, 'geographyStructIds')}`
      }
      if (filters.organizativeStructIds) {
        queryParams += `&${structureParams(filters.organizativeStructIds, 'organizativeStructIds')}`
      }

      const { data, error } = await getModels(queryParams)
      if (data) {
        if (data.data.content.length) {
          setRows(data.data.content)
          setSizeTable(data.data.totalElements)
        } else {
          setActMessage({
            type: Variant.info,
            message: 'No se encontraron resultados.',
          })
          setRows([])
        }
      } else if (error) {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }
      setIsLoad(false)
    },
    [setActMessage, t, methods, hasLocaltionData], //eslint-disable-line
  )

  const onSubmit = async () => {
    setLoading(true)
    await fetchData()
    setLoading(false)
  }

  const handleClearFilters = () => {
    methods.reset({ statusId: ModelStatus.All, code: '', denomination: '' })
    if (hasLocaltionData) navigate(PathName.instanceStoresView, { state: {} })

    setRows([])
  }
  /*  const handleDownload = () => {
    console.log('Downloading')
  } */

  async function handleVisualizeChange(data: Model) {
    navigate(`${PathName.instanceStoresDetail}/${data.id}`, { state: locationState })
  }
  const handleErrorMessage = (error: string, code?: string): void => {
    const errorCode = errorCodes[code as keyof typeof errorCodes]
    setActMessage({ type: Variant.error, message: errorCode ?? t(error) })
  }

  function handleShowConfirmation(data: Model) {
    setOpenConfirmation(data)
  }

  async function handleStatusChange(data: Model) {
    setLoadingStatus(true)
    const { data: resp, error } = await updateStatusModel(data.id)
    if (resp) {
      const { data } = resp
      const newStatus = data.status.id !== ModelStatus.Active ? 'desactivada' : 'activada'

      fetchData()
      setActMessage({
        type: Variant.success,
        message: t(`instancesStores.view.notifications.changeStatus`, { status: newStatus }),
      })
    } else {
      handleErrorMessage(
        `instancesStores.view.notifications.changeStatusError`,
        error?.errors?.code,
      )
    }
    setLoadingStatus(false)
  }
  async function handleDelete(data: Model) {
    if (data.status.id !== ModelStatus.Active) {
      const { data: resp, error } = await deleteModel(data.id)
      if (resp) {
        fetchData()
        setActMessage({
          type: Variant.success,
          message: t(`instancesStores.view.notifications.deleteSuccess`),
        })
      } else {
        handleErrorMessage(`instancesStores.view.notifications.deleteError`, error?.errors?.code)
      }
    } else {
      setActMessage({
        type: Variant.error,
        message: t(`instancesStores.view.notifications.changeStatusErrorAct`),
      })
    }
  }

  const handleCreate = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(PathName.instanceStoresCreation, { state: locationState })
  }
  function handleEdit(data: Model) {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(`${PathName.instanceStoresEdit}/${data.id}`, { state: locationState })
  }

  useEffect(() => {
    if (hasLocaltionData) {
      fetchData()
    }
  }, [hasLocaltionData]) //eslint-disable-line
  return (
    <>
      <GeneralList
        filters={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Box position="relative">
                <FilterBody
                  getDataFilter={fetchData}
                  loading={loading}
                  hideButton={showAdvancedFilters}
                />
                <IconButton
                  onClick={() => {
                    modelDispatch({ type: ActionTypes.CLEAN })
                    setShowAdvancedFilters((prev) => !prev)
                  }}
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  {showAdvancedFilters ? (
                    <Tooltip title={t('general.toolTip.collapse')}>
                      <KeyboardDoubleArrowUp />
                    </Tooltip>
                  ) : (
                    <Tooltip title={t('general.toolTip.expand')}>
                      <KeyboardDoubleArrowDown />
                    </Tooltip>
                  )}
                </IconButton>
              </Box>
              {showAdvancedFilters && <AdvancedFilters loading={loading} />}
            </form>
          </FormProvider>
        }
        buttonLabel={t(`instancesStores.view.actions.create`)}
        buttonProps={{
          onClick: handleCreate,
        }}
        buttonLabelFilter={t(`instancesStores.view.actions.clean`)}
        buttonFilterProps={{ onClick: handleClearFilters }}
        /*   buttonLabelDownload={'Descargar'}
        buttonDownloadProps={{ onClick: handleDownload }} */
        title={t(`instancesStores.view.title`)}
        subTitle={
          hasLocaltionData
            ? `Centro: ${locationState.code} - ${locationState.denomination}`
            : undefined
        }
        tableProps={{
          sortModel: sortModel,
          columns: columns,
          rows: rows,
          loading: isLoad,
          rowCount: sizeTable,
          getDataTable: fetchData,
          onSortModelChange: (newSortModel) => {
            fetchData(undefined, undefined, newSortModel[0]?.field, newSortModel[0]?.sort)
            setSortModel(newSortModel)
          },
        }}
        routeBreadCrumbs={false}
        additionalButtonProps={{
          children: showMap
            ? t(`instancesStores.view.actions.list`)
            : t(`instancesStores.view.actions.map`),
          onClick: () => setShowMap((prev) => !prev),
          sx: {
            backgroundColor: colors.color18,
            '&:hover': { backgroundColor: darken(colors.color18, 0.2) },
          },
        }}
        secondView={{ show: showMap, component: <StoresMap /> }}
      />
      <ConfirmationModal
        open={!!openConfirmation}
        title={t(`instancesStores.view.notifications.deleteTitle`)}
        description={t(`instancesStores.view.notifications.deleteMessage`)}
        onClose={() => setOpenConfirmation(undefined)}
        onConfirm={() => {
          if (openConfirmation) {
            handleDelete(openConfirmation)
            setOpenConfirmation(undefined)
          }
        }}
      />
    </>
  )
}
