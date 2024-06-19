import React, { createContext, useEffect, useReducer, useState } from 'react'
import { getOrgEntities, interGetOrgEntitiesResponse } from 'core/services'
import { InputCascade, firstDataType } from '../types/modelSaveData'
import { ModelResponse, getModelDetail } from '../services/model.services'
import { getModel } from '../services/model.services'
import { ModelReducer, initialState } from '../reducers'
import { ActionTypes, ModelKeywords } from '../enums'
import { ActionType, DinamicValues, ModelState } from '../types'
import { structuresType } from '../types/getCostCenterDetails'
//import { formatArrayToDynamicFormValues, formatFieldsWithTheirType } from 'core/utils/textFormat'

export const ModelContext = createContext<{
  addChildren: (
    array: { name: string; type: string }[],
    child: structuresType[],
  ) => { name: string; type: string }[]
  loadData: ({
    id,
    step,
    newData,
  }: {
    newData?: ModelResponse
    id?: string | number | undefined
    step?: number | undefined
  }) => Promise<firstDataType | undefined>
  modelDispatch: React.Dispatch<ActionType>
  modelState: ModelState
  setLoadingStatus: React.Dispatch<boolean>
  loadingStatus: boolean
  getFields: () => Promise<void>
}>(Object({}))

export const ProviderModel = ({ children }: { children: React.ReactElement }) => {
  const [modelState, modelDispatch] = useReducer(ModelReducer, initialState)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const getFields = async () => {
    const response = await getOrgEntities(ModelKeywords.Stores)
    if (response.data) {
      const fields = orderFields(response.data?.data)
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

    // Si no se proporciona un ID y no hay un ID local, retorna undefined
    if (!id && !localId) return

    let data = newData

    // Si no hay nuevos datos, realiza una solicitud para obtenerlos
    if (!newData) {
      const { data: response } = await getModel(id ?? localId ?? '')
      if (response) data = response
    }
    if (!data?.data) return

    // Extrae los campos relevantes de los datos
    const fields: firstDataType = {
      code: data?.data.code ?? '',
      denomination: data?.data.denomination ?? '',
      statusId: data?.data.status?.id ?? 1,
      countryId: data?.data.country?.id ?? 0,
      stateId: data?.data.state?.id ?? 0,
      cityId: data?.data.city?.id ?? 0,
      address: data?.data.address ?? '',
      zipcode: data?.data.zipcode ?? '',
      georefDistance: data?.data.georefDistance ?? 0,
      latitude: data?.data.latitude ?? 0,
      longitude: data?.data.longitude ?? 0,
      ...(data?.data?.costCenter?.id && { costCenterId: data?.data.costCenter?.id }),
      ...data?.data.fieldValues,
    }

    // Obtiene el paso actual
    const currentStep = step ?? modelState?.step ?? 0

    // Actualiza el estado del modelo con los datos cargados

    const payload = {
      step: currentStep,
      id: data?.data.id ?? null,
      initialFormInformation: fields as DinamicValues,
      formInformation: {
        ...fields,
        countryId: data?.data.country?.name ?? '',
        stateId: data?.data.state?.name ?? '',
        cityId: data?.data.city?.name ?? '',
        statusId: data?.data.status?.name ?? '',
      },
      costCenter: data?.data.costCenter ?? { id: 0, code: '', denomination: '' },
    }

    modelDispatch({
      type: ActionTypes.SET_TYPES_INPUTS,
      payload: data?.data.fieldTypes,
    })
    modelDispatch({
      type: ActionTypes.LOAD_MODEL,
      payload: payload,
    })

    // Retorna los campos extraídos
    return fields
  }
  const orderFields = (
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
        hasMany: element?.hasMany,
      }
      if (element.orgEntityTypeId === 1) geographicalElements.push(field)
      if (element.orgEntityTypeId === 2) organizationalElements.push(field)
      if (element.children) {
        orderFields(element.children, geographicalElements, organizationalElements)
      }
    })

    return { geographicalElements, organizationalElements }
  }

  const getDetailsInstances = async () => {
    if (!modelState?.id) return
    const response = await getModelDetail(modelState.id.toString() ?? '')
    if (response.data) {
      const organizationalFields: { id: number; data: { name: string; type: string }[] }[] = []
      const geographicalFields: { id: number; data: { name: string; type: string }[] }[] = []
      response.data?.data?.structuresByType?.forEach((element) => {
        if (element.orgEntityType.id === 2) {
          element.details.forEach((element_) => {
            organizationalFields.push({
              id: element_.id,
              data: addChildren([], element_.structures),
            })
          })
        }
        if (element.orgEntityType.id === 1) {
          element.details.forEach((element_) => {
            geographicalFields.push({
              id: element_.id,
              data: addChildren([], element_.structures),
            })
          })
        }
      })
      modelDispatch({
        type: ActionTypes.LOAD_MODEL_FIELDS,
        payload: { organizationalFields, geographicalFields },
      })
    }
  }
  const addChildren = (array: { name: string; type: string }[], child: structuresType[]) => {
    array.push({
      name: child[0]?.name,
      type: child[0]?.orgEntity?.name,
    })
    if (child[0]?.children) addChildren(array, child[0]?.children)
    return array
  }
  useEffect(() => {
    if (modelState.isFirstLoad) getFields()
  }, [modelState.isFirstLoad]) // eslint-disable-line
  useEffect(() => {
    if (modelState?.id) {
      if (modelState?.step > 0) loadData({})
      getDetailsInstances()
    }
  }, [modelState?.id]) // eslint-disable-line

  return (
    <ModelContext.Provider
      value={{
        addChildren,
        loadData,
        modelDispatch,
        modelState,
        loadingStatus,
        setLoadingStatus,
        getFields,
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}
