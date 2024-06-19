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
import { useLocation, useNavigate } from 'react-router-dom'
import { ModelContext } from '../../context'
import {
  getDinamicCreatePaths,
  getDinamicDetailsPaths,
  getDinamicEditPaths,
} from '../../utils/getDinamicPaths'

type FormData = {
  code: string
  denomination: string
  statusId: number
}

export const ViewModel: React.FC = () => {
  const { setActMessage } = useContext(AppContext)
  const { modelDispatch, modelLocale, setLoadingStatus } = useContext(ModelContext)
  const { pathname } = useLocation()
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

      const body = {
        ...methods.getValues(),
        page: page,
        size: pageSize,
        order: sort,
        column: name,
        statusId:
          methods.getValues('statusId') === ModelStatus.All ? null : methods.getValues('statusId'),
      }

      const queryParams = generateQueryParams(body)
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
    methods.reset({ statusId: ModelStatus.All, code: '', denomination: '' })
    setRows([])
  }
  /*  const handleDownload = () => {
    console.log('Downloading')
  } */

  async function handleVisualizeChange(data: Model) {
    navigate(`${getDinamicDetailsPaths(pathname)}/${data.id}`)
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
      let newStatus = data.status.id !== ModelStatus.Active ? 'desactivado' : 'activado'
      if (pathname.includes(PathName.taxesCategories)) {
        newStatus = data.status.id !== ModelStatus.Active ? 'desactivada' : 'activada'
      }
      fetchData()
      setActMessage({
        type: Variant.success,
        message: t(`${modelLocale}.view.notifications.changeStatus`, { status: newStatus }),
      })
    } else {
      handleErrorMessage(`${modelLocale}.view.notifications.changeStatusError`, error?.errors?.code)
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
          message: t(`${modelLocale}.view.notifications.deleteSuccess`),
        })
      } else {
        handleErrorMessage(`${modelLocale}.view.notifications.deleteError`, error?.errors?.code)
      }
    } else {
      setActMessage({
        type: Variant.error,
        message: t(`${modelLocale}.view.notifications.changeStatusErrorAct`),
      })
    }
  }

  const handleCreate = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(getDinamicCreatePaths(pathname) ?? '')
  }
  function handleEdit(data: Model) {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(`${getDinamicEditPaths(pathname)}/${data.id}`)
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
        buttonLabel={t(`${modelLocale}.view.actions.create`)}
        buttonProps={{
          onClick: handleCreate,
        }}
        buttonLabelFilter={t(`${modelLocale}.view.actions.clean`)}
        buttonFilterProps={{ onClick: handleClearFilters }}
        /*   buttonLabelDownload={'Descargar'}
        buttonDownloadProps={{ onClick: handleDownload }} */
        title={t(`${modelLocale}.view.title`)}
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
        title={t(`${modelLocale}.view.notifications.deleteTitle`)}
        description={t(`${modelLocale}.view.notifications.deleteMessage`)}
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
