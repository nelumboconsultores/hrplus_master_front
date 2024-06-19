import { Box } from '@mui/material'
import { DropdownColorComponent, InputRoot, typeRQ } from 'core'
import { ServicesEnum } from 'modules/eventAndCalendar/enum/services.enum'
import { useContext, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { EventConfigurationContext } from '../../context'
import { useParams } from 'react-router-dom'

export const LeftSide: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { eventCongReducer } = useContext(EventConfigurationContext)
  const { idEvent } = eventCongReducer
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext()

  const valueEventTypeId = useMemo(() => watch('eventTypeId'), [watch('eventTypeId')]) // eslint-disable-line
  const handleEventTypeChange = (value: number) => {
    setValue('eventTypeId', value)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <InputRoot
        {...register('name')}
        label={t('eventAndCalendar.inputs.eventName') + ' *'}
        placeholder={t('eventAndCalendar.inputs.placeHolder.eventName')}
        error={!!errors.name}
        inputProps={{ maxLength: 100 }}
        helperText={
          watch('name')?.length === 100
            ? 'El límite máximo es de 100 caracteres'
            : (errors.name?.message as string)
        }
        disabled={!!(idEvent && !id)}
        value={watch('name')}
      />
      <InputRoot
        {...register('description')}
        label={t('eventAndCalendar.inputs.eventDescription')}
        placeholder={t('eventAndCalendar.inputs.placeHolder.eventDescription')}
        error={!!errors.description}
        helperText={
          watch('description')?.length === 250
            ? 'El límite máximo es de 250 caracteres'
            : (errors.description?.message as string)
        }
        inputProps={{ maxLength: 250 }}
        multiline
        rows={8}
        disabled={!!(idEvent && !id)}
        value={watch('description')}
      />
      <InputRoot
        {...register('url')}
        label={t('eventAndCalendar.inputs.url')}
        placeholder={t('eventAndCalendar.inputs.placeHolder.url')}
        error={!!errors.url}
        helperText={errors.url?.message as string}
        disabled={!!(idEvent && !id)}
        value={watch('url')}
      />

      <Box sx={{ maxWidth: '250px' }}>
        <DropdownColorComponent
          onEventTypeChange={handleEventTypeChange}
          controlProps={{
            control: control,
            name: 'eventTypeId',
          }}
          required={true}
          isFestivo={true}
          defaultValue={true}
          selectProps={{
            error: !!errors.eventTypeId,
            helpertext: errors.eventTypeId?.message as string,
            value: valueEventTypeId || '',
            disabled: !!(idEvent && !id),
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
    </Box>
  )
}
