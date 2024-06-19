import React, { useContext, useEffect, useReducer, useState } from 'react'
import { InputCascade, firstDataType } from '../types/modelSaveData'
import { ModelResponse, getWorkPositions, structureType } from '../services/model.services'
import { ModelReducer, initialState } from '../reducers'
import { ActionTypes, ModelKeywords } from '../enums'
import { GeneralInfoType, arrayGenInfoType } from '../types'
import { structuresType } from '../../stores/types/getCostCenterDetails'
import { CardArrows, InsideCardArrows } from 'modules/manageOrganization/types'
import {
  AppContext,
  DynamicFormValues,
  FieldTypeEnumSelect,
  FieldsTypesType,
  StatusId,
  Variant,
  createDataArray,
  isEmpty,
} from 'core'
import { getModelDetail } from '../../stores/services/model.services'
import { useTranslation } from 'react-i18next'
import {
  formatArrayToDynamicFormValues,
  formatCurrency,
  formatFieldsWithTheirType,
} from 'core/utils/textFormat'
import { WorkPositionsContext } from '../context'
import { getGenInfoFields, getOrgEntities, interGetOrgEntitiesResponse } from 'core/services'
import { workPositionsFields } from '../components/stepperCom/generalInfo/staticJson'
import { TypeJson } from 'core/components/returnInput/typeJson'
export const ProviderWorkPositions = ({ children }: { children: React.ReactElement }) => {
  const [modelState, modelDispatch] = useReducer(ModelReducer, initialState)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoType>()
  const [jsonFields, setJsonFields] = useState<TypeJson[]>()
  const { setActMessage } = useContext(AppContext)
  const { t } = useTranslation()

  const getFields = async () => {
    const response = await getOrgEntities(ModelKeywords.JobTitles)
    if (response.data) {
      const fields = orderField(response.data?.data)
      modelDispatch({ type: ActionTypes.LOAD_MODEL_ELEMENTS, payload: fields })
    }
  }

  const loadData = async ({
    id,
    step,
    newData,
  }: {
    newData?: ModelResponse
    id?: string | number
    step?: number
  }): Promise<firstDataType | undefined> => {
    // Obtiene el ID local del modelo
    const localId = modelState?.id
    // Obtiene el paso actual
    const currentStep = step ?? modelState?.step ?? 0
    // Si no se proporciona un ID y no hay un ID local, retorna undefined

    if (!id && !localId) {
      return
    }
    let data = newData
    // Si no hay nuevos datos, realiza una solicitud para obtenerlos
    if (!newData) {
      const { data: response } = await getWorkPositions(localId ?? '')
      if (response) data = response
    }
    const {
      fieldValues: dataResp,
      costCenter: dataRestCC,
      store,
      workPositionCategory,
      compTab,
      compCategory,
      status,
      authorizedStaff,
      id: respId,
      denomination,
      code,
      minSalary,
      orgManager,
      approvalManager,
    } = data?.data.workPosition ?? {}
    const dataRestStore = store?.fieldValues
    const statusNew = { Estatus: compCategory?.status.id === 1 ? 'Activo' : 'Inactivo' }
    const dataRestCatPos = { ...statusNew, ...compCategory?.fieldValues }
    const { id: statusName } = status ?? {}
    const {
      fieldValues: dataRestTab,
      status: statusTab,
      minAuthorizedSalary,
      maxAuthorizedSalary,
    } = compTab ?? {}
    const dataMain = createDataArray({
      'Plantilla autorizada': authorizedStaff ?? ' - ',
      statusId: Number(statusName) ?? 1,
      ...dataResp,
    })

    const dataConstCenter = createDataArray({
      'Centro de costos': dataRestCC?.code ?? ' - ',
      Denominación: dataRestCC?.denomination ?? ' - ',
    })
    const dataStores = createDataArray({
      Centro: data?.data.workPosition.store.code ?? '-',
      Sucursal: data?.data.workPosition.store.denomination ?? '-',
      statusId: data?.data.workPosition.store.status.id ?? '-',
      ...dataRestStore,
    })
    const dataCatPositions = createDataArray({ ...dataRestCatPos })

    const dataTab = createDataArray({
      Estatus: StatusId[statusTab?.id as keyof typeof StatusId] ?? '-',
      'Salario Mínimo Autorizado': formatCurrency(Number(minAuthorizedSalary)) ?? '-',
      'Salario Máximo Autorizado': formatCurrency(Number(maxAuthorizedSalary)) ?? '-',
      'Salario Mínimo General': formatCurrency(Number(minSalary)) ?? '-',
      ...dataRestTab,
    })
    // Obtiene los datos generales de la organización
    let structureGeo: CardArrows | undefined = undefined
    const structureOrg: CardArrows[] = []
    if ((step && step > 0) || modelState.step > 0) {
      data?.data.structuresByType.forEach((strType) => {
        if (strType.orgEntityType.id === 1) {
          structureGeo = {
            id: strType.details[0].id,
            data: orderFields(strType.details[0].structures, []),
          }
        }
        if (strType.orgEntityType.id === 2) {
          structureOrg.push({
            id: strType.details[0].id,
            data: orderFields(strType.details[0].structures, []),
          })
        }
      })
      setGeneralInfo({
        main: {
          code: store?.code ?? '-',
          address: store?.address ?? '-',
          name: store?.denomination ?? '-',
        },
        structureGeo: structureGeo ?? Object.create(null),
        structureOrg,
      })
    }
    const itemSelect = data?.data.structuresByType.find((strType) => strType.orgEntityType.id === 2)
      ?.details[0]
    const thisSelect = orderFields(itemSelect?.structures ?? [], []).map((item) => {
      return item.id ?? 0
    })

    consultStore(data?.data.workPosition.store.id.toString() ?? '0', thisSelect).then((resp) => {
      setGeneralInfo(resp)
    })
    const formInformation = {
      title: denomination?.toString() ?? '',
      code: code?.toString() ?? '',
      generalInfo: {
        main: dataMain,
        cost_centerId: dataRestCC?.id ?? 0,
        costCenter: dataConstCenter,
        storesId: data?.data.workPosition.store.id ?? 0,
        stores: dataStores,
        authorizedStaff: authorizedStaff ?? undefined,
        geo: structureGeo ? [structureGeo] : [],
        selectOrg: thisSelect ?? [],
        org: structureOrg ? structureOrg : [],
        workPositionId: workPositionCategory?.id ?? 0,
        positions: [
          {
            title: t('instancesWorkPositions.creation.title.codeAndName'),
            value: workPositionCategory?.code + ' - ' + workPositionCategory?.denomination,
          },
        ],
      },
      jobConfig: {
        id: compCategory?.id ?? 0,
        title: 'Configuración de puesto',
        description: {
          title: 'Descripción',
          value: compCategory?.code + ' - ' + (compCategory?.denomination ?? '-'),
          code: compCategory?.code ?? '-',
          denomination: compCategory?.denomination ?? '-',
        },
        fields: dataCatPositions,
      },
      tab: {
        tabId: compTab?.id ?? 0,
        minSalary: minSalary,
        title: compTab?.denomination ?? '-',
        code: compTab?.code ?? '-',
        fields: dataTab,
      },
      levelGeoStr: {
        orgManager: orgManager?.id ?? 0,
        approvalManager: approvalManager?.id ?? 0,
      },
      typesInputs: {
        generalInfo: {
          main: data?.data?.workPosition?.fieldTypes ?? {},
          dataStores: data?.data?.workPosition?.store?.fieldTypes ?? {},
        },
        jobConfig: data?.data?.workPosition?.compCategory?.fieldTypes ?? {},
        tab: data?.data?.workPosition?.compTab?.fieldTypes ?? {},
      },
    }

    modelDispatch({
      type: ActionTypes.LOAD_MODEL,
      payload: {
        step: currentStep,
        id: respId ?? 0,
        formInformation,
        isLoaded: !isEmpty(formInformation),
      },
    })
  }

  const getField = async (): Promise<TypeJson[] | undefined> => {
    if (!jsonFields) {
      const response = await getGenInfoFields(ModelKeywords.JobTitles)
      if (response.data) {
        const sorted = response.data.data
          .sort((a, b) => a.position - b.position)
          .filter((item) => item.visible)

        const actDisabled =
          modelState.formInformation?.tab?.minSalary && modelState.formInformation?.tab.tabId

        const jsonReady = sorted.map((item) => ({
          id: item.id,
          type: item.fieldType.id as FieldTypeEnumSelect,
          name: item.name,
          label: item.label,
          placeholder: item.placeholder ?? '',
          optionsId: item.catalogueId,
          validations: item.validations,
        }))
        const fields = [...workPositionsFields(actDisabled), ...(jsonReady ?? [])]
        setJsonFields(fields)
        return fields
      }
    }
    if (jsonFields) {
      const actDisabled =
        modelState.formInformation?.tab?.minSalary && modelState.formInformation?.tab.tabId
      const fields = jsonFields.map((item) => {
        if (item.name === 'statusId') {
          return {
            ...item,
            disabled: actDisabled ? false : true,
            value: actDisabled ? undefined : 2,
          }
        }
        return item
      })
      setJsonFields(fields ?? [])
    }

    return
  }
  const orderField = (
    fields: interGetOrgEntitiesResponse,
    geographicalElements: InputCascade[] = [],
    organizationalElements: InputCascade[] = [],
  ): { geographicalElements: InputCascade[]; organizationalElements: InputCascade[] } => {
    fields.forEach((element) => {
      const field = {
        id: element?.id,
        name: element?.name,
        requerido: element?.required,
        parentId: element?.parentId ?? null,
      }
      if (element.orgEntityTypeId === 1) geographicalElements.push(field)
      if (element.orgEntityTypeId === 2) organizationalElements.push(field)
      if (element.children) {
        orderField(element.children, geographicalElements, organizationalElements)
      }
    })

    return { geographicalElements, organizationalElements }
  }
  const orderFields = (
    nestedElem: structuresType[],
    arrayCumulative: InsideCardArrows[],
  ): InsideCardArrows[] => {
    nestedElem?.forEach((nested) => {
      if (!nested) return []
      const element: InsideCardArrows = {
        id: nested?.id,
        name: nested?.name,
        type: nested?.orgEntity.name,
      }
      arrayCumulative.push(element)
      if (nested.children) {
        orderFields(nested.children, arrayCumulative)
      }
    })

    return arrayCumulative
  }
  const addChildren = (array: { name: string; type: string }[], child: structureType[]) => {
    array.push({
      name: child[0]?.name,
      type: child[0]?.orgEntity?.name,
    })
    if (child[0]?.children) addChildren(array, child[0]?.children)
    return array
  }
  const areArraysEqual = (arrayOne: number[], arrayTwo: number[]): boolean => {
    if (arrayOne.length !== arrayTwo.length) return false
    return arrayOne.every((value, index) => value === arrayTwo[index])
  }
  const consultStore = async (
    id: string,
    select?: number[],
  ): Promise<GeneralInfoType | undefined> => {
    const { data, error } = await getModelDetail(id)
    if (data) {
      let geographicalElements: CardArrows = Object.create(null)
      const organizationalElements: CardArrows[] = []

      data.data.structuresByType.forEach((strType) => {
        if (strType.orgEntityType.id === 1) {
          geographicalElements = {
            id: strType.details[0].id,
            data: orderFields(strType.details[0].structures, []),
          }
        }
        if (strType.orgEntityType.id === 2) {
          strType.details.forEach((str) => {
            const newData = orderFields(str.structures, [])
            let checkTrue: boolean = false
            if (select) {
              const idArray = newData.map((item) => item.id ?? 0)
              checkTrue = areArraysEqual(idArray, select)
            }
            organizationalElements.push({
              id: str.id,
              data: newData,
              check: checkTrue,
            })
          })
        }
      })

      return {
        main: {
          code: data?.data?.store?.code ?? '-',
          name: data?.data?.store?.denomination ?? '-',
          address: data?.data?.store?.address ?? '-',
        },
        structureGeo: geographicalElements,
        structureOrg: organizationalElements,
      }
    }
    if (error) {
      setActMessage({
        message: t(`instancesWorkPositions.creation.notifications.error`),
        type: Variant.error,
      })
    }
  }
  const arrayToJson = (
    array: Array<{ title: string; value: string }>,
  ): { [key: string]: string } => {
    const jsonObject: { [key: string]: string } = {}
    array.forEach((item) => {
      jsonObject[item.title] = item.value
    })
    return jsonObject
  }

  const formatArrayToDynamic = (
    fieldValues: arrayGenInfoType[],
    fieldTypes?: FieldsTypesType,
  ): arrayGenInfoType[] => {
    if (!fieldTypes) return fieldValues
    const objNew: DynamicFormValues = {}
    fieldValues.forEach((item) => {
      const value = item.value
      const key = item.title
      objNew[key] = value
    })
    const formatFields = formatFieldsWithTheirType(fieldTypes, objNew)
    const objFields = formatArrayToDynamicFormValues(formatFields)
    return createDataArray(objFields)
  }

  useEffect(() => {
    const fetchData = async () => {
      await loadData({})
    }

    fetchData()
  }, [modelState.id]) // eslint-disable-line
  useEffect(() => {
    if (modelState.isFirstLoad) getFields()
  }, [modelState.isFirstLoad]) // eslint-disable-line

  useEffect(() => {
    getField() //eslint-disable-next-line
  }, [
    Boolean(modelState.formInformation?.tab?.minSalary), // eslint-disable-line
    Boolean(modelState.formInformation?.tab?.tabId), // eslint-disable-line
  ])

  return (
    <WorkPositionsContext.Provider
      value={{
        getFields,
        addChildren,
        loadData,
        modelDispatch,
        modelState,
        loadingStatus,
        setLoadingStatus,
        orderFields,
        generalInfo,
        setGeneralInfo,
        getField,
        jsonFields,
        setJsonFields,
        consultStore,
        arrayToJson,
        formatArrayToDynamic,
      }}
    >
      {children}
    </WorkPositionsContext.Provider>
  )
}
