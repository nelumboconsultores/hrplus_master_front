import { useState } from 'react'
import { Box } from '@mui/material'
import { EventWrapperProps } from 'react-big-calendar'

import { SingularEventPopover } from 'modules/eventAndCalendar/components/popovers'
import { EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'

export const CustomEvent: React.FC<EventWrapperProps<EventsListGeneralCalendar>> = (props) => {
  const [anchorEl, setAnchorEl] = useState<{ anchorEl: HTMLElement | null; open: boolean }>({
    anchorEl: null,
    open: false,
  })

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const children = event.currentTarget.children
    const element = children[0] as HTMLElement
    setAnchorEl({ anchorEl: element, open: true })
  }
  const handleClose = () => setAnchorEl({ anchorEl: null, open: false })
  return (
    <>
      <Box
        {...props}
        sx={{
          '& .rbc-event': {
            backgroundColor: `#${props.event.eventData.eventType.color} !important`,
            boxSizing: 'border-box',
            padding: '2px',
            cursor: 'pointer',
            border: 'none !important',
            '&: focus': {
              outline: 'none',
              border: 'none',
            },
          },
          border: 'none',
        }}
        onClick={handleClick}
      />

      <SingularEventPopover event={props.event} popoverInfo={anchorEl} onClose={handleClose} />
    </>
  )
}
