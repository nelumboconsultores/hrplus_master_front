import { Box, Typography } from '@mui/material'
import { BaseModal } from 'core'
import dayjs from 'dayjs'
import { useEventCalendarContext } from 'modules/eventAndCalendar/hooks'
import { useEventDetailModalStyles } from './eventDetailModalStyles'
import { useTranslation } from 'react-i18next'

const EventDetailModal = () => {
  const { modal, closeModal } = useEventCalendarContext()
  const { t } = useTranslation()
  const styles = useEventDetailModalStyles()

  return (
    <BaseModal
      open={modal.open}
      width={400}
      onClose={() => {
        closeModal()
      }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Typography sx={styles.title}>
            {t('eventAndCalendar.programedEvents').replace(
              '{date}',
              dayjs(modal.date).locale('es').format('DD [de] MMM [del] YYYY'),
            )}
          </Typography>
        </Box>
        <Box sx={styles.containerItems}>
          {!!modal.data?.length &&
            modal.data?.map((event) => (
              <Box sx={styles.eventItem} key={event.id}>
                {!!event.eventsDetail?.length &&
                  event.eventsDetail.map((detail) => (
                    <Typography sx={styles.itemTitle} key={detail?.id}>
                      {detail.data?.name}
                    </Typography>
                  ))}

                {!!event.description && (
                  <Typography variant="grayText" sx={styles.description}>
                    {event.description}
                  </Typography>
                )}

                <Box sx={styles.footer}>
                  <Typography sx={styles.detailDate} color="Highlight">
                    {t('eventAndCalendar.rangeDate')
                      .replace('{start}', dayjs(event.dates.start).locale('es').format('h:mm:ss A'))
                      .replace('{end}', dayjs(event.dates.end).locale('es').format('h:mm:ss A'))}
                  </Typography>
                </Box>
              </Box>
            ))}

          {!modal.data?.length && (
            <Typography sx={styles.noData}>{t('eventAndCalendar.anyOneEventWasFound')}</Typography>
          )}
        </Box>
      </Box>
    </BaseModal>
  )
}

export { EventDetailModal }
