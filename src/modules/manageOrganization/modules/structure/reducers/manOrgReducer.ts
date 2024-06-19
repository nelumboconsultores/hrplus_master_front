import { ActionType, ManOrgState } from '../types'

export const initialState: ManOrgState = {
  completed: false,
  routeRoad: [{ oe_id: 1, oe_pid: 0, entityName: '', instanceName: '' }],
}

export const manOrgReducer = (state: ManOrgState, action: ActionType): ManOrgState => {
  switch (action.type) {
    case 'SET_COMPLETED':
      return { ...state, completed: action.payload }
    case 'SET_ROUTE_ROAD':
      return { ...state, routeRoad: action.payload }
    default:
      return state
  }
}
