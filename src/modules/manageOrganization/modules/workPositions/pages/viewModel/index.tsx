import { useState, useCallback, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { GridSortModel } from '@mui/x-data-grid'

import {
  AppContext,
  ConfirmationModal,
  GeneralList,
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
import { useNavigate } from 'react-router-dom'
import { WorkPositionsContext } from '../../context'
import { structureParams } from 'modules/manageOrganization/modules/stores/utils/structureParams'
import { StrucData } from 'modules/manageOrganization/modules/stores/pages'

type FormData = {
  code: string
  denomination: string
  statusId: number
  orgManagerId: number | undefined
  approvalManagerId: number | undefined
  storeIds: number | undefined
  geographyStructIds: StrucData[]
  organizativeStructIds: StrucData[]
}

export const ViewModel: React.FC = () => {
  const { setActMessage } = useContext(AppContext)
  const { modelDispatch, setGeneralInfo, setLoadingStatus } = useContext(WorkPositionsContext)
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
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(
    async (page?: number, pageSize?: number, name?: string | null, sort?: string | null) => {
      setIsLoad(true)
      const filters = methods.getValues()
      const body = {
        code: filters.code,
        denomination: filters.denomination,
        orgManagerId: filters.orgManagerId,
        approvalManagerId: filters.approvalManagerId,
        storeIds: filters.storeIds,
        page: page,
        size: pageSize,
        order: sort,
        column: name,
        statusId:
          methods.getValues('statusId') === ModelStatus.All
            ? undefined
            : methods.getValues('statusId'),
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
    [setActMessage, t, methods],
  )

  const onSubmit = async () => {
    setLoading(true)
    await fetchData()
    setLoading(false)
  }

  const handleClearFilters = () => {
    methods.reset({
      statusId: ModelStatus.All,
      code: '',
      denomination: '',
      orgManagerId: undefined,
      approvalManagerId: undefined,
      storeIds: undefined,
    })
    setRows([])
  }
  /*  const handleDownload = () => {
    console.log('Downloading')
  } */

  async function handleVisualizeChange(data: Model) {
    navigate(`${PathName.instanceJobTitlesDetail}/${data.id}`)
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
      const { workPosition } = resp.data
      const newStatus = workPosition?.status.id !== ModelStatus.Active ? 'desactivado' : 'activado'

      fetchData()
      setActMessage({
        type: Variant.success,
        message: t(`instancesWorkPositions.view.notifications.changeStatus`, {
          status: newStatus,
        }),
      })
    } else {
      if (error?.errors?.code === 'C01WPOS14') {
        setActMessage({
          type: Variant.error,
          message: t(`instancesWorkPositions.view.notifications.changeStatusAct`),
        })
      } else {
        handleErrorMessage(
          `instancesWorkPositions.view.notifications.changeStatusError`,
          error?.errors?.code,
        )
      }
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
          message: t(`instancesWorkPositions.view.notifications.deleteSuccess`),
        })
      }
      if (error) {
        if (error?.errors?.code === 'C01WPOS03') {
          setActMessage({
            type: Variant.error,
            message: errorCodes.C01WPOS03,
          })
        } else {
          handleErrorMessage(
            `instancesWorkPositions.view.notifications.deleteError`,
            error?.errors?.code,
          )
        }
      }
      /* else {
        handleErrorMessage(
          `instancesWorkPositions.view.notifications.deleteError`,
          error?.errors?.code,
        )
      } */
    } else {
      setActMessage({
        type: Variant.error,
        message: t(`instancesWorkPositions.view.notifications.changeStatusErrorAct`),
      })
    }
  }

  const handleCreate = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    setGeneralInfo(undefined)
    navigate(PathName.instanceJobTitlesCreation)
  }
  function handleEdit(data: Model) {
    modelDispatch({ type: ActionTypes.CLEAN })
    setGeneralInfo(undefined)
    navigate(`${PathName.instanceJobTitlesEdit}/${data.id}`)
  }

  return (
    <>
      <GeneralList
        filters={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {<FilterBody getDataFilter={fetchData} loading={loading} />}
            </form>
          </FormProvider>
        }
        buttonLabel={t(`instancesWorkPositions.view.actions.create`)}
        buttonProps={{
          onClick: handleCreate,
        }}
        buttonLabelFilter={t(`instancesWorkPositions.view.actions.clean`)}
        buttonFilterProps={{ onClick: handleClearFilters }}
        /*   buttonLabelDownload={'Descargar'}
        buttonDownloadProps={{ onClick: handleDownload }} */
        title={t(`instancesWorkPositions.view.title`)}
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
      />
      <ConfirmationModal
        open={!!openConfirmation}
        title={t(`instancesWorkPositions.view.notifications.deleteTitle`)}
        description={t(`instancesWorkPositions.view.notifications.deleteMessage`)}
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
