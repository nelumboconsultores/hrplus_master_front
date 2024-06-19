import { Box, Button, Typography } from '@mui/material'
import {
  AppContext,
  DynamicFormValues,
  DynamicGrid,
  FontName,
  ItemsSelectType,
  Variant,
} from 'core'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { styles } from './styles'
import { useArrayFiltersUser } from 'modules/users/utils'
import { GET, getGroupNames, getListResponse, getOrgEntities } from 'core/services'
import { getListWorkPositions } from 'modules/manageOrganization/modules/workPositions/services/model.services'
import { t } from 'i18next'
import { getCostCenter } from 'modules/manageOrganization/modules/stores/services/model.services'
import Spinner from 'core/components/spinner'
import { ModelKeywords } from 'modules/manageOrganization/modules/workPositions/enums'
import { FilterType } from 'modules/contributors/types/filterType'

type FiltersFormProps = {
  getDataTable: (
    page?: number,
    pageSize?: number,
    name?: string | null,
    sort?: string | null,
    search?: string,
    statusId?: number,
    center?: number,
    groupsIds?: number[],
    post?: number,
    geographyStructIds?: string,
  ) => void
  initVal: DynamicFormValues
  seeCollaborators: boolean
  status: number | undefined
  setInitVal: React.Dispatch<React.SetStateAction<DynamicFormValues>>
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
}

interface OrgEntity {
  id: number
  name: string
  active: boolean
  orgEntityTypeId: number
  parentId?: number
  children: OrgEntity[]
  required: boolean
}

interface RestData {
  search?: string
  statusId?: number
  costCenterId?: number
  groupIds?: number[]
  role?: string

  workPositionId?: number
}

export const FiltersForm: React.FC<FiltersFormProps> = ({
  initVal,
  seeCollaborators,
  status,
  setInitVal,
  getDataTable,
  setFilters,
}) => {
  const [listGroups, setListGroups] = useState<ItemsSelectType[]>([])
  const [listWork, setListWork] = useState<ItemsSelectType[]>([])
  const [listCostCenter, setListCostCenter] = useState<ItemsSelectType[]>([])
  const [valueIni, setValueIni] = useState<number | undefined>(undefined)
  const optionsStatus = seeCollaborators
    ? [
        { label: 'Activo', value: 1 },
        { label: 'Baja', value: 3 },
      ]
    : [
        { label: 'Activo', value: 1 },
        { label: 'Borrador', value: 2 },
        { label: 'Baja', value: 3 },
      ]
  const { fields, isLoaded } = useArrayFiltersUser(
    listGroups,
    listWork,
    listCostCenter,
    valueIni,
    !seeCollaborators,
    optionsStatus,
  )
  const { setActMessage } = useContext(AppContext)
  const methods = useForm<DynamicFormValues>({
    defaultValues: { statusId: status, ...initVal },
  })
  const [changeLoad, setChangeLoad] = useState(false)

  useEffect(() => {
    list()
    getListCostCenter()
    getListGroups()
    getListWork()
  }, []) //eslint-disable-line

  const getOptions = async (url: string) => {
    const response = await GET<getListResponse>(url)
    if (response.data) {
      const newOptions = response.data.data?.content?.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
      return newOptions
    }
    return []
  }

  const filterElements = (elements: OrgEntity[], targetType: number): OrgEntity[] => {
    return elements
      .filter((element) => element.orgEntityTypeId === targetType)
      .map((element) => {
        if (element.children && element.children.length > 0) {
          element.children = filterElements(element.children, targetType)
        }
        return element
      })
  }

  const list = async () => {
    const response = await getOrgEntities(ModelKeywords.JobTitles)
    if (response.data && response.data.data?.length > 0) {
      const filteredData = filterElements(response.data.data, 1)
      const empresaElement = filteredData.find((element) => element.name === 'Empresa')
      const url = `/organization-entities/${empresaElement?.id}/get-instances/0`
      const options = await getOptions(url)
      setValueIni(options[0]?.value)
    }
  }

  const getListWork = async () => {
    getListWorkPositions().then((response) => {
      if (response.data) {
        setListWork(
          response.data.data.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          })),
        )
      }

      if (response.error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    })
  }
  const getListCostCenter = async () => {
    getCostCenter().then((response) => {
      if (response.data) {
        setListCostCenter(
          response.data?.data?.content.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          })),
        )
      }

      if (response.error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    })
  }
  const getListGroups = useCallback(async () => {
    const response = await getGroupNames()
    if (response?.data) {
      const newsRows = response?.data?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        }
      })
      setListGroups(newsRows ?? [])
    }
  }, [])

  const handleClearFilters = () => {
    methods.reset()
    if (!seeCollaborators) methods.setValue('statusId', 2)
  }

  const onSubmit: SubmitHandler<DynamicFormValues> = async (data) => {
    setInitVal(data)
    const geographyStructIds: number[] = []
    const restData: RestData = {}

    const excludeFields = [
      'search',
      'statusId',
      'costCenterId',
      'groupIds',
      'role',
      'workPositionId',
    ]
    Object.entries(data).forEach(([key, value]) => {
      if (!excludeFields.includes(key)) {
        if (value && value !== '') {
          geographyStructIds.push(value as number)
        }
      } else {
        if (value) {
          restData[key as keyof unknown] = value as RestData[keyof unknown]
        }
      }
    })
    if (valueIni !== undefined && valueIni !== null && geographyStructIds.length > 0) {
      geographyStructIds.unshift(valueIni)
    }

    const geographyStructIdsString = geographyStructIds.join('-')

    const finalData = {
      ...restData,
      geographyStructIds: geographyStructIdsString,
    }
    setFilters(finalData)
    await getDataTable(
      1,
      20,
      undefined,
      undefined,
      data.search as string,
      data.statusId as number,
      data.costCenterId as number,
      data.groupIds as number[],
      data.workPositionId as number,
      geographyStructIdsString,
    )
  }

  useEffect(() => {
    methods.reset()
    if (!seeCollaborators) {
      setChangeLoad(true)
      methods.setValue('statusId', 2)
    }
    setChangeLoad(false)
  }, [seeCollaborators, setChangeLoad, methods])
  if (!isLoaded || changeLoad) return <Spinner />
  return (
    <Box sx={styles.container}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
            Filtrar por
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={handleClearFilters}
            variant="text"
            sx={{
              fontFamily: FontName.RobotoMedium,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
            }}
          >
            Limpiar Filtros
          </Button>
        </Box>
      </Box>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '28px',
            justifyContent: 'space-between',
          }}
        >
          <DynamicGrid xs={12} listInputs={fields} rowSpacing={'24px'} />

          <Box sx={{ textAlign: 'right', padding: '12px 0px' }}>
            <Button type="submit" color="secondary" sx={styles.button}>
              Filtrar
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}
