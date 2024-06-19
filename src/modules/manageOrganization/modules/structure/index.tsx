import { ManOrgProvider } from './provider'
import { RoutesProvider } from './routes'

const StructureModule = () => {
  return (
    <ManOrgProvider>
      <RoutesProvider />
    </ManOrgProvider>
  )
}

export default StructureModule
