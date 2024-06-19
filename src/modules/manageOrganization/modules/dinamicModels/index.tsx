import { ProviderModel } from './context'
import { RouterProvider } from './router'

const DynamicModelsModule: React.FC = () => (
  <ProviderModel>
    <RouterProvider />
  </ProviderModel>
)

export default DynamicModelsModule
