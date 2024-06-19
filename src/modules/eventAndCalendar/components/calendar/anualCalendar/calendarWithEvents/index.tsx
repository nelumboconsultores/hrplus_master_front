import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/es'
import {
  CustomizedStaticDatePicker,
  hideArrow,
  useCalendarWithEventsStyles,
} from './calendarWithEventsStyles'
import { PickersDayProps } from '@mui/x-date-pickers'
import { MarkEvents } from '../markEvents'
import { CardDetail } from 'core'
import { CalendarWithEventsProps } from 'modules/eventAndCalendar/types'
import { Box } from '@mui/material'
import { useEventCalendarContext } from 'modules/eventAndCalendar/hooks'

const CalendarWithEvents = ({ month }: CalendarWithEventsProps) => {
  const { currentDateSelector, eventList } = useEventCalendarContext()
  const year = currentDateSelector.year()
  const calendarViews = new Date(year, month, 1)
  const styles = useCalendarWithEventsStyles()
  return (
    <Box sx={styles.constainer}>
      <CardDetail elevation={0}>
        <CustomizedStaticDatePicker
          disableHighlightToday
          referenceDate={dayjs(calendarViews)}
          displayStaticWrapperAs="desktop"
          slotProps={{
            leftArrowIcon: hideArrow,
            rightArrowIcon: hideArrow,
          }}
          slots={{
            day: (dayProps) => {
              const days = dayProps as PickersDayProps<Dayjs>
              const eventsByday = eventList[days.day.format('YYYY-MM-DD')]
              const color = eventsByday?.length ? `#${eventsByday[0].eventType.color}` : 'inherit'
              return (
                <MarkEvents
                  {...days}
                  hasEvent={!!eventsByday?.length}
                  eventColor={color}
                  events={eventsByday ?? []}
                />
              )
            },
            calendarHeader: (a) => {
              return (
                <p className="header-calendar">
                  {a.currentMonth?.valueOf
                    ? dayjs(new Date(a.currentMonth?.valueOf() as number))
                        .locale('es')
                        .format('MMMM')
                    : ''}
                </p>
              )
            },
          }}
          value={null}
          views={['day']}
        />
      </CardDetail>
    </Box>
  )
}

export { CalendarWithEvents }
