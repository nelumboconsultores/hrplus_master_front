import { Button, Grid, Tooltip } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { LeftSide, RightSide, fileArray } from '../../components'
import { useTranslation } from 'react-i18next'
import { AppContext, PathName, SwitchIOS, Variant, useValidations } from 'core'
import { object, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBodyForm, editBodyEvent } from '../../utils'
import { Info } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { EventConfigurationContext } from '../../context'
import { ActionTypes } from '../../enums/formReducer'
import { styles } from './styles'
import { editEvent } from 'modules/eventAndCalendar/service'
import Spinner from 'core/components/spinner'
import { sleep } from 'core/utils/sleep'
import { errorCodes } from 'core/locale/es/errorCodes'
type FormData = {
  name: string
  description: string
  url: string
  files: fileArray[]
  global: boolean
  eventTypeId: number
}
export const Description: React.FC = () => {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const { val } = useValidations()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { open, setActMessage } = useContext(AppContext)
  const { eventCongDispatch, eventCongReducer } = useContext(EventConfigurationContext)
  const { dataSubmit, idEvent } = eventCongReducer
  const schema = z.object({
    name: z
      .string({ required_error: t('eventAndCalendar.errors.nameIsRequired') })
      .min(1, { message: t('eventAndCalendar.errors.nameIsRequired') }),
    description: val.docDesOptional,
    url: z
      .string()
      .optional()
      .nullable()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: t('validations.invalidUrl'),
      }),
    files: z
      .array(
        object({
          name: val.nameRequired,
          description: z.string().optional().nullable(),
          url: z.string().optional().nullable(),
          id: z.number().optional().nullable(),
        }),
      )
      .min(1, { message: t('eventAndCalendar.errors.files') }),
    global: z.boolean().optional().nullable(),
    eventTypeId: z
      .number({ required_error: t('eventAndCalendar.errors.eventType') })
      .min(1, { message: t('eventAndCalendar.errors.eventType') }),
  })
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { files: [], global: false },
  })
  const { handleSubmit, register, watch } = methods
  const onSubmit = async (data: FormData) => {
    if (!data) return
    const body = createBodyForm(data)
    if (!body) return
    let response
    if (idEvent) {
      const editBody = editBodyEvent({
        ...body,
        eventDatePeriods: dataSubmit?.eventDatePeriods,
        dateFrom: dataSubmit?.dateFrom,
        dateTo: dataSubmit?.dateTo,
      })
      response = await editEvent(editBody, idEvent)
    }

    if (!idEvent || (response && response.data)) {
      eventCongDispatch({
        type: ActionTypes.SET_DATA_SUBMIT,
        payload: { ...eventCongReducer.dataSubmit, ...body },
      })
      if (response && response.data)
        setActMessage({
          message: t('eventAndCalendar.success.editEvent'),
          type: Variant.success,
        })
      navigate(
        idEvent ? `${PathName.eventDateAndOccurrence}/${id}` : PathName.eventDateAndOccurrence,
      )
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
    if (dataSubmit) {
      methods.reset({
        description: dataSubmit?.eventData?.description,
        name: dataSubmit?.eventData?.name,
        url: dataSubmit?.eventData?.url,
        files: dataSubmit?.eventData?.files,
        global: dataSubmit?.global,
        eventTypeId: dataSubmit?.eventTypeId,
      })
    }
    if (!dataSubmit) methods.reset()
    if (id) eventCongDispatch({ type: ActionTypes.SET_EVENT_ID, payload: Number(id) })
    sleep(1000).then(() => setIsLoad(true))
  }, [dataSubmit]) // eslint-disable-line

  if (!isLoad) return <Spinner />
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form as object}>
        <Grid container spacing={2}>
          <Grid xs={12} item sx={styles.gridSwitch}>
            <Tooltip title={t('eventAndCalendar.inputs.placeHolder.global')}>
              <Info fontSize="small" color="disabled" />
            </Tooltip>

            <SwitchIOS
              {...register('global')}
              label={t('eventAndCalendar.inputs.global')}
              labelPlacement="start"
              checked={watch('global')}
              disabled={!!idEvent}
            />
          </Grid>
          <Grid xs={open ? 12 : 7} item>
            <LeftSide />
          </Grid>
          <Grid xs={open ? 12 : 5} item>
            <RightSide />
          </Grid>
        </Grid>
        <Button
          type="submit"
          disabled={!!idEvent && !id}
          color={'secondary'}
          sx={{ alignSelf: 'flex-end', marginTop: '16px' }}
        >
          {t('general.button.continue')}
        </Button>
      </form>
    </FormProvider>
  )
}
