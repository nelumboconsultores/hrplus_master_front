import { Route, Routes } from 'react-router-dom'
import { ScheduleHolidays } from '../pages/scheduleHolidays'
import { PathName, getPath } from 'core'
import { EventConfigurationModule } from '../modules'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<ScheduleHolidays />} />
      <Route path={getPath(PathName.Events) + '/*'} element={<EventConfigurationModule />} />
    </Routes>
  )
}
