import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { TimeBlocks, TimeConfiguration } from '../../components'
import { useSchemaEntity } from '../../hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { periodicityEnum } from '../../enums'
import { useTranslation } from 'react-i18next'
import { Box, Button } from '@mui/material'
import { createBodyForm } from '../../utils'
import dayjs from 'dayjs'
import { createEvent } from 'modules/eventAndCalendar/service'
import { useContext, useEffect, useState } from 'react'
import { AppContext, PathName, Variant } from 'core'
import { useNavigate, useParams } from 'react-router-dom'
import { styles } from './styles'
import { EventConfigurationContext } from '../../context'
import { ActionTypes } from '../../enums/formReducer'
import { errorCodes } from 'core/locale/es/errorCodes'

export const DateAndOccurrence: React.FC = () => {
  const [disableButton, setDisableButton] = useState<boolean>(false)
  const { schema } = useSchemaEntity()
  const { id } = useParams()
  const { t } = useTranslation()
  const navigation = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const { eventCongReducer, eventCongDispatch } = useContext(EventConfigurationContext)
  const { dataSubmit, idEvent } = eventCongReducer
  const methods = useForm<FieldValues>({
    defaultValues: {
      periodicity: periodicityEnum.single,
    },
    resolver: zodResolver(schema),
  })
  const { handleSubmit, reset } = methods
  const onSubmit = async (data: FieldValues) => {
    if (!data) return

    /*     if (data?.dateFrom && data?.dateTo) {
      const daysUses = getWeekdaysBetweenDates(
        dayjs(data.dateFrom, 'DD/MM/YYYY'),
        dayjs(data.dateTo, 'DD/MM/YYYY'),
      )
      const isComplete = daysUses?.map(
        (day) =>
          data?.eventDatePeriods?.some(
            (period: { daysOfWeek: number[] }) => period?.daysOfWeek?.includes(day),
          ),
      )
      if (!isComplete.every((val) => val)) {
        setError('eventDatePeriods', { message: t('eventAndCalendar.errors.allDaysIncluded') })
        return
      } else clearErrors('eventDatePeriods')
    } */

    const body = { ...createBodyForm(data), ...eventCongReducer.dataSubmit }
    if (!body) return
    setDisableButton(true)
    const response = await createEvent(body)
    setDisableButton(false)
    if (response.data) {
      setActMessage({
        message: t('eventAndCalendar.success.newEvent'),
        type: Variant.success,
      })
      eventCongDispatch({
        payload: response.data.data.eventDate.id,
        type: ActionTypes.SET_EVENT_ID,
      })
      eventCongDispatch({
        payload: { ...response.data, ...body },
        type: ActionTypes.SET_DATA_SUBMIT,
      })
      navigation(dataSubmit?.global ? PathName.EventsAndCalendar : PathName.eventGuests)
    }
    if (response?.error) {
      if (response.error?.errors?.code) {
        const errorCode = errorCodes[(response.error?.errors.code ?? '') as keyof typeof errorCodes]
        setActMessage({
          message: errorCode,
          type: Variant.error,
        })
      } else {
        setActMessage({
          message: t('general.validations.errorService'),
          type: Variant.error,
        })
      }
    }
  }
  useEffect(() => {
    if (eventCongReducer.dataSubmit) {
      reset({
        periodicity: dataSubmit?.periodicityId ?? periodicityEnum.single,
        date: dayjs(dataSubmit?.dateFrom, 'YYYY-MM-DD'),
        dateFrom: dayjs(dataSubmit?.dateFrom, 'YYYY-MM-DD'),
        dateTo: dayjs(dataSubmit?.dateTo, 'YYYY-MM-DD'),
        reminder: dataSubmit?.minsReminder,
        from: dataSubmit?.eventDatePeriods?.[0]?.startsAt,
        to: dataSubmit?.eventDatePeriods?.[0]?.endsAt,
        eventDatePeriods: dataSubmit?.eventDatePeriods,
      })
    } else {
      reset()
    }
  }, [eventCongReducer.dataSubmit]) // eslint-disable-line
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form as object}>
        <Box>
          <TimeConfiguration />
          <TimeBlocks />
        </Box>

        {!id ? (
          <Button
            type="submit"
            color="secondary"
            sx={{ alignSelf: 'flex-end', marginTop: '16px' }}
            disabled={(!!idEvent && !id) || disableButton}
          >
            {t('general.button.continue')}
          </Button>
        ) : (
          <Button
            onClick={() => navigation(`${PathName.eventGuests}/${id}`)}
            color="secondary"
            sx={{ alignSelf: 'flex-end', marginTop: '16px' }}
          >
            {t('general.button.continue')}
          </Button>
        )}
      </form>
    </FormProvider>
  )
}
