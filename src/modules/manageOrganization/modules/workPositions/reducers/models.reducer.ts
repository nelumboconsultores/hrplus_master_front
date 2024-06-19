import { ActionTypes } from '../enums'
import { ActionType, ModelState } from '../types'

const locaState = localStorage.getItem('workPositionsState')
const localStateParsed: ModelState | null = locaState ? JSON.parse(locaState) : null
const cleanState = {
  step: 0,
  id: null,
  formInformation: undefined,
  organizationalElements: [],
  geographicalElements: [],
  isFirstLoad: true,
}
export const initialState: ModelState = localStateParsed ?? cleanState

const updateStateAndLocalStorage = (newState: ModelState): ModelState => {
  localStorage.setItem('workPositionsState', JSON.stringify(newState))
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
      }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.LOAD_MODEL:
      newState = {
        ...state,
        step: action.payload.step,
        id: action.payload.id,
        formInformation: action.payload.formInformation,
      }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.CLEAN_FORM_INFORMATION:
      newState = { ...state, formInformation: undefined }
      return updateStateAndLocalStorage(newState)

    case ActionTypes.CLEAN:
      localStorage.removeItem('workPositionsState')
      return cleanState

    default:
      return state
  }
}
