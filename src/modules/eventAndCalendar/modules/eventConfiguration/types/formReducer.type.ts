import { eventBody } from 'modules/eventAndCalendar/service'
import { ActionTypes } from '../enums/formReducer'

export type EventReducerType = {
  dataSubmit: eventBody | null
  idEvent: number | null
}

export type ActionType =
  | {
      type: ActionTypes.SET_DATA_SUBMIT
      payload: eventBody | null
    }
  | {
      type: ActionTypes.SET_EVENT_ID
      payload: number | null
    }
  | {
      type: ActionTypes.CLEAN
      payload: null
    }
