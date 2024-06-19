import { Box, Typography } from '@mui/material'
import { EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { useStyles } from './styles'
import { useState } from 'react'
import { SingularEventPopover } from '../popovers'

export const EventCard: React.FC<{ event: EventsListGeneralCalendar }> = ({ event }) => {
  const { root, text } = useStyles(event.eventData.eventType.color)
  const [popoverInfo, setPopoverInfo] = useState<{
    anchorEl: HTMLElement | null
    open: boolean
  }>({
    anchorEl: null,
    open: false,
  })

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setPopoverInfo({ anchorEl: e.currentTarget, open: true })
  }
  return (
    <>
      <Box sx={root} onClick={handleClick}>
        <Typography noWrap sx={text}>
          {event.title}
        </Typography>
      </Box>
      <SingularEventPopover
        popoverInfo={popoverInfo}
        onClose={() => setPopoverInfo({ anchorEl: null, open: false })}
        event={event}
      />
    </>
  )
}
