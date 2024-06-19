import { Box } from '@mui/material'
import { AppContext, GeneralList, PathName, Variant, generateQueryParams } from 'core'
import { useTableIncidentsRecords } from '../../hooks/useTableIncidents'
import { useTranslation } from 'react-i18next'
import { useCallback, useContext, useState } from 'react'
import { GridSortModel } from '@mui/x-data-grid'
import { getCatalogue, toggleStatusCatalogue } from 'core/services/incidents'
import { DataCatalogIncidents } from 'modules/catalogMotifs/types'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { FilterBody } from 'modules/incidents/components/filterBody'
import { ModelContext } from 'modules/incidents/context'

type contentTwo = {
  id: number
  name: string
  description: string
  isActive: true
}

interface FormData {
  searchField: string | undefined
}

const IncidentsPage: React.FC = () => {
  const { setActMessage } = useContext(AppContext)
  const { setLoadingStatus } = useContext(ModelContext)
  const navigate = useNavigate()
  const [isLoad, setIsLoad] = useState(false)
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'name',
      sort: 'asc',
    },
  ])
  const [tableRows, setTableRows] = useState<contentTwo[]>([])
  const [sizeTable, setSizeTable] = useState<number>(0)
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const methods = useForm<FormData>()

  const onSubmit = async () => {
    setLoading(true)
    await obtCatalog()
    setLoading(false)
  }
  const handleClearFilters = () => {
    methods.setValue('searchField', undefined)
    setTableRows([])
  }
  const handleRadioClick = (data: DataCatalogIncidents) => {
    navigate(`${PathName.detailView}/${data.id}`)
  }

  /*  const deleteRadioClick = async (data: DataCatalogIncidents) => {
   
  } */
  const activeRadioClick = async (data: DataCatalogIncidents) => {
    setLoadingStatus(true)
    const body = {
      active: !data.isActive,
    }
    const response = await toggleStatusCatalogue(data.id, body)

    if (response.error) {
      setActMessage({
        type: Variant.error,
        message: 'No se pudo actualizar',
      })
    } else {
      obtCatalog()
      if (data.isActive) {
        setActMessage({
          type: Variant.success,
          /*  message: 'La incidencia ' + data.name.toLocaleLowerCase() + ' ha sido desactivada', */
          message: 'La incidencia ha sido desactivada',
        })
      } else {
        setActMessage({
          type: Variant.success,
          /*  message: 'La incidencia ' + data.name.toLocaleLowerCase() + ' ha sido activada', */
          message: 'La incidencia ha sido activada',
        })
      }
    }
    setLoadingStatus(false)
  }
  const columns = useTableIncidentsRecords(
    handleRadioClick,
    /* deleteRadioClick, */ activeRadioClick,
  )

  const obtCatalog = useCallback(
    async (page?: number, pageSize?: number, name?: string | null, sort?: string | null) => {
      setIsLoad(true)

      const body = {
        search: methods.getValues('searchField'),
        page: page,
        size: pageSize,
        order: sort,
        column: name,
      }
      const queryParams = generateQueryParams(body)

      const { data: resp, error } = await getCatalogue(queryParams)
      if (resp) {
        if (resp.data.content.length > 0) {
          const contentData = resp.data.content.map((item) => {
            return {
              id: item.id,
              name: item.name ?? '-',
              description: item.description ?? '-',
              isActive: item.isActive,
              amountAssociations: item.amountAssociations ?? 0,
              amountRegisters: item.amountRegisters ?? 0,
            }
          })

          setTableRows(contentData ?? [])

          setSizeTable(resp.data.totalElements)
        } else {
          setActMessage({
            type: Variant.info,
            message: 'No se encontraron resultados.',
          })
          setTableRows([])
        }
      }
      if (error) {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }

      setIsLoad(false)
    },
    [methods], // eslint-disable-line
  )

  return (
    <Box>
      <GeneralList
        title={t('incidents.title.catalogIncidents')}
        filters={
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <FilterBody getDataFilter={obtCatalog} loading={loading} />
            </form>
          </FormProvider>
        }
        buttonLabelFilter={t('incidents.filter')}
        buttonFilterProps={{
          onClick: handleClearFilters,
        }}
        tableProps={{
          sortModel: sortModel,
          columns: columns.columns,
          rows: tableRows,
          loading: isLoad,
          rowCount: sizeTable,
          getDataTable: obtCatalog,
          onSortModelChange: (newSortModel) => {
            obtCatalog(undefined, undefined, newSortModel[0]?.field, newSortModel[0]?.sort)
            setSortModel(newSortModel)
          },
        }}
      />
    </Box>
  )
}

export default IncidentsPage
