import { Box, Chip, Typography } from '@mui/material'
import {
  CapitalIconButton,
  DayType,
  ErrorMessage,
  InputAutocomplete,
  WeekdayEntries,
  daysDisables,
  icons,
  isInvalidTimeRange,
  labelDays,
  militaryRank,
} from 'core'
import dayjs from 'dayjs'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getWeekdaysBetweenDates } from '../../utils'
import { useParams } from 'react-router-dom'
import { EventConfigurationContext } from '../../context'

export const DaysWeek: React.FC = () => {
  const {
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext()
  const { control: controlInside, watch: watchInside } = useForm()
  const { t } = useTranslation()
  const [daysActives, setDaysActives] = useState<DayType[]>(daysDisables)
  const { id } = useParams()
  const {
    eventCongReducer: { idEvent },
  } = useContext(EventConfigurationContext)

  const validateAdd = (): boolean => {
    if (watchInside('startsAt') && watchInside('endsAt') && watch('daysOfWeek')?.length > 0)
      return false
    else return true
  }

  const onAdd = () => {
    const days = watch('daysOfWeek')
    const hoursFrom = watchInside('startsAt')
    const hoursTo = watchInside('endsAt')
    const newEventDatePeriods = {
      daysOfWeek: days,
      startsAt: hoursFrom,
      endsAt: hoursTo,
    }
    clearErrors('eventDatePeriods')
    setValue('eventDatePeriods', [...(watch('eventDatePeriods') ?? []), newEventDatePeriods])
  }

  const onDeleteChips = (index: number) => {
    const eventDatePeriods = watch('eventDatePeriods')
    eventDatePeriods.splice(index, 1)
    setValue('eventDatePeriods', eventDatePeriods)
  }

  useEffect(() => {
    if (dayjs(watch('dateFrom')).isValid() && dayjs(watch('dateTo')).isValid()) {
      const dayAvailable = getWeekdaysBetweenDates(
        dayjs(watch('dateFrom'), 'DD/MM/YYYY'),
        dayjs(watch('dateTo'), 'DD/MM/YYYY'),
      )
      const days = daysDisables.map((day) => {
        if (dayAvailable.includes(day.value)) {
          return { ...day, disabled: false }
        }
        return day
      })
      setDaysActives(days)

      if (!idEvent) setValue('eventDatePeriods', [])
    }
  }, [watch('dateFrom'), watch('dateTo'), setValue]) // eslint-disable-line

  const valueFrom = useMemo(
    () => militaryRank.find((val) => val.value === watch('startsAt')),
    [watch('startsAt')], // eslint-disable-line
  )

  const valueTo = useMemo(
    () => militaryRank.find((val) => val.value === watch('endsAt')),
    [watch('endsAt')], // eslint-disable-line
  )
  return (
    <Box sx={{ mt: '12px' }}>
      <Typography variant="grayTitle">
        {t('eventAndCalendar.titles.indicateTimeBlocksThisEvent')}
      </Typography>
      {!(idEvent && !id) && (
        <Box sx={{ display: 'flex', gap: 2, mt: '12px', width: '100%' }}>
          <InputAutocomplete
            value={valueFrom}
            control={controlInside}
            name="startsAt"
            options={militaryRank}
            sx={{ width: '150px' }}
            label={t('eventAndCalendar.inputs.from')}
            disableClearable
            errors={errors.startsAt?.message as string}
            helpertext={errors.startsAt?.message as string}
            getOptionDisabled={(option) => {
              if (watchInside('endsAt'))
                return isInvalidTimeRange(option.value.toString(), watchInside('endsAt'))
              return false
            }}
            disabled={!!(idEvent && !id)}
          />
          <InputAutocomplete
            control={controlInside}
            value={valueTo}
            name="endsAt"
            options={militaryRank}
            sx={{ width: '150px' }}
            errors={errors.endsAt?.message as string}
            helpertext={errors.endsAt?.message as string}
            label={t('eventAndCalendar.inputs.to')}
            disableClearable
            getOptionDisabled={(option) => {
              if (watchInside('startsAt'))
                return isInvalidTimeRange(watchInside('startsAt'), option.value.toString())
              return false
            }}
            disabled={!!(idEvent && !id)}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '12px',
              width: '100%',
              maxWidth: '580px',
            }}
          >
            <WeekdayEntries days={daysActives} name="daysOfWeek" />
            <CapitalIconButton
              title={t('general.toolTip.add')}
              color="primary"
              disabled={validateAdd() || !!(idEvent && !id)}
              onClick={onAdd}
              sx={{
                '& svg': {
                  width: '45px',
                  height: '45px',
                },
              }}
            >
              {icons.add}
            </CapitalIconButton>
          </Box>
        </Box>
      )}
      <ErrorMessage message={errors?.eventDatePeriods?.message as string} />
      <Box
        sx={{
          width: '100%',
          marginTop: '16px',
          '& .MuiChip-root': {
            color: 'white',
            '& .MuiChip-deleteIcon': {
              color: 'white',
            },
          },
        }}
      >
        {watch('eventDatePeriods')?.map(
          (
            item: { daysOfWeek: Array<number>; startsAt: string; endsAt: string },
            index: number,
          ) => {
            const days = item?.daysOfWeek?.map((val) => labelDays[val])?.join(', ')
            return (
              <Chip
                sx={{ marginRight: '4px', marginTop: '4px' }}
                key={index}
                label={days + ' - ' + item.startsAt + ' - ' + item.endsAt}
                color="primary"
                onDelete={idEvent ? undefined : () => onDeleteChips(index)}
              />
            )
          },
        )}
      </Box>
    </Box>
  )
}
