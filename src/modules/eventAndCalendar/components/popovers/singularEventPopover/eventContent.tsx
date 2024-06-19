import Spinner from 'core/components/spinner'
import { styles } from './styles'
import { Box, Tooltip, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'
import { Event } from 'modules/eventAndCalendar/service/types'
import {
  AppContext,
  CapitalIconButton,
  ConfirmationModal,
  FontName,
  PathName,
  Variant,
  icons,
} from 'core'
import dayjs from 'dayjs'
import { CardFiles } from './cardFiles'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { removeEvent } from 'modules/eventAndCalendar/service'
import { useContext, useState } from 'react'
import { errorCodes } from 'core/locale/es/errorCodes'
import { useEventCalendarContext } from 'modules/eventAndCalendar/hooks'

export const EventContent: React.FC<{ event: Event; isLoaded: boolean }> = ({
  event,
  isLoaded,
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { fetchEvents } = useEventCalendarContext()
  const { setActMessage } = useContext(AppContext)
  const [openModal, setOpenModal] = useState(false)

  const handleDelete = async () => {
    const { data, error } = await removeEvent(event.id)

    if (data) {
      fetchEvents()
      setActMessage({ type: Variant.success, message: t('eventAndCalendar.success.deleteSuccess') })
    } else {
      const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
      setActMessage({
        type: Variant.error,
        message: errorCode ?? t('eventAndCalendar.errors.deleteError'),
      })
    }
    setOpenModal(false)
  }
  if (!isLoaded) return <Spinner />

  const isFestive = !event.eventDetail?.eventData?.files?.length
  return (
    <>
      <Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              maxWidth: 'calc(100% - 20px)',
            }}
          >
            <Tooltip title={event?.eventType.name} arrow>
              <Circle sx={{ color: `#${event.eventType.color}`, fontSize: '1.3rem' }} />
            </Tooltip>
            <Typography fontFamily={FontName.RobotoBold} sx={{ color: '#828282' }}>
              {event?.eventDetail?.name ?? ''}
            </Typography>
          </Box>
          <Typography
            textAlign="left"
            sx={{
              fontSize: '14px',
              fontFamily: FontName.RobotoRegular,
              color: '#828282',
              ml: '28px',
            }}
          >
            {dayjs(event.startsAt).format('DD [de] MMMM - h:mm A')} a{' '}
            {dayjs(event.endsAt).format('h:mm A')}
          </Typography>
        </Box>
        <Box sx={styles.container}>
          <Box>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '14px',
                fontFamily: FontName.RobotoBold,
                color: '#828282',
                mt: 2,
              }}
            >
              Descripción:
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '14px',
                fontFamily: FontName.RobotoRegular,
                color: '#828282',
              }}
            >
              {event?.eventDetail.eventData?.description ?? 'N/A'}
            </Typography>
          </Box>
          <Box>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '14px',
                fontFamily: FontName.RobotoBold,
                color: '#828282',

                mt: 2,
              }}
            >
              URL:
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                fontSize: '14px',
                fontFamily: FontName.RobotoRegular,
                color: '#24a9e2',
                maxWidth: '520px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              component={'a'}
              href={event.eventDetail?.eventData.url}
              target="_blank"
            >
              {(event.eventDetail?.eventData.url && event.eventDetail?.eventData.url.length > 65
                ? event.eventDetail?.eventData.url.slice(0, 65) + '...'
                : event.eventDetail?.eventData.url) ?? 'N/A'}
            </Typography>
          </Box>
          {isFestive && <Typography>{t('eventAndCalendar.titles.noIsAEvent')}</Typography>}
          <Box>
            {event.eventDetail.eventData?.files?.length > 0 &&
              event.eventDetail.eventData.files.map((file) => (
                <CardFiles file={file} key={file.id} />
              ))}
          </Box>
        </Box>
        {!isFestive && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CapitalIconButton
              title={t('general.toolTip.edit')}
              sx={{ color: '#31c462' }}
              onClick={() => {
                navigate(`${PathName.eventDescription}/${event.id}`)
              }}
            >
              {icons.edit}
            </CapitalIconButton>
            <CapitalIconButton
              title={t('general.toolTip.delete')}
              sx={{ color: '#f06363' }}
              onClick={() => setOpenModal(true)}
            >
              {icons.delete}
            </CapitalIconButton>
          </Box>
        )}
      </Box>
      <ConfirmationModal
        open={openModal}
        title={t('eventAndCalendar.titles.delete')}
        description={t('eventAndCalendar.titles.deleteEventMessage')}
        onClose={() => setOpenModal(false)}
        onConfirm={handleDelete}
      />
    </>
  )
}
