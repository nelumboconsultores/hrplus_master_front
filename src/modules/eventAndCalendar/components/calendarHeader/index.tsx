import { Box, Button, Grid, Typography, Select, MenuItem, FormControl } from '@mui/material'
import { styles } from './calendarHeaderStyles'
import { useContext, useEffect } from 'react'
import {
  BreadCrumbsList,
  DropdownColorComponent,
  FontName,
  GeneralTitle,
  PathName,
  typeRQ,
} from 'core'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material/Select'
import { CalendarType } from 'modules/eventAndCalendar/enum'
import { EventsAndCalendarContext } from 'modules/eventAndCalendar/context'
import { ServicesEnum } from 'modules/eventAndCalendar/enum/services.enum'
import { useForm, useWatch } from 'react-hook-form'

const CalendarHeader = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  /* use el fetchEvents con el eventTYpeId para hacer el filtro la data por evetos el carga todo automaticamente */
  const { setCalendarMode, calendarMode, fetchEvents } = useContext(EventsAndCalendarContext)
  const { control, setValue } = useForm()
  const eventTypeId = useWatch({ control, name: 'eventTypeId' })
  useEffect(() => {
    if (eventTypeId) fetchEvents(eventTypeId)
  }, [eventTypeId, fetchEvents])

  const handleClearFilters = () => {
    setValue('eventTypeId', undefined)
    fetchEvents(undefined)
  }
  const handleViewChange = (event: SelectChangeEvent) => {
    setCalendarMode(event.target.value as CalendarType)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BreadCrumbsList />
      </Grid>

      <Grid item container spacing={1} xs={12} justifyContent="space-between">
        <Grid item md={5.2} lg={6.5} alignContent={'center'}>
          <GeneralTitle>{t('eventAndCalendar.title')}</GeneralTitle>
          <Typography variant="grayText">{t('eventAndCalendar.settings')}</Typography>
        </Grid>
        <Grid item container spacing={2} md={6.8} lg={5.5} sx={styles.container}>
          <Grid item md={3.5} lg={3.5} sx={styles.gridBtn}>
            <Button
              onClick={handleClearFilters}
              variant="text"
              sx={{
                fontFamily: FontName.RobotoMedium,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
              }}
            >
              Limpiar Filtro
            </Button>
          </Grid>
          <Grid item md={3.5} lg={3.3}>
            <Typography sx={styles.filter}>{t('eventAndCalendar.titles.filter')}</Typography>

            <Box sx={{ width: '100%' }}>
              <DropdownColorComponent
                controlProps={{
                  name: 'eventTypeId',
                  control: control,
                }}
                services={{
                  getAll: {
                    path: ServicesEnum.getAll,
                    type: typeRQ.GET,
                  },
                  get: {
                    path: ServicesEnum.get,
                    type: typeRQ.GET,
                  },
                  create: {
                    path: ServicesEnum.create,
                    type: typeRQ.POST,
                  },
                  edit: {
                    path: ServicesEnum.edit,
                    type: typeRQ.PUT,
                  },
                  delete: {
                    path: ServicesEnum.delete,
                    type: typeRQ.DELETE,
                  },
                }}
              />
            </Box>
          </Grid>
          <Grid item md={3} lg={3.2}>
            <Typography sx={styles.filter}>{t('eventAndCalendar.titles.visualize')}</Typography>
            <FormControl fullWidth>
              <Select
                labelId="view-select-label"
                id="view-select"
                value={calendarMode}
                onChange={handleViewChange}
              >
                <MenuItem value={CalendarType.Year}>{t('eventAndCalendar.select.year')}</MenuItem>
                <MenuItem value={CalendarType.Month}>{t('eventAndCalendar.select.month')}</MenuItem>
                <MenuItem value={CalendarType.week}>{t('eventAndCalendar.select.week')}</MenuItem>
                <MenuItem value={CalendarType.Day}>{t('eventAndCalendar.select.day')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} lg={2} sx={styles.gridBtn}>
            <Button
              color="secondary"
              sx={{ height: '48px' }}
              onClick={() => {
                localStorage.removeItem('eventBody')
                navigate(PathName.eventDescription)
              }}
            >
              {'Nuevo'}
              {/*  {t('eventAndCalendar.button.newEvent')} */}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { CalendarHeader }
