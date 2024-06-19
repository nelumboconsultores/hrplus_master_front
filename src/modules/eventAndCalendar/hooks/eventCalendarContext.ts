import { useContext } from 'react'
import { EventsAndCalendarContext } from '../context'

const useEventCalendarContext = () => useContext(EventsAndCalendarContext)

export { useEventCalendarContext }
