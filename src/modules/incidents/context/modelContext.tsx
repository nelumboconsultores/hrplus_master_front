import React, { createContext, useState } from 'react'
export const ModelContext = createContext<{
  setLoadingStatus: React.Dispatch<boolean>
  loadingStatus: boolean
}>(Object({}))

export const ProviderModel = ({ children }: { children: React.ReactElement }) => {
  const [loadingStatus, setLoadingStatus] = useState(false)

  return (
    <ModelContext.Provider value={{ loadingStatus, setLoadingStatus }}>
      {children}
    </ModelContext.Provider>
  )
}
