import { Box, Typography } from '@mui/material'
import { EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { EventProps } from 'react-big-calendar'

export const EventViewer: React.FC<EventProps<EventsListGeneralCalendar>> = (props) => {
  return (
    <Box
      {...props}
      sx={{
        backgroundColor: `#${props.event.eventData.eventType.color}`,
        boxSizing: 'border-box',
        padding: '2px',
        cursor: 'pointer',
      }}
    >
      <Typography sx={{ color: 'white', fontSize: '12px' }}>{props.event.title}</Typography>
    </Box>
  )
}
