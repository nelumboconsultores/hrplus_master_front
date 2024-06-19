import { ActionType, EventReducerType } from '../types'
import { ActionTypes } from '../enums/formReducer'

const locaState = localStorage.getItem('eventBody')
const localStateParsed: EventReducerType | null = locaState ? JSON.parse(locaState) : null

export const cleanState = {
  dataSubmit: null,
  idEvent: null,
}
export const initialState: EventReducerType = localStateParsed ?? cleanState

const updateStateAndLocalStorage = (newState: EventReducerType): EventReducerType => {
  localStorage.setItem('eventBody', JSON.stringify(newState))
  return newState
}
export const EventReducer = (state: EventReducerType, action: ActionType): EventReducerType => {
  let newState = state

  switch (action.type) {
    case ActionTypes.SET_DATA_SUBMIT:
      newState = { ...state, dataSubmit: action.payload }
      return updateStateAndLocalStorage(newState)
    case ActionTypes.SET_EVENT_ID:
      newState = { ...state, idEvent: action.payload }
      return updateStateAndLocalStorage(newState)
    case ActionTypes.CLEAN:
      return cleanState
    default:
      return state
  }
}
