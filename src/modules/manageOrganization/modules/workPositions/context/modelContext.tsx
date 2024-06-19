import React, { createContext } from 'react'
import { firstDataType } from '../types/modelSaveData'
import { ModelResponse, structureType } from '../services/model.services'
import { ActionType, GeneralInfoType, ModelState, arrayGenInfoType } from '../types'
import { structuresType } from '../../stores/types/getCostCenterDetails'
import { InsideCardArrows } from 'modules/manageOrganization/types'
import { TypeJson } from 'core/components/returnInput/typeJson'
import { FieldsTypesType } from 'core'

export const WorkPositionsContext = createContext<{
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
  getFields: () => Promise<void>
  getField: () => Promise<TypeJson[] | undefined>
  jsonFields: TypeJson[] | undefined
  setJsonFields: React.Dispatch<React.SetStateAction<TypeJson[] | undefined>>
  orderFields: (
    nestedElem: structuresType[],
    arrayCumulative: InsideCardArrows[],
  ) => InsideCardArrows[]
  generalInfo: GeneralInfoType | undefined
  setGeneralInfo: React.Dispatch<React.SetStateAction<GeneralInfoType | undefined>>
  consultStore: (id: string, arraySelect?: number[]) => Promise<GeneralInfoType | undefined>
  arrayToJson: (array: Array<{ title: string; value: string }>) => { [key: string]: string }
  formatArrayToDynamic: (
    fieldValues: arrayGenInfoType[],
    fieldTypes?: FieldsTypesType,
  ) => arrayGenInfoType[]
}>(Object({}))
