import { Close } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { CapitalIconButton, CorePopover, FontName } from 'core'
import dayjs from 'dayjs'
import { EventsListGeneralCalendar } from 'modules/eventAndCalendar/service/types'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { EventCard } from '../../eventCard'

type EventListPopoverProps = {
  date: dayjs.Dayjs
  popoverInfo: { anchorEl: HTMLElement | null; open: boolean }
  events: EventsListGeneralCalendar[]
  onClose: () => void
}
export const EventListPopover: React.FC<EventListPopoverProps> = ({
  popoverInfo,
  onClose,
  events,
  date,
}) => {
  const { t } = useTranslation()

  const [day, dayName] = date?.format('DD dddd')?.split(' ') ?? ['', '']
  const borderStyle = !events.length ? 'none' : `3px solid #${events[0]?.eventData.eventType.color}`
  return (
    <CorePopover
      anchorEl={popoverInfo.anchorEl}
      open={!!popoverInfo.anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ marginTop: 1 }}
      slotProps={{ paper: { sx: { border: borderStyle, borderRadius: '16px' } } }}
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
        <Box>
          <Typography fontFamily={FontName.RobotoBold} textAlign="center" fontSize="1.5rem">
            {day}
          </Typography>
          <Typography textAlign="center" textTransform="uppercase">
            {dayName}
          </Typography>
        </Box>
        <Box sx={styles.container}>
          {!events.length && (
            <Typography textAlign="center">{t('eventAndCalendar.anyOneEventWasFound')}</Typography>
          )}

          {!!events.length && events.map((event) => <EventCard key={event.id} event={event} />)}
        </Box>
      </Box>
    </CorePopover>
  )
}
