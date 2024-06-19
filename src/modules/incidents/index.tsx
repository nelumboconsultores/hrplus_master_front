import { RoutesProvider } from './routes'
import { ProviderModel } from './context'

const IncidentsModule: React.FC = () => (
  <ProviderModel>
    <RoutesProvider />
  </ProviderModel>
)

export default IncidentsModule
