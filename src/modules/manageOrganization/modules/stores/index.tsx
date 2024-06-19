import { ProviderModel } from './context'
import { RouterProvider } from './router'

const StoresModule: React.FC = () => (
  <ProviderModel>
    <RouterProvider />
  </ProviderModel>
)

export default StoresModule
