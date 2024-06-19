import { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import {
  AppContext,
  GeneralAccordion,
  InputAutocomplete,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
  getAutocompleteValue,
} from 'core'
import { workPeriodsList } from 'core/services'
import { errorCodes } from 'core/locale/es/errorCodes'

import { workPerioType } from 'modules/workingDays/enums/workPerioType'
import { ActionTypes } from '../../../enums'
import { ModelContext } from '../../../context'
import { deleteWorkPeriod, getWorkPeriods, setWorkPeriod } from '../../../services/model.services'
import { styles } from './styles'
import { WorkPeriodsList } from '../../workPeriodsList'
import { GenInfoDetail } from '../../genInfoDetail'

export const WorkPositions = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { modelState, modelDispatch } = useContext(ModelContext)
  const [workPeriodsOptions, setWorkPeriodsOptions] = useState<
    { label: string; value: string | number }[]
  >([])
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ workPeriodId?: number }>({})

  const { setActMessage } = useContext(AppContext)
  const onSubmit = () => {
    if (!modelState.workPeriods?.length) {
      return
    }
    modelDispatch({ type: ActionTypes.SET_STEP, payload: modelState?.step + 1 })
  }

  const handleChange = (
    value: NonNullable<string | ItemsSelectType> | (string | ItemsSelectType)[] | null,
  ) => {
    if (!value) return
    const workPeriodId = (value as ItemsSelectType).value
    const fetchWorkPeriods = async () => {
      const { data, error } = await setWorkPeriod(modelState.id ?? id ?? '', { workPeriodId })
      if (data) {
        const workPeriods = data?.data.workPeriods.map((period) => ({
          id: period.id,
          name: period.workPeriod.workPeriod.name,
          type: workPerioType[
            period.workPeriod.workPeriod.workPeriodType.name as keyof typeof workPerioType
          ],
        }))
        modelDispatch({
          type: ActionTypes.SET_WORK_POSITIONS,
          payload: workPeriods ?? modelState.workPeriods,
        })
        setValue('workPeriodId', undefined)
      } else {
        const codeError = error?.errors?.code

        const message = errorCodes[codeError as keyof typeof errorCodes]
        setActMessage({
          type: Variant.error,
          message: message ?? t('instancesStores.creation.notifications.workPositionAssignError'),
        })
      }
    }

    fetchWorkPeriods()
  }

  const handleDelete = async (workPeriodId: number) => {
    const { data } = await deleteWorkPeriod(modelState.id ?? id ?? '', workPeriodId)
    if (data?.data.success) {
      const workPeriods = modelState.workPeriods.filter((period) => period.id !== workPeriodId)
      modelDispatch({ type: ActionTypes.SET_WORK_POSITIONS, payload: workPeriods })
    }
  }

  const fetchWorkPeriods = useCallback(async () => {
    const { data } = await workPeriodsList()
    if (data) {
      const options = data.data.map((item) => ({ label: item.name, value: item.id }))
      setWorkPeriodsOptions(options)
    }
  }, [])

  useEffect(() => {
    const fetchCreatedPeriods = async () => {
      const { data } = await getWorkPeriods(modelState.id ?? id ?? '')
      const workPeriods = data?.data.workPeriods.map((period) => ({
        id: period.id,
        name: period.workPeriod.workPeriod.name,
        type: workPerioType[
          period.workPeriod.workPeriod.workPeriodType.name as keyof typeof workPerioType
        ],
      }))
      modelDispatch({
        type: ActionTypes.SET_WORK_POSITIONS,
        payload: workPeriods ?? modelState.workPeriods,
      })
    }
    fetchWorkPeriods()
    if (!modelState.workPeriods.length) fetchCreatedPeriods()
  }, [fetchWorkPeriods, modelState.id, id, modelDispatch]) // eslint-disable-line

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={styles.root}>
        <Box sx={styles.sectionsContainer}>
          <GeneralAccordion
            title={t(`instancesStores.creation.title.generalInformation`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <GenInfoDetail />
          </GeneralAccordion>
          <GeneralAccordion
            title={t(`instancesStores.creation.title.geolocation`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <GenInfoDetail isGeo showDinamics={false} />
          </GeneralAccordion>
          <OpenWithUpdate
            title={t(`instancesStores.creation.title.workPositions`)}
            onRefresh={fetchWorkPeriods}
          >
            <Grid container spacing={2} mb={2}>
              <Grid item xs={4}>
                <InputAutocomplete
                  control={control}
                  name={'workPeriodId'}
                  label={t('instancesStores.creation.label.workPeriodCode')}
                  options={workPeriodsOptions}
                  disabled={!workPeriodsOptions.length}
                  onChange={(_, value) => handleChange(value)}
                  controlProps={{
                    rules: {
                      required: {
                        value: !modelState.workPeriods?.length ? true : false,
                        message: t('general.validations.requiredName', {
                          name: 'Nombre de la Jornada',
                        }),
                      },
                    },
                  }}
                  errors={errors.workPeriodId?.message as string}
                  helpertext={errors.workPeriodId?.message as string}
                  value={
                    getAutocompleteValue(watch('workPeriodId') as number, workPeriodsOptions) ?? ''
                  }
                />
              </Grid>
            </Grid>
            <WorkPeriodsList handleDelete={handleDelete} />
          </OpenWithUpdate>
        </Box>
        <Box sx={styles.footer}>
          <Button type="submit" color="secondary">
            Continuar
          </Button>
        </Box>
      </Box>
    </form>
  )
}
