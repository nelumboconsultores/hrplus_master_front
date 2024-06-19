import { useEffect, useReducer } from 'react'
import { getDetailsMacroStructure } from 'core/services/commercialStructure'
import { ManOrgAction } from '../enums'
import { initialState, manOrgReducer } from '../reducers'
import { ManOrgState } from '../enums/manOrgState'
import { ManOrgContext } from '../context'

export const ManOrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, appDispatch] = useReducer(manOrgReducer, initialState)
  const pathnames = location.pathname.split('/').filter((x) => x)
  const id = pathnames.find((x) => {
    const num = Number(x)
    return !isNaN(num)
  })
  useEffect(() => {
    getInformationGeneral()
  }, []) // eslint-disable-line
  const getInformationGeneral = async () => {
    if (!id) return
    const response = await getDetailsMacroStructure(id)
    if (response.data) {
      appDispatch({
        type: ManOrgAction.SET_COMPLETED,
        payload: response.data.data.status === ManOrgState.Done,
      })
    }
  }
  return (
    <ManOrgContext.Provider value={{ appState, appDispatch }}>{children}</ManOrgContext.Provider>
  )
}
