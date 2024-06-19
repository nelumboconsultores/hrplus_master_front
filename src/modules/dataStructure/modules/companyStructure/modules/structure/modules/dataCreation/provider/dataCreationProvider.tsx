import { useState } from 'react'
import { DataCreationContext } from '../context'

export const DataCreationProvider = ({ children }: { children: React.ReactElement }) => {
  const [completed, setCompleted] = useState<boolean>(false)

  return (
    <DataCreationContext.Provider value={{ completed, setCompleted }}>
      {children}
    </DataCreationContext.Provider>
  )
}
