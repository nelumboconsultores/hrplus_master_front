import { createContext, useState } from 'react'

export const DataStructureContext = createContext<{
  idEntity?: number
  setIdEntity: React.Dispatch<React.SetStateAction<number | undefined>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}>(Object({}))

export const DataStructureProvider = ({ children }: { children: React.ReactElement }) => {
  const [idEntity, setIdEntity] = useState<number>()
  const [loading, setLoading] = useState(false)
  return (
    <DataStructureContext.Provider value={{ idEntity, setIdEntity, loading, setLoading }}>
      {children}
    </DataStructureContext.Provider>
  )
}
