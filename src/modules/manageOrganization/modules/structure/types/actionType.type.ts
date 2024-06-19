import { RouteRoad } from '.'
import { ManOrgAction } from '../enums'

export type ActionType =
  | {
      type: ManOrgAction.SET_COMPLETED
      payload: boolean
    }
  | {
      type: ManOrgAction.SET_ROUTE_ROAD
      payload: Array<RouteRoad>
    }
