import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { Grid, Typography } from '@mui/material'

import {
  InputAutocomplete,
  InputRoot,
  ItemsSelectType,
  TemplatePaper,
  WeekdayEntries,
  days,
  getAutocompleteValue,
} from 'core'
import {
  getDailyPeriodsMaxDuration,
  getWorkPeriodMaxDuration,
  getWorkPeriodType,
} from 'core/services'

import {
  TypeOfDayEnum,
  WorkDayMaxDurationsLabels,
  WorkPeriodMaxDurationsLabels,
  typeOfDay,
} from 'modules/workingDays/enums'
import { FixHrComponent } from './changingParts/fixedHours'
import { ShiftsVarComponent } from './changingParts/shiftsVariable'
import { styles } from './styles'

type FormProps = {
  validateMaxTime: (timeId: number | string) => void
  validateMaxTimeDay: (timeId: number | string) => void
  accumulatedLaboralTime?: number
}
export const Form: React.FC<FormProps> = ({
  validateMaxTime,
  validateMaxTimeDay,
  accumulatedLaboralTime,
}) => {
  const { t } = useTranslation()
  const [typeWorkingDays, setTypeWorkingDays] = useState<ItemsSelectType[]>([])
  const [timeOptions, setTimeOptions] = useState<{
    weekDuration: ItemsSelectType[]
    dayDuration: ItemsSelectType[]
  }>({ weekDuration: [], dayDuration: [] })
  const {
    control,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext()

  const loadLists = async () => {
    const response = await getWorkPeriodType()
    const weekTimeoptions = await getWorkPeriodMaxDuration()
    const dayTimeoptions = await getDailyPeriodsMaxDuration()

    setTypeWorkingDays(
      response?.data?.map((item) => ({ label: typeOfDay[item.id], value: item.id })) ?? [],
    )
    setTimeOptions({
      weekDuration:
        weekTimeoptions?.data?.map((item) => ({
          label: WorkPeriodMaxDurationsLabels.get(item.keyword) ?? '',
          value: item.id,
        })) ?? [],
      dayDuration:
        dayTimeoptions?.data?.map((item) => ({
          label: WorkDayMaxDurationsLabels.get(item.keyword) ?? '',
          value: item.id,
        })) ?? [],
    })
  }

  useEffect(() => {
    loadLists()
  }, [])

  const selectedValues = useMemo(
    () => typeWorkingDays.find((v) => v.value === watch('workPeriodTypeId')),
    [typeWorkingDays, watch('workPeriodTypeId')], //eslint-disable-line
  )
  return (
    <TemplatePaper title={t('workingDays.title.workDayShift')} sx={styles.templete}>
      <Typography variant="grayText">{t('workingDays.subtitle.workDayShift')}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputRoot
            {...register('name')}
            label={t('workingDays.label.workDayShift')}
            sx={{ maxWidth: '500px' }}
            inputProps={{ maxLength: 75 }}
            helperText={errors.name?.message as string}
            error={!!errors.name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputAutocomplete
            disableClearable
            value={
              getAutocompleteValue(watch('workPeriodMaxDurationId'), timeOptions.weekDuration) ??
              null
            }
            options={timeOptions.weekDuration}
            control={control}
            name="workPeriodMaxDurationId"
            label={t('workingDays.label.workPeriodMaxTime')}
            sx={{ maxWidth: '500px' }}
            helpertext={errors.workPeriodMaxDurationId?.message as string}
            errors={errors.workPeriodMaxDurationId?.toString()}
            onChange={(_, v) => validateMaxTime((v as ItemsSelectType).value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputAutocomplete
            disableClearable
            value={selectedValues ?? null}
            options={typeWorkingDays}
            loading={typeWorkingDays.length === 0}
            control={control}
            name="workPeriodTypeId"
            label={t('workingDays.label.workDayShiftType')}
            sx={{ maxWidth: '500px' }}
            helpertext={errors.workPeriodTypeId?.message as string}
            errors={errors.workPeriodTypeId?.toString()}
            onChange={(_, v) => {
              const value = v as ItemsSelectType
              if (value.value === TypeOfDayEnum.ShiftsVariable) {
                setValue('workPeriodMaxDailyDurationId', null)
              }
            }}
          />
        </Grid>
        {watch('workPeriodTypeId') === TypeOfDayEnum.FixedHours && (
          <Grid item xs={12} sm={6}>
            <InputAutocomplete
              disableClearable
              value={
                getAutocompleteValue(
                  watch('workPeriodMaxDailyDurationId'),
                  timeOptions.dayDuration,
                ) ?? null
              }
              options={timeOptions.dayDuration}
              control={control}
              name="workPeriodMaxDailyDurationId"
              label={t('workingDays.label.workDayMaxTime')}
              sx={{ maxWidth: '500px' }}
              helpertext={errors.workPeriodMaxDailyDurationId?.message as string}
              errors={errors.workPeriodMaxDailyDurationId?.toString()}
              onChange={(_, v) => validateMaxTimeDay((v as ItemsSelectType).value)}
            />
          </Grid>
        )}
      </Grid>

      <Typography variant="grayTitle">{t('workingDays.title.selectTheWorking')}</Typography>
      <WeekdayEntries days={days} name="dayOfWeek" />

      <Typography variant="grayTitle">{t('workingDays.title.indicateTheTime')}</Typography>

      {watch('workPeriodTypeId') === TypeOfDayEnum.FixedHours && <FixHrComponent />}
      {watch('workPeriodTypeId') === TypeOfDayEnum.ShiftsVariable && <ShiftsVarComponent />}
      {!!accumulatedLaboralTime && (
        <Typography variant="body1" color="grey" sx={styles.hoursTotal}>
          Horas acumuladas: {accumulatedLaboralTime} horas
        </Typography>
      )}
    </TemplatePaper>
  )
}
