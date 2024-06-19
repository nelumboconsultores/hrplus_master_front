import { Close } from '@mui/icons-material'
import { Box } from '@mui/material'
import { CapitalIconButton, CorePopover } from 'core'
import { Event, EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { useEffect, useState } from 'react'
import { getEventDetail } from 'modules/eventAndCalendar/service'
import { EventContent } from './eventContent'

type SingularEventPopoverProps = {
  popoverInfo: { anchorEl: HTMLElement | null; open: boolean }
  event: EventsListGeneralCalendar
  onClose: () => void
}
export const SingularEventPopover: React.FC<SingularEventPopoverProps> = ({
  popoverInfo,
  onClose,
  event,
}) => {
  const { t } = useTranslation()
  const [eventDetail, setEventDetail] = useState<Event>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!popoverInfo.open || !popoverInfo.anchorEl) return

    const fetchEventDetail = async () => {
      const { data } = await getEventDetail(event.id)
      if (data) setEventDetail(data.data ?? event.eventData)
      setIsLoaded(true)
    }
    fetchEventDetail()
  }, [event.id, popoverInfo]) //eslint-disable-line

  return (
    <CorePopover
      anchorEl={popoverInfo.anchorEl}
      open={popoverInfo.open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 1 }}
      slotProps={{
        paper: {
          sx: { borderRadius: '16px', border: `3px solid #${eventDetail?.eventType?.color}` },
        },
      }}
    >
      <Box sx={styles.root}>
        <CapitalIconButton
          title={t('general.toolTip.close')}
          onClick={onClose}
          sx={styles.closeIcon}
          disableRipple
        >
          <Close />
        </CapitalIconButton>
        <EventContent event={eventDetail ?? Object({})} isLoaded={isLoaded} />
      </Box>
    </CorePopover>
  )
}
