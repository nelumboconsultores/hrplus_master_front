import { Box, Paper, Typography } from '@mui/material'
import { RouterProvider } from '../router'
import { CompleteTabs } from 'core/components/tabs'
import { BreadCrumbsList, PathName } from 'core'
import { useTranslation } from 'react-i18next'
import { useContext, useMemo } from 'react'
import 'dayjs/locale/es'
import { EventConfigurationContext } from '../context'
import advancedFormat from 'dayjs/plugin/advancedFormat' // importa el plugin advancedFormat
import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'
import { styles } from './styles'

export const Layout: React.FC = () => {
  const { t } = useTranslation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const id = pathnames.find((x) => {
    const num = Number(x)
    return !isNaN(num)
  })
  dayjs.extend(advancedFormat) // usa el plugin advancedFormat
  dayjs.extend(localizedFormat) // usa el plugin localizedFormat
  dayjs.locale('es')
  const { eventCongReducer, routesValidations } = useContext(EventConfigurationContext)
  const { dataSubmit } = eventCongReducer
  const breadLinks = [
    PathName.EventsAndCalendar,
    id ? t('eventAndCalendar.titles.edit') : t('eventAndCalendar.titles.newEvent'),
  ]
  const listItems = useMemo(
    () => {
      return [
        {
          label: t('eventAndCalendar.tabs.description'),
          href: PathName.eventDescription + (id ? '/' + id : ''),
        },
        {
          label: t('eventAndCalendar.tabs.dateAndOccurrence'),
          href: PathName.eventDateAndOccurrence + (id ? '/' + id : ''),
          disabled: routesValidations.protectDateAndOccurrence,
        },
        {
          label: t('eventAndCalendar.tabs.guests'),
          href: PathName.eventGuests + (id ? '/' + id : ''),
          disabled: routesValidations.protectGuests,
        },
      ]
    },
    [eventCongReducer.dataSubmit], // eslint-disable-line
  )

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ marginBottom: '16px' }}>
        <BreadCrumbsList list={breadLinks} />
      </Box>

      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h1" sx={styles.date}>
          {dataSubmit?.dateFrom
            ? dayjs(dataSubmit.dateFrom).format('dddd D [de] MMMM [del] YYYY')
            : t('eventAndCalendar.titles.newEvent')}
        </Typography>
        {dataSubmit?.dateFrom && (
          <Typography variant="grayText">
            {id ? t('eventAndCalendar.titles.edit') : t('eventAndCalendar.titles.newEvent')}
          </Typography>
        )}
      </Box>
      <CompleteTabs list={listItems} />
      <Paper sx={{ padding: '16px 24px', height: 'calc( 100% - 156px )' }}>
        <RouterProvider />
      </Paper>
    </Box>
  )
}
