import { PickersDay, PickersDayProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { colors } from './colors'
import { useState } from 'react'
import { Event } from 'modules/eventAndCalendar/service/types'
import { formatByGeneralCalendar } from 'modules/eventAndCalendar/providers/methods'
import { EventListPopover } from 'modules/eventAndCalendar/components/popovers'

type MarkEventsProps = PickersDayProps<Dayjs> & {
  hasEvent: boolean
  eventColor: string
  events: Event[]
}
const MarkEvents: React.FC<MarkEventsProps> = ({ hasEvent, eventColor, ...props }) => {
  const { day: date, outsideCurrentMonth, ...other } = props
  const [popoverInfo, setPopoverInfo] = useState<{
    anchorEl: HTMLButtonElement | null
    open: boolean
  }>({
    anchorEl: null,
    open: false,
  })

  const isSunday = date.day() == 0
  const isSaturday = date.day() == 6
  let background: string = 'background.default'
  let color = 'grey.700'
  if (hasEvent) {
    background = eventColor
    color = 'background.default'
  } else if (isSunday || isSaturday) {
    color = colors.red
    background = '#ffffff'
  } else {
    background = '#ffffff'
    color = 'grey.700'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopoverInfo({ anchorEl: e.currentTarget, open: true })
  }

  return (
    <>
      <PickersDay
        {...other}
        sx={{
          background: background,
          color,
          ...((isSunday || isSaturday) && {
            fontWeight: '600',
          }),
          '&.MuiPickersDay-root.Mui-selected': {
            background,
            color,
          },
          '& .Mui-selected': {
            border: 'none',
          },
          '&:hover': {
            background: background,
            color,
          },
          cursor: 'pointer',
        }}
        outsideCurrentMonth={outsideCurrentMonth}
        day={date}
        onClick={handleClick}
      />

      <EventListPopover
        popoverInfo={popoverInfo}
        onClose={() => setPopoverInfo({ ...popoverInfo, anchorEl: null, open: false })}
        events={formatByGeneralCalendar(props.events)}
        date={date}
      />
    </>
  )
}

export { MarkEvents }
