import { DynamicFormValues, FieldsTypesType } from 'core'
import { ActionTypes } from '../enums'
import { InputCascade, itemSavedType } from './modelSaveData'

type DinamicValues = DynamicFormValues

export type ModelState = {
  step: number
  id: number | null
  formInformation: DinamicValues
  initialFormInformation: DinamicValues
  organizationalElements: Array<InputCascade>
  geographicalElements: Array<InputCascade>
  organizationalFields: itemSavedType
  geographicalFields: itemSavedType
  isFirstLoad: boolean
  typesInputs: FieldsTypesType
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
      payload: DinamicValues
    }
  | {
      type: ActionTypes.SET_ORGANIZATIONAL_ELEMENTS
      payload: Array<InputCascade>
    }
  | {
      type: ActionTypes.SET_GEOGRAPHICAL_ELEMENTS
      payload: Array<InputCascade>
    }
  | {
      type: ActionTypes.SET_INITIAL_FORM_INFORMATION
      payload: DinamicValues
    }
  | { type: ActionTypes.SET_ORGANATIONAL_FIELDS; payload: itemSavedType }
  | { type: ActionTypes.SET_GEOGRAPHICAL_FIELDS; payload: itemSavedType }
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
        formInformation: DinamicValues
        initialFormInformation: DinamicValues
      }
    }
  | {
      type: ActionTypes.CLEAN
    }
  | {
      type: ActionTypes.CLEAN_FORM_INFORMATION
    }
  | {
      type: ActionTypes.SET_TYPES_INPUTS
      payload: FieldsTypesType
    }
