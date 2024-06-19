import { DynamicFormType, InputsEnum, ItemDynamicFormType, ItemsSelectType, ValueEnum } from 'core'
import { GET, getListResponse, getOrgEntities, interGetOrgEntitiesResponse } from 'core/services'
import { ModelKeywords } from 'modules/manageOrganization/modules/workPositions/enums'
import { useEffect, useState } from 'react'

export const useArrayFiltersUser = (
  listGroup: ItemsSelectType[],
  listWork: ItemsSelectType[],
  listCostCenter: ItemsSelectType[],
  valueIni: number | undefined,
  statusDisabled: boolean,
  optionsStatus: { label: string; value: number }[],
) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [geoInputs, setGeoInputs] = useState<ItemDynamicFormType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const fields = await getFields()
      setGeoInputs(fields)
      setIsLoaded(true)
    }
    fetchData()
  }, [valueIni]) //eslint-disable-line
  const getOptions = async (url: string, fatherValue: string) => {
    if (valueIni) {
      let link = url.replace('{id}', `${valueIni}`)
      if (fatherValue) link = url.replace('{id}', fatherValue)
      if (!fatherValue || (fatherValue && typeof fatherValue === 'number')) {
        const response = await GET<getListResponse>(link)
        if (response.data) {
          const newOptions =
            response.data.data?.content?.map((item) => {
              return {
                label: item.name,
                value: item.id,
              }
            }) || []
          return newOptions
        }
      }
      return []
    }
    return []
  }

  const getFields = async () => {
    const response = await getOrgEntities(ModelKeywords.JobTitles)
    if (response.data && response.data.data?.length > 0) {
      const { geographicalElements } = await orderFields(response.data.data)
      const filteredGeo = geographicalElements.filter((element) => element.name !== 'Empresa')
      if (filteredGeo.length > 0) {
        filteredGeo[0].fathers = []
        filteredGeo[0].disabled = false
        return filteredGeo
      }
      return []
    }
    return []
  }

  const orderFields = async (
    fields: interGetOrgEntitiesResponse,
    geographicalElements: ItemDynamicFormType[] = [],
    parentName?: string,
  ): Promise<{
    geographicalElements: ItemDynamicFormType[]
    parentName?: string
  }> => {
    for (const element of fields) {
      const hasParent = !!parentName
      const url = `/organization-entities/${element.id}/get-instances/{id}`
      const options = await getOptions(url, parentName ?? '')
      const field: ItemDynamicFormType = {
        type: InputsEnum.Select,
        name: element?.name,
        label: element?.name,
        placeHolder: `Ingrese ${element?.name}`,
        fathers: hasParent ? [parentName] : [],
        url: url,
        options: options,
        getHierarchyOptions: getOptions,
      }
      if (element.orgEntityTypeId === 1) geographicalElements.push(field)
      if (element.children) {
        const hasChildren = !!element.children?.length
        const parentName = hasChildren ? element.name : undefined
        await orderFields(element.children, geographicalElements, parentName)
      }
    }
    return { geographicalElements }
  }

  const arrayFilters: DynamicFormType = [
    {
      type: InputsEnum.Search,
      name: 'search',
      label: 'Buscar empleado',
      placeHolder: 'Ingrese el nombre o apellido',
      validations: {
        type: ValueEnum.stringOptional,
        required: false,
        message: 'La región es requerida',
      },
    },
    {
      label: 'Estado',
      type: InputsEnum.Select,
      placeHolder: `Ingrese Estado`,
      name: 'statusId',
      disabled: statusDisabled,
      options: optionsStatus,
      validations: {
        type: ValueEnum.numberOptional,
        required: false,
        message: 'El status es requerido',
      },
    },

    {
      type: InputsEnum.Select,
      name: 'costCenterId',
      label: 'Centro',
      placeHolder: `Ingrese centro de Costos`,
      options: listCostCenter,
      validations: {
        type: ValueEnum.numberOptional,
        required: false,
        message: 'El centro es requerido',
      },
    },
    {
      type: InputsEnum.MultiSelect,
      name: 'groupIds',
      label: 'Grupo',
      placeHolder: 'Ingrese grupo',
      options: listGroup,
      validations: {
        type: ValueEnum.optionalArray,
        required: false,
        message: 'El grupo es requerida',
      },
    },
    {
      type: InputsEnum.Select,
      name: 'role',
      label: 'Rol de usuario*',
      placeHolder: 'Ingrese rol',
      disabled: true,
      options: [
        { value: 1, label: 'Unidad 1' },
        { value: 2, label: 'Unidad 2' },
      ],
      validations: {
        type: ValueEnum.stringOptional,
        required: false,
        message: 'El Rol es requerida',
      },
    },
    {
      type: InputsEnum.Select,
      name: 'workPositionId',
      label: 'Cargo',
      placeHolder: 'Ingrese cargo',
      options: listWork,
      validations: {
        type: ValueEnum.numberOptional,
        required: false,
        message: 'El cargo es requerido',
      },
    },
  ]

  const firstTwoValues = arrayFilters.slice(0, 2)
  const restValues = arrayFilters.slice(2)

  return { isLoaded, fields: [...firstTwoValues, ...geoInputs, ...restValues] }
}
