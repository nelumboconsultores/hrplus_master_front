import { useContext, useEffect } from 'react'
import { ToolbarProps, Views } from 'react-big-calendar'

import { capitalizeEachWord } from 'core/utils/textFormat'

import { EventsAndCalendarContext } from 'modules/eventAndCalendar/context'
import { CalendarType } from 'modules/eventAndCalendar/enum'

import { DateSelector } from '../../dateSelector'

export const CustomToolbar: React.FC<ToolbarProps<never, object>> = (props) => {
  const { calendarMode, changeDateSelector } = useContext(EventsAndCalendarContext)

  const handleNext = () => {
    props.onNavigate('NEXT')
    changeDateSelector('forward')
  }
  const handleBack = () => {
    props.onNavigate('PREV')
    changeDateSelector('backward')
  }

  useEffect(() => {
    if (calendarMode && calendarMode !== CalendarType.Year) {
      switch (calendarMode) {
        case CalendarType.Month:
          props.onView(Views.MONTH)
          break
        case CalendarType.week:
          props.onView(Views.WEEK)
          break
        case CalendarType.Day:
          props.onView(Views.DAY)
          break
      }
    }
  }, [calendarMode]) // eslint-disable-line
  const capitalizedLabel = capitalizeEachWord(props.label)
  return <DateSelector onBackward={handleBack} onForward={handleNext} date={capitalizedLabel} />
}
