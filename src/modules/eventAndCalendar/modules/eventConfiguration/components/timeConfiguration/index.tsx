import { Grid } from '@mui/material'
import { InputAutocomplete, InputDate, InputRange, ItemsSelectType } from 'core'
import { useFormContext } from 'react-hook-form'
import { listPeriodicity, listReminder, periodicityEnum } from '../../enums'
import { useTranslation } from 'react-i18next'
import { useContext, useMemo } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom'
import { EventConfigurationContext } from '../../context'
import { WarningModal } from '../warningModal'

export const TimeConfiguration: React.FC = () => {
  const {
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useFormContext()
  const { id } = useParams()
  const {
    eventCongReducer: { idEvent },
    setOpenModal,
    openModal,
  } = useContext(EventConfigurationContext)
  const { t } = useTranslation()
  const changePeriodicity = (
    _: React.SyntheticEvent<Element, Event>,
    e: NonNullable<string | ItemsSelectType> | (string | ItemsSelectType)[] | null,
  ) => {
    const isExist =
      dayjs(watch('date'), 'DD/MM/YYYY')?.isValid() ||
      watch('dateFrom')?.isValid() ||
      watch('dateTo')?.isValid() ||
      watch('reminder') ||
      watch('from') ||
      watch('to') ||
      (watch('eventDatePeriods') && watch('eventDatePeriods')?.length > 0)

    if (isExist) setOpenModal({ id: (e as ItemsSelectType)?.value as number, typeChange: true })
    else {
      setValue('periodicity', (e as ItemsSelectType)?.value as number)
      reset({
        periodicity: (e as ItemsSelectType)?.value as number,
        date: null,
        dateFrom: null,
        dateTo: null,
        reminder: null,
        from: null,
        to: null,
        eventDatePeriods: [],
      })
    }
  }
  const onConfirmen = () => {
    setOpenModal(undefined)
    reset({
      periodicity: openModal?.id,
      date: null,
      dateFrom: null,
      dateTo: null,
      reminder: null,
      from: null,
      to: null,
      eventDatePeriods: [],
    })
  }
  const onCancel = () => setOpenModal(undefined)

  const valuePeriodicity = useMemo(
    () => listPeriodicity.find((item) => item.value === watch('periodicity')),
    [watch('periodicity')], // eslint-disable-line
  )

  const valueReminder = useMemo(
    () => listReminder.find((item) => item.value === watch('reminder')),
    [watch('reminder')], // eslint-disable-line
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <InputAutocomplete
          control={control}
          options={listPeriodicity}
          label={t('eventAndCalendar.inputs.periodicity')}
          value={valuePeriodicity}
          errors={errors.periodicity?.message as string}
          helpertext={errors.periodicity?.message as string}
          disableClearable
          disabled={!!(idEvent || id)}
          onChange={changePeriodicity}
        />
      </Grid>
      {watch('periodicity') === periodicityEnum.single && (
        <Grid item xs={4}>
          <InputDate
            name="date"
            label={t('eventAndCalendar.inputs.date')}
            error={!!errors.date}
            helpertext={errors.date?.message as string}
            value={
              watch('date') && dayjs(watch('date'), 'YYYY-MM-DD').isValid()
                ? dayjs(watch('date'), 'YYYY-MM-DD')
                : undefined
            }
            minDate={dayjs()}
            disabled={!!(idEvent || id)}
          />
        </Grid>
      )}
      {watch('periodicity') === periodicityEnum.repetitive && (
        <Grid item xs={8}>
          <InputRange
            fromProp={{
              gridProps: { xs: 6 },
              sx: { width: '100%' },
              name: 'dateFrom',
              minDate: dayjs('1990-01-01', 'YYYY-MM-DD') as Dayjs & Date,
              error: !!errors.dateFrom,
              helperText: errors.dateFrom?.message as string,
              value: watch('dateFrom') ?? null,
              disabled: !!(idEvent || id),
            }}
            toProp={{
              gridProps: { xs: 6 },
              sx: { width: '100%' },
              name: 'dateTo',
              error: !!errors.dateTo,
              helperText: errors.dateTo?.message as string,
              value: watch('dateTo') ?? null,
              disabled: !!(idEvent || id),
            }}
          />
        </Grid>
      )}
      <Grid item xs={4}>
        <InputAutocomplete
          control={control}
          options={listReminder}
          label={t('eventAndCalendar.inputs.sendReminder')}
          name="reminder"
          errors={errors.reminder?.message as string}
          helpertext={errors.reminder?.message as string}
          disableClearable
          value={valueReminder ?? ''}
          disabled={!!(idEvent || id)}
        />
      </Grid>
      <WarningModal
        open={!!openModal}
        onClose={() => setOpenModal(undefined)}
        onConfirmen={onConfirmen}
        onCancel={onCancel}
      />
    </Grid>
  )
}
