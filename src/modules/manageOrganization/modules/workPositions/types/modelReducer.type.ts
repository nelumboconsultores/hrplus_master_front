import { ActionTypes } from '../enums'
import { BodyAllInfo } from './bodyAllInfo'
import { InputCascade, itemSavedType } from './modelSaveData'

//type DinamicValues = Record<string, string | number | boolean | number[]>

export type ModelState = {
  step: number
  id: number | null
  formInformation?: BodyAllInfo | undefined
  organizationalElements: Array<InputCascade>
  geographicalElements: Array<InputCascade>
  isFirstLoad: boolean
}

export type ActionType =
  | {
      type: ActionTypes.SET_STEP
      payload: number
    }
  | {
      type: ActionTypes.SET_ID
      payload: number
    }
  | {
      type: ActionTypes.SET_FIRST_LOAD
      payload: boolean
    }
  | {
      type: ActionTypes.SET_FORM_INFORMATION
      payload: BodyAllInfo
    }
  | {
      type: ActionTypes.LOAD_MODEL_ELEMENTS
      payload: {
        organizationalElements: Array<InputCascade>
        geographicalElements: Array<InputCascade>
      }
    }
  | {
      type: ActionTypes.LOAD_MODEL_FIELDS
      payload: {
        organizationalFields: itemSavedType
        geographicalFields: itemSavedType
      }
    }
  | {
      type: ActionTypes.LOAD_MODEL
      payload: {
        step: number
        id: number | null
        formInformation: BodyAllInfo
        isLoaded: boolean
        //initialFormInformation: DinamicValues
      }
    }
  | {
      type: ActionTypes.CLEAN
    }
  | {
      type: ActionTypes.CLEAN_FORM_INFORMATION
    }
