import { EventConfigurationProvider } from './context'
import { Layout } from './layout'

export const EventConfigurationModule: React.FC = () => {
  return (
    <EventConfigurationProvider>
      <Layout />
    </EventConfigurationProvider>
  )
}
