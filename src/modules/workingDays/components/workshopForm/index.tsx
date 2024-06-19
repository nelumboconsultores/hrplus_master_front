import { Box, Grid } from '@mui/material'
import { ListTimeBlocks } from './listTimeBlocks'
import { Form } from './form'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { formatDays, useSchemaConfiguration } from 'modules/workingDays/utils'
import {
  TypeOfDayEnum,
  durationValues,
  getWorkDayMaxTime,
  getWorkPeriodMaxTime,
  getWorkPeriodMaxTimeDay,
} from 'modules/workingDays/enums'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  AppContext,
  ConfirmationModal,
  PathName,
  Variant,
  WorkTurnsItemType,
  WorkTurnsType,
  WorkTurnsTypeGeneral,
  diferenceInHours,
} from 'core'
import { styles } from './styles'
import { LoadingButton } from '@mui/lab'
import { createWorkPeriod, getWorkPeriod, updateWorkPeriod } from 'core/services'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Spinner from 'core/components/spinner'

export const WorkshopForm = () => {
  const date = new Date()
  const { schema } = useSchemaConfiguration()
  const { id } = useParams()
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [listJourney, setListJourney] = useState<WorkTurnsTypeGeneral | undefined>()
  const [showAlertTime, setShowAlertTime] = useState(false)
  const [showAlertTimeDay, setShowAlertTimeDay] = useState(false)
  const [oldMaxDuration, setOldMaxDuration] = useState<number | string>()
  const [oldMaxDurationDay, setOldMaxDurationDay] = useState<number | string>()
  const navigate = useNavigate()
  type SchemaType = z.infer<typeof schema>
  const onSubmit = (data: SchemaType) => {
    const isFixedHours = data.workPeriodTypeId === TypeOfDayEnum.FixedHours

    const newListJourney = {
      id: date.getTime().toString(),
      dateFrom: isFixedHours ? data.dateFrom : '',
      dateTo: isFixedHours ? data.dateTo : '',
      dayOfWeek: data.dayOfWeek,
      workTurnTypeId: data.workTurnTypeId,
      durationId: isFixedHours ? 0 : data.durationId,
    }

    if (validateWorkDayDuration(newListJourney) && validateWorkPeriodDuration(newListJourney)) {
      setListJourney((prevListJourney) => [...(prevListJourney ?? []), newListJourney])
    }
  }
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      workPeriodTypeId: TypeOfDayEnum.FixedHours,
      dayOfWeek: [],
    },
  })

  const { workDayMaxTime, workPeriodMaxTime } = useMemo(() => {
    const workDayMaxTime = getWorkDayMaxTime(methods.getValues('workPeriodMaxDailyDurationId'))
    const workPeriodMaxTime = getWorkPeriodMaxTime(methods.getValues('workPeriodMaxDurationId'))

    return { workDayMaxTime, workPeriodMaxTime }
  }, [methods.watch('workPeriodMaxDurationId'), methods.watch('workPeriodMaxDailyDurationId')]) // eslint-disable-line

  const accumulatedLaboralTime = useMemo(() => {
    if (listJourney) {
      const count = listJourney.reduce((acc, item) => {
        if (item.dateFrom && item.dateTo && item.workTurnTypeId === 1) {
          return acc + diferenceInHours(item.dateFrom, item.dateTo, item.dayOfWeek.length)
        } else if (item.durationId && item.workTurnTypeId === 1) {
          return acc + durationValues[item.durationId] * item.dayOfWeek.length
        }
        return acc
      }, 0)
      return Number(count.toFixed(0))
    }
    return 0
  }, [listJourney])

  const validateWorkPeriodDuration = (
    newPeriod?: WorkTurnsItemType,
    newWorkPeriodMaxTime?: number,
  ): boolean => {
    let newPeriodTime = 0
    if (methods.getValues('workPeriodTypeId') === TypeOfDayEnum.ShiftsVariable && newPeriod) {
      newPeriodTime = durationValues[newPeriod?.durationId ?? 0] * newPeriod?.dayOfWeek.length
    } else if (newPeriod) {
      newPeriodTime = diferenceInHours(
        newPeriod?.dateFrom,
        newPeriod?.dateTo,
        newPeriod?.dayOfWeek.length,
      )
      if (newPeriod.workTurnTypeId !== 1) newPeriodTime = 0
    }

    const totalAccumulatedLaboralTime = accumulatedLaboralTime + newPeriodTime
    const currentPeriodMaxTime = newWorkPeriodMaxTime ?? workPeriodMaxTime ?? 0

    if (currentPeriodMaxTime && totalAccumulatedLaboralTime > currentPeriodMaxTime) {
      if (totalAccumulatedLaboralTime > 48) {
        methods.setError('workPeriodMaxDurationId', {
          message: t('validations.workPeriodsDurationError'),
          type: 'onChange',
        })
      } else {
        methods.setError('workPeriodMaxDurationId', {
          message: t('validations.workPeriodsMaxDurationError'),
          type: 'onChange',
        })
      }

      return false
    }
    return true
  }

  const validateWorkDayDuration = (newPeriod: WorkTurnsItemType): boolean => {
    const newPeriodRange = diferenceInHours(newPeriod.dateFrom, newPeriod.dateTo) ?? 0
    if (methods.getValues('workPeriodTypeId') === TypeOfDayEnum.ShiftsVariable) return true
    if (workDayMaxTime && newPeriodRange > workDayMaxTime && newPeriod.workTurnTypeId === 1) {
      methods.setError('workPeriodMaxDailyDurationId', {
        message: t('validations.workPeriodsMaxDurationError'),
        type: 'onChange',
      })
      return false
    }
    return true
  }

  const handleChangeMaxDuration = (maxTime: number | string) => {
    const newWorkPeriodMaxTimeId = typeof maxTime === 'string' ? parseInt(maxTime) : maxTime
    const maxTimeNumber = getWorkPeriodMaxTime(newWorkPeriodMaxTimeId) ?? 0
    const oldTime = methods.getValues('workPeriodMaxDurationId')
    setOldMaxDuration(oldTime ?? 0)
    if (listJourney && !validateWorkPeriodDuration(undefined, maxTimeNumber)) {
      setShowAlertTime(true)
    }
  }
  const handleChangeMaxDurationDay = (maxTime: number | string) => {
    if (listJourney) {
      listJourney.forEach((journey) => {
        const newPeriodTime = diferenceInHours(journey.dateFrom, journey.dateTo) ?? 0
        const oldTime = methods.getValues('workPeriodMaxDailyDurationId')
        setOldMaxDurationDay(oldTime)
        const newWorkPeriodMaxTimeId = typeof maxTime === 'string' ? parseInt(maxTime) : maxTime
        const maxTimeNumber = getWorkPeriodMaxTimeDay(newWorkPeriodMaxTimeId) ?? 0
        if (newPeriodTime > maxTimeNumber && journey.workTurnTypeId === 1) {
          setShowAlertTimeDay(true)
        }
      })
    }
  }

  const handleCancelChangeMaxDuration = () => {
    methods.setValue('workPeriodMaxDurationId', oldMaxDuration as number)
  }
  const handleCancelChangeMaxDurationDay = () => {
    methods.setValue('workPeriodMaxDailyDurationId', oldMaxDurationDay as number)
  }
  const handleConfirmChangeMaxDuration = () => {
    setListJourney([])
    setShowAlertTime(false)
    setShowAlertTimeDay(false)
  }
  const createJourney = async () => {
    if (!methods.getValues('name')) {
      methods.setError('name', { message: t('validations.nameIsRequired'), type: 'onChange' })
      return
    }
    setLoading(true)

    const newWorkTurns: WorkTurnsType = []
    listJourney?.forEach((item) => {
      item.dayOfWeek.forEach((day) => {
        const newItem = {
          dateFrom: item.dateFrom,
          dateTo: item.dateTo,
          dayOfWeek: day,
          workTurnTypeId: item.workTurnTypeId,
          durationId: item.durationId,
        }

        newWorkTurns.push(newItem)
      })
    })
    const body = {
      name: methods.getValues('name') ?? '',
      workPeriodTypeId: methods.getValues('workPeriodTypeId'),
      workTurns: newWorkTurns ?? [],
      workPeriodMaxDurationId: methods.getValues('workPeriodMaxDurationId'),
      workPeriodMaxDailyDurationId: methods.getValues('workPeriodMaxDailyDurationId'),
    }

    const response = id ? await updateWorkPeriod(body, id) : await createWorkPeriod(body)

    if (response?.data) {
      navigate(PathName.WorkingDays)
      setActMessage({
        message: id ? t('workingDays.snackbar.update') : t('workingDays.snackbar.create'),
        type: Variant.success,
      })
    } else if (response?.error) {
      setActMessage({
        message: response?.error?.errors?.fields[0].toLowerCase().includes('workperiod')
          ? t('workingDays.error.workPeriod')
          : t('workingDays.error.workTurn'),
        type: Variant.error,
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (id) dataFull()
  }, []) // eslint-disable-line

  const dataFull = async () => {
    if (id) {
      const response = await getWorkPeriod(id)
      if (response?.data?.data)
        methods.reset({
          name: response?.data?.data.workPeriod.name,
          workPeriodTypeId: response?.data?.data.workPeriod.workPeriodType.id,
          workPeriodMaxDurationId: response?.data?.data.workPeriod.workPeriodMaxDuration?.id,
          workPeriodMaxDailyDurationId:
            response?.data?.data.workPeriod.workPeriodMaxDailyDuration?.id,
        })
      setListJourney(formatDays(response?.data?.data.workTurns ?? []))
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={styles.form as React.CSSProperties}>
        {(id && methods.watch('name')) || !id ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <Form
                  validateMaxTime={handleChangeMaxDuration}
                  validateMaxTimeDay={handleChangeMaxDurationDay}
                  accumulatedLaboralTime={accumulatedLaboralTime}
                />
              </Grid>
              <Grid item xs={5}>
                <ListTimeBlocks list={listJourney} setBody={setListJourney} />
              </Grid>
            </Grid>
            <LoadingButton
              variant="contained"
              color="secondary"
              sx={styles.buttonEnd}
              disabled={!listJourney || listJourney.length === 0}
              loading={loading}
              onClick={createJourney}
            >
              {t('workingDays.button.finish')}
            </LoadingButton>
          </>
        ) : (
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        )}
      </form>
      <ConfirmationModal
        open={showAlertTime || showAlertTimeDay}
        description={
          showAlertTime
            ? t('workingDays.error.workPeriodsMaxDurationMaxDurationAlert')
            : t('workingDays.error.workPeriodsMaxDurationMaxDurationDayAlert')
        }
        onClose={() => (showAlertTime ? setShowAlertTime(false) : setShowAlertTimeDay(false))}
        onConfirm={handleConfirmChangeMaxDuration}
        onCancel={showAlertTime ? handleCancelChangeMaxDuration : handleCancelChangeMaxDurationDay}
        disableClose
      />
    </FormProvider>
  )
}
