import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react'
import { getOrgEntities, interGetOrgEntitiesResponse } from 'core/services'
import { InputCascade, firstDataType } from '../types/modelSaveData'
import { ModelResponse, getModelDetail, structureType } from '../services/model.services'
import { structuresByType } from '../types/getCostCenterDetails'
import { getModel } from '../services/model.services'
import { ModelReducer, initialState } from '../reducers'
import { ActionTypes } from '../enums'
import { ActionType, ModelState } from '../types'
import { useLocation } from 'react-router-dom'
import { getName } from '../utils/getDinamicLocales'
import { getKeyword } from '../utils/getKeyword'
import { PathName } from 'core'
//import { formatArrayToDynamicFormValues, formatFieldsWithTheirType } from 'core/utils/textFormat'

export const ModelContext = createContext<{
  addChildren: (
    array: { name: string; type: string }[],
    child: structureType[],
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
  modelLocale: string
  getFields: () => Promise<void>
}>(Object({}))

export const ProviderModel = ({ children }: { children: React.ReactElement }) => {
  const [modelState, modelDispatch] = useReducer(ModelReducer, initialState)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const { pathname } = useLocation()
  const modelLocale: string = useMemo(() => getName(pathname), [pathname])
  const getFields = async () => {
    const response = await getOrgEntities(getKeyword(pathname))
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

    // Extrae los campos relevantes de los datos
    const fields: firstDataType = {
      code: data?.data.code ?? '',
      denomination: data?.data.denomination ?? '',
      statusId: data?.data.status?.id ?? 1,
      ...(!!data?.data?.country?.id && { countryId: data?.data.country?.id }),
      ...(!!data?.data?.state?.id && { stateId: data?.data.state?.id }),
      ...(!!data?.data?.city?.id && { cityId: data?.data.city?.id }),
      ...(!!data?.data?.maxAuthorizedSalary && {
        maxAuthorizedSalary: data?.data.maxAuthorizedSalary,
      }),
      ...(!!data?.data?.minAuthorizedSalary && {
        minAuthorizedSalary: data?.data.minAuthorizedSalary,
      }),
      ...data?.data.fieldValues,
    }

    // Obtiene el paso actual
    const currentStep = step ?? modelState?.step ?? 0

    // Actualiza el estado del modelo con los datos cargados
    modelDispatch({
      type: ActionTypes.LOAD_MODEL,
      payload: {
        step: currentStep,
        id: data?.data.id ?? null,
        initialFormInformation: fields,
        formInformation: {
          ...fields,
          countryId: data?.data.country?.name ?? '',
          stateId: data?.data.state?.name ?? '',
          cityId: data?.data.city?.name ?? '',
        },
      },
    })
    modelDispatch({
      type: ActionTypes.SET_TYPES_INPUTS,
      payload: data?.data.fieldTypes ?? {},
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
      response.data?.data?.structuresByType?.forEach((element: structuresByType) => {
        if (element.orgEntityType.id === 1) {
          element.details.forEach((element_) => {
            geographicalFields.push({
              id: element_.id,
              data: addChildren([], element_.structures),
            })
          })
        }
        if (element.orgEntityType.id === 2) {
          element.details.forEach((element_) => {
            organizationalFields.push({
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
  const addChildren = (array: { name: string; type: string }[], child: structureType[]) => {
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
      if (pathname.includes(PathName.costCenter)) getDetailsInstances()
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
        modelLocale,
        getFields,
      }}
    >
      {children}
    </ModelContext.Provider>
  )
}
