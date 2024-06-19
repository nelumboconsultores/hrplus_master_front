import { createContext } from 'react'
import { ActionType, ManOrgState } from '../types'

export const ManOrgContext = createContext<{
  appState: ManOrgState
  appDispatch: React.Dispatch<ActionType>
}>(Object({}))
