import { createContext } from 'react'

export const DataCreationContext = createContext<{
  completed: boolean
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>
}>(Object({}))
