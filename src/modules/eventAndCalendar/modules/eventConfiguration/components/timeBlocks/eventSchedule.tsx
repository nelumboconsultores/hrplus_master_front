import { Box, Typography } from '@mui/material'
import { InputAutocomplete, isInvalidTimeRange, militaryRank } from 'core'
import { useContext, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EventConfigurationContext } from '../../context'

export const EventSchedule = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()
  const { t } = useTranslation()
  const { id } = useParams()
  const {
    eventCongReducer: { idEvent },
  } = useContext(EventConfigurationContext)
  const valueFrom = useMemo(
    () => militaryRank.find((val) => val.value === watch('from')),
    [watch('from')], // eslint-disable-line
  )

  const valueTo = useMemo(
    () => militaryRank.find((val) => val.value === watch('to')),
    [watch('to')], // eslint-disable-line
  )
  return (
    <Box sx={{ mt: '12px' }}>
      <Typography variant="grayTitle">{t('eventAndCalendar.titles.eventSchedule')}</Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: '12px' }}>
        <InputAutocomplete
          value={valueFrom ?? ''}
          control={control}
          name="from"
          options={militaryRank}
          sx={{ width: '150px' }}
          label={t('eventAndCalendar.inputs.from')}
          errors={errors.from?.message as string}
          helpertext={errors.from?.message as string}
          disableClearable
          getOptionDisabled={(option) => {
            if (watch('to')) return isInvalidTimeRange(option.value.toString(), watch('to'))
            return false
          }}
          disabled={!!(idEvent || id)}
        />
        <InputAutocomplete
          value={valueTo ?? ''}
          control={control}
          name="to"
          options={militaryRank}
          sx={{ width: '150px' }}
          label={t('eventAndCalendar.inputs.to')}
          errors={errors.to?.message as string}
          helpertext={errors.to?.message as string}
          disableClearable
          getOptionDisabled={(option) => {
            if (watch('from')) return isInvalidTimeRange(watch('from'), option.value.toString())
            return false
          }}
          disabled={!!(idEvent || id)}
        />
      </Box>
    </Box>
  )
}
