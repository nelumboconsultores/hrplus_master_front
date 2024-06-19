import { Box } from '@mui/material'
import {
  AppContext,
  ConfirmationModal,
  GeneralList,
  ItemsSelectType,
  Variant,
  generateQueryParams,
} from 'core'
import { useTableIncidentsRecords } from '../../hooks/useTable'
import {
  FilterBody,
  FiltersCatalog,
  NewCatalog,
  VisualizeCatalog,
} from 'modules/catalogMotifs/components'
import { DataCatalog, MotivfsRequest, MotivfsResponse } from 'modules/catalogMotifs/types'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { activateCatalogue, deleteCatalogue, getCatalogue, getCatalogueList } from 'core/services'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { StaWorkingEnum } from 'modules/workingDays/utils'
import { getCatalogueListIncidents } from 'core/services/incidents'
import { errorCodes } from 'core/locale/es/errorCodes'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'
import { GridSortModel } from '@mui/x-data-grid'
import { useParams } from 'react-router-dom'
import { ModelContext } from 'modules/catalogMotifs/context'

interface FormData {
  searchBy: Array<string> | undefined
  status: number
  relationshipIds: Array<string> | undefined
}

export const CatalogMotifsPage: React.FC = () => {
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const { setLoadingStatus } = useContext(ModelContext)
  const [loading, setLoading] = useState(false)
  const methods = useForm<FormData>({
    defaultValues: {
      status: StaWorkingEnum.Todos,
    },
  })
  const onSubmit = async () => {
    setLoading(true)
    await getData()
    setLoading(false)
  }
  const [showFiltersCatalog, setShowFiltersCatalog] = useState(false)
  const [showVisualizeCatalog, setShowVisualizeCatalog] = useState(false)
  const [edit, setEdit] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState<{
    id: string
    name: string
    status: boolean
  }>()
  const [isLoad, setIsLoad] = useState(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [tableRows, setTableRows] = useState<MotivfsResponse[]>([])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const [optionsCatalogue, setOptionsCatalogue] = useState<ItemsSelectType[]>([])
  const { '*': id } = useParams()
  const [dataCatalog, setDataCatalog] = useState<DataCatalog>({
    id: 0,
    catalogueTypeId: 0,
    subcategories: [],
    relationship: '',
    isActive: false,
    isLocked: false,
    name: '',
  })
  const handleClearFilters = () => {
    methods.setValue('searchBy', undefined)
    methods.setValue('status', 3)
    methods.setValue('relationshipIds', undefined)
    setTableRows([])
  }

  const { hasCreatePermission } = usePermissions()

  const { canCreate } = useMemo(
    () => ({
      canCreate: hasCreatePermission(ServicesKeys.Catalogs),
    }),
    [], // eslint-disable-line
  )

  const transformData = (data: MotivfsRequest[]) => {
    return data.map((item) => ({
      id: item.id,
      isActive: item.isActive,
      isLocked: item.isLocked,
      catalogueTypeId: item.catalogueType?.id,
      name: item.name,
      relationship: item.solicitationCatalogs.map((sub) => sub.name),
      subcategories: item.subcategories.map((sub) => sub.name),
    }))
  }

  const handleOnSubmitSuccess = () => {
    setShowFiltersCatalog(false)
    if (tableRows.length > 1) {
      getData()
    }
    getFilters()
  }

  const handleShowFiltersCatalog = (open: boolean) => setShowFiltersCatalog(open)
  const handleShowFiltersVisualizeCatalog = (open: boolean) => setShowVisualizeCatalog(open)

  const handleVisualize = (data: DataCatalog) => {
    setEdit(false)
    setShowVisualizeCatalog(true)

    setDataCatalog(data)
  }
  const handleEdit = (data: DataCatalog) => {
    setShowVisualizeCatalog(false)
    setEdit(true)
    setShowFiltersCatalog(true)

    setDataCatalog(data)
  }

  const handleDelete = async (data: DataCatalog) => {
    /*   if (data.isLocked) {
      const type = id === '1' ? t('catalogMotifs.theCatalog') : t('catalogMotifs.theList')
      setActMessage({
        type: Variant.error,
        message: t('catalogMotifs.snackbar.deleteBlock', { value: type }),
      })
    } else { */
    const id = data?.id.toString()
    setOpenConfirmation({ id, name: data.name, status: data.isActive })
    /* } */
  }

  const removeButton = async (ids: string, name: string, status: boolean) => {
    if (!status) {
      const response = await deleteCatalogue(Number(ids))
      if (response?.error) {
        if (response?.error?.errors?.code === 'C01CARS03') {
          setActMessage({
            type: Variant.error,
            message: errorCodes.C01CARS03,
          })
        } else {
          setActMessage({
            type: Variant.error,
            message: t('catalogMotifs.snackbar.couldNotEliminated'),
          })
        }

        setOpenConfirmation(undefined)
      } else {
        setActMessage({
          type: Variant.success,
          message:
            id === '1'
              ? t('catalogMotifs.snackbar.delete', { name: name })
              : t('catalogMotifs.snackbar.deleteListV', { name: name }),
          /*   message: t('catalogMotifs.snackbar.delete', { name: name }), */
        })
        setOpenConfirmation(undefined)
        getFilters()

        if (tableRows.length > 1) {
          getData()
        } else {
          handleClearFilters()
        }
      }
    } else {
      setActMessage({
        type: Variant.error,
        message:
          id === '1'
            ? t('catalogMotifs.snackbar.errorDelete')
            : t('catalogMotifs.snackbar.errorDeleteList'),
      })
    }
  }

  const messageSuccess = (name: string, status: boolean) => {
    let catalogMessage = ''
    if (id === '1') {
      catalogMessage = status ? 'activado' : 'desactivado'
    } else {
      catalogMessage = status ? 'activada' : 'desactivada'
    }

    setActMessage({
      type: Variant.success,
      message: t('catalogMotifs.snackbar.disable', {
        catalog: id === '1' ? 'El catálogo de motivos' : 'La lista desplegable',
        name: name,
        status: catalogMessage,
      }),
    })
  }

  const handleStatusChange = async (data: DataCatalog) => {
    setLoadingStatus(true)
    /*   if (data.isLocked) {
      const type = id === '1' ? t('catalogMotifs.theCatalog') : t('catalogMotifs.theList')
      setActMessage({
        type: Variant.error,
        message: t('catalogMotifs.snackbar.activateBlock', { value: type }),
      })
    } else { */
    const body = {
      active: !data.isActive,
    }
    const { data: resp, error } = await activateCatalogue(data.id, body)
    if (resp) {
      setDataCatalog((prevDataCatalog) => ({
        ...prevDataCatalog,
        isActive: resp.data.isActive,
      }))
      getData()
      messageSuccess(data.name, resp.data.isActive)
    }
    const value = id === '1' ? t('catalogMotifs.theCatalog') : t('catalogMotifs.theList')
    if (error) {
      if (error?.errors?.code === 'C01CARS10') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01CARS10,
        })
      } else if (error?.errors?.code === 'C01CARS04' || error?.errors?.code === 'C01CARS07') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01CARS07.replace('{{value}}', value),
        })
      } else {
        setActMessage({
          type: Variant.error,
          message: t('catalogMotifs.snackbar.couldNotEliminated'),
        })
      }
    }
    /*   } */
    setLoadingStatus(false)
  }
  const handleShowNewCatalog = () => {
    setEdit(false)
    setShowFiltersCatalog(!showFiltersCatalog)
    const data = {
      id: 0,
      subcategories: [],
      relationship: '',
      isActive: false,
      isLocked: false,
      name: '',
      catalogueTypeId: 0,
    }

    setDataCatalog(data)
  }

  const columns = useTableIncidentsRecords(
    handleVisualize,
    handleEdit,
    handleDelete,
    handleStatusChange,
  )

  const getFilters = useCallback(async () => {
    const body = {
      catalogueTypeId: id,
    }

    const queryParams = generateQueryParams(body)
    const response = await getCatalogueList(queryParams)
    if (response.data?.data.length === 0) return

    setOptions(
      (response.data?.data.map((item) => ({
        label: item.name,
        value: item.id,
      })) as ItemsSelectType[]) ?? [],
    )
  }, [setOptions]) // eslint-disable-line

  const getCatalogues = useCallback(async () => {
    const response = await getCatalogueListIncidents()
    if (response.data?.data.length === 0) return

    setOptionsCatalogue(
      (response.data?.data.map((item) => ({
        label: item.name,
        value: item.id,
      })) as ItemsSelectType[]) ?? [],
    )
  }, [setOptionsCatalogue])

  const getData = useCallback(
    async (page?: number, pageSize?: number, name?: string | null, sort?: string | null) => {
      setIsLoad(true)

      const nameIds = methods.getValues('searchBy')
      const relationshipIds = methods.getValues('relationshipIds')
      const body = {
        nameIds: nameIds && nameIds.length > 0 ? nameIds : undefined,

        relationshipIds:
          relationshipIds && relationshipIds.length > 0 ? relationshipIds : undefined,
        catalogueTypeId: id,
        active:
          methods.getValues('status') === StaWorkingEnum.Activo
            ? 'true'
            : methods.getValues('status') === StaWorkingEnum.Inactivo
              ? 'false'
              : undefined,
        page: page,
        size: pageSize,
        order: sort,
        column: name,
      }

      const queryParams = generateQueryParams(body)

      const response = await getCatalogue(queryParams)
      if (response.data) {
        if (response.data.data.content.length > 0) {
          const transformedData = transformData(response.data.data.content as MotivfsRequest[])
          setTableRows(transformedData ?? [])
          setSizeTable(response.data.data.totalElements)
        } else {
          setActMessage({
            type: Variant.info,
            message: 'No se encontraron resultados.',
          })
          setTableRows([])
        }
      }
      if (response.error) {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }
      setIsLoad(false)
    },
    [methods, setActMessage], // eslint-disable-line
  )

  const fetchData = async () => {
    await getFilters()
    await getCatalogues()
  }

  useEffect(() => {
    fetchData()
  }, [getFilters]) //eslint-disable-line

  return (
    <Box>
      <FiltersCatalog show={showFiltersCatalog} onClose={handleShowFiltersCatalog}>
        <NewCatalog
          dataCatalog={dataCatalog}
          type={Number(id)}
          edit={edit}
          onSubmitSuccess={handleOnSubmitSuccess}
        />
      </FiltersCatalog>

      <FiltersCatalog show={showVisualizeCatalog} onClose={handleShowFiltersVisualizeCatalog}>
        <VisualizeCatalog dataCatalog={dataCatalog} onEdit={handleEdit} type={Number(id)} />
      </FiltersCatalog>

      <GeneralList
        filters={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FilterBody
                getDataFilter={getData}
                options={options}
                optionsCatalogue={optionsCatalogue}
                loading={loading}
                type={Number(id)}
              />
            </form>
          </FormProvider>
        }
        buttonLabel={canCreate ? t('catalogMotifs.catalogNew') : ''}
        buttonProps={{
          onClick: handleShowNewCatalog,
        }}
        buttonLabelFilter={t('incidents.filter')}
        buttonFilterProps={{
          onClick: handleClearFilters,
        }}
        title={id === '1' ? t('catalogMotifs.title') : t('catalogMotifs.titleOther')}
        tableProps={{
          sortModel: sortModel,
          columns: columns.columns,
          rows: tableRows,
          loading: isLoad,
          rowCount: sizeTable,
          getDataTable: getData,
          onSortModelChange: (newSortModel) => {
            getData(undefined, undefined, newSortModel[0]?.field, newSortModel[0]?.sort)
            setSortModel(newSortModel)
          },
        }}
      />
      <ConfirmationModal
        open={!!openConfirmation}
        title={id === '1' ? t('catalogMotifs.deleteCatalog') : t('catalogMotifs.deleteList')}
        description={t('catalogMotifs.deleteConfirmation', { name: openConfirmation?.name })}
        onClose={() => setOpenConfirmation(undefined)}
        onConfirm={() =>
          removeButton(
            openConfirmation?.id as string,
            openConfirmation?.name as string,
            openConfirmation?.status as boolean,
          )
        }
      />
    </Box>
  )
}
