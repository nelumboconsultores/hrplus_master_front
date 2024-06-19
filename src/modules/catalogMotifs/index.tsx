import { ProviderModel } from './context'
import { RoutesProvider } from './routes'

const CatalogMotfsModule: React.FC = () => (
  <ProviderModel>
    <RoutesProvider />
  </ProviderModel>
)

export default CatalogMotfsModule
