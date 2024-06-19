import { ProviderWorkPositions } from './providers/workPositionsProvider'
import { RouterProvider } from './router'

const WorkPositionsModule: React.FC = () => (
  <ProviderWorkPositions>
    <RouterProvider />
  </ProviderWorkPositions>
)

export default WorkPositionsModule
