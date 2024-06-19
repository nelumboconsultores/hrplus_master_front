import { ActionTypes } from '../enums'
import { ActionType, ModelState } from '../types'

const locaState = localStorage.getItem('storeState')
const localStateParsed: ModelState | null = locaState ? JSON.parse(locaState) : null
const cleanState = {
  step: 0,
  id: null,
  formInformation: {},
  initialFormInformation: {},
  workPeriods: [],
  organizationalElements: [],
  geographicalElements: [],
  organizationalFields: [],
  geographicalFields: [],
  isFirstLoad: true,
  costCenter: { id: 0, code: '', denomination: '' },
  typesInputs: {},
}
export const initialState: ModelState = localStateParsed ?? cleanState

const updateStateAndLocalStorage = (newState: ModelState): ModelState => {
  localStorage.setItem('storeState', JSON.stringify(newState))
  return newState
}

export const ModelReducer = (state: ModelState, action: ActionType): ModelState => {
  let newState = state

  switch (action.type) {
    case ActionTypes.SET_FIRST_LOAD:
      newState = { ...state, isFirstLoad: action.payload }
      return updateStateAndLocalStorage(newState)
    case ActionTypes.SET_STEP:
      newState = { ...state, step: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_ID:
      newState = { ...state, id: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_FORM_INFORMATION:
      newState = { ...state, formInformation: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_WORK_POSITIONS:
      newState = { ...state, workPeriods: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_ORGANIZATIONAL_ELEMENTS:
      newState = { ...state, organizationalElements: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_GEOGRAPHICAL_ELEMENTS:
      newState = { ...state, geographicalElements: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_ORGANATIONAL_FIELDS:
      newState = { ...state, organizationalFields: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_GEOGRAPHICAL_FIELDS:
      newState = { ...state, geographicalFields: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_INITIAL_FORM_INFORMATION:
      newState = { ...state, initialFormInformation: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.SET_COST_CENTER:
      newState = { ...state, costCenter: action.payload }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.LOAD_MODEL_ELEMENTS:
      newState = {
        ...state,
        organizationalElements: action.payload.organizationalElements,
        geographicalElements: action.payload.geographicalElements,
        isFirstLoad: false,
      }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.LOAD_MODEL_FIELDS:
      newState = {
        ...state,
        organizationalFields: action.payload.organizationalFields,
        geographicalFields: action.payload.geographicalFields,
      }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.LOAD_MODEL:
      newState = {
        ...state,
        step: action.payload.step,
        id: action.payload.id,
        formInformation: action.payload.formInformation,
        initialFormInformation: action.payload.initialFormInformation,
        costCenter: action.payload.costCenter,
      }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.CLEAN_FORM_INFORMATION:
      newState = { ...state, formInformation: {}, initialFormInformation: {} }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.CLEAN:
      localStorage.removeItem('storeState')
      return cleanState

    case ActionTypes.SET_TYPES_INPUTS:
      newState = { ...state, typesInputs: action.payload }
      return updateStateAndLocalStorage(newState)

    default:
      return state
  }
}
