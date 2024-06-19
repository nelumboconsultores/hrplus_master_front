import { Box, Button, Typography } from '@mui/material'
import {
  AppContext,
  GeneralAccordion,
  InputAutoSearchButton,
  InputCurrency,
  ItemCard,
  ItemsSelectType,
  MapGrid,
  OpenWithUpdate,
  Variant,
  useValidations,
} from 'core'
import { GridBox } from 'modules/manageOrganization/components'
import { ArrowBox } from 'modules/manageOrganization/components/infoBox/arrowBox'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getCompTabList } from 'core/services'
import { FormProvider, useForm } from 'react-hook-form'
import { updateWorksPositions } from '../../../services/model.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { WorkPositionsContext } from '../../../context'
import { styles } from './styles'
import { DetailCard } from '../../dynamicSelectForm/detailCard'

type FieldsType = {
  tab: number
  minSalary: number
}

export const Tab = () => {
  const { setActMessage } = useContext(AppContext)
  const { loadData, modelState, formatArrayToDynamic } = useContext(WorkPositionsContext)
  const { requiredNumber } = useValidations()
  const { t } = useTranslation()
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const refillDetails = modelState.formInformation?.generalInfo
  const schema = z.object({
    tab: requiredNumber(t('instancesWorkPositions.validations.tab')),
    minSalary: requiredNumber(t('instancesWorkPositions.validations.minSalary')),
  })
  const methods = useForm<FieldsType>({
    defaultValues: {
      tab: modelState.formInformation?.tab?.tabId ?? 0,
      minSalary: modelState.formInformation?.tab?.minSalary,
    },
    resolver: zodResolver(schema),
  })
  const { control, watch, handleSubmit, formState, setError, clearErrors, reset } = methods
  const onSubmit = async (body: FieldsType) => {
    const { data, error } = await updateWorksPositions(modelState.id?.toString() ?? '0', {
      compTabId: body.tab as number,
      minSalary: Number(body.minSalary),
    })
    if (data) {
      loadData({ newData: data, step: 3 })
    }
    if (error) {
      setActMessage({
        message: t(`instancesWorkPositions.creation.notifications.error`),
        type: Variant.error,
      })
    }
  }
  const getSearchedPosts = async (search?: string) => {
    const trimmedValue = search?.toString().trim()
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getCompTabList(`${search}`)
      if (data) {
        const newOptions = data.data.map((item) => ({
          label: `${item.code} - ${item.denomination}`,
          value: item.id,
        }))

        setOptions(newOptions)
        if (newOptions.length === 0)
          setActMessage({
            message: t(`general.notifications.noResults`),
            type: Variant.info,
          })
      }
      if (error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    } else {
      setError('tab', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const clearPost = () => {
    setInfoCard(undefined)
    setOptions([])
    reset({ tab: 0 })
  }

  useEffect(() => {
    if (watch('tab')) {
      if (options.length > 0) {
        const element = options.find((item) => item.value === watch('tab'))
        if (element) setInfoCard(element)
      } else {
        setInfoCard({
          label:
            modelState.formInformation?.tab?.code + ' - ' + modelState.formInformation?.tab?.title,
          value: watch('tab'),
        })
      }
    }
  }, [watch('tab')]) // eslint-disable-line

  return (
    <Box sx={styles.root}>
      {refillDetails?.main && (
        <GridBox
          title={t(`instancesWorkPositions.creation.title.generalInformation`)}
          arrayGenInfo={formatArrayToDynamic(
            refillDetails?.main,
            modelState.formInformation?.typesInputs.generalInfo.main,
          )}
        />
      )}
      {refillDetails?.stores && (
        <GridBox
          title={t('instancesWorkPositions.view.inputs.branch')}
          arrayGenInfo={formatArrayToDynamic(
            refillDetails?.stores,
            modelState.formInformation?.typesInputs.generalInfo.dataStores,
          )}
        />
      )}
      {refillDetails?.positions && (
        <GridBox
          title={t('instancesWorkPositions.view.inputs.post')}
          arrayGenInfo={refillDetails?.positions ?? []}
        />
      )}
      {refillDetails?.geo && (
        <ArrowBox
          title={t('instancesWorkPositions.creation.title.geographicalStructureLevel')}
          arrayGenInfo={refillDetails?.geo ?? []}
        />
      )}
      {refillDetails?.org && (
        <ArrowBox
          title={t('instancesWorkPositions.creation.title.organizationalStructureLevel')}
          arrayGenInfo={refillDetails?.org ?? []}
        />
      )}
      {refillDetails?.costCenter && (
        <GeneralAccordion
          title={t('instancesWorkPositions.view.inputs.costCenter')}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <DetailCard
            structures={{
              id: refillDetails.cost_centerId,
              data: [
                {
                  name: `${refillDetails.costCenter[0]?.value} - ${refillDetails.costCenter[1]?.value}`,
                  type: 'Código - Denominación',
                },
              ],
            }}
            isDetail
          />
        </GeneralAccordion>
      )}
      <OpenWithUpdate title={t('instancesWorkPositions.creation.stepper.jobCategory')} hiddenIcon>
        <Typography variant="h1" sx={{ fontSize: '1.1rem' }}>
          Denominacion: {modelState.formInformation?.jobConfig?.description.denomination}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: '1rem' }}>
          Código: {modelState.formInformation?.jobConfig?.description.code}
        </Typography>
        <Box sx={{ my: '16px' }}></Box>
        <MapGrid arrayInfo={modelState.formInformation?.jobConfig?.fields ?? []} />
      </OpenWithUpdate>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form as object}>
          <OpenWithUpdate
            title={t('instancesWorkPositions.creation.title.tab')}
            onRefresh={getSearchedPosts}
            hiddenIcon={!infoCard ? false : true}
          >
            <Box sx={{ marginBottom: '16px' }}>
              <Typography variant="h1" sx={{ marginBottom: '12px', fontSize: '1.1rem' }}>
                {t('instancesWorkPositions.creation.title.tab')}
              </Typography>
              {!infoCard ? (
                <InputAutoSearchButton
                  options={options}
                  sx={{ width: '340px' }}
                  control={control}
                  propsInput={{
                    name: 'tab',
                    label: t('instancesWorkPositions.input.tab'),
                    placeholder: t('instancesWorkPositions.placeHolder.tab'),
                    error: !!formState.errors.tab,
                    helperText: formState.errors.tab?.message as string,
                    onChange: () => clearErrors('tab'),
                  }}
                  onSearch={getSearchedPosts}
                />
              ) : (
                <ItemCard
                  label={infoCard.label.toString()}
                  title={'Nivel Macropay - Posición'}
                  clearPost={clearPost}
                />
              )}
            </Box>
            <Box>
              <Typography variant="h1" sx={{ marginBottom: '12px', fontSize: '1.1rem' }}>
                {t('instancesWorkPositions.input.genMinSal')}
              </Typography>
              <InputCurrency
                InputProps={{
                  name: 'minSalary',
                  label: t('instancesWorkPositions.input.genMinSal'),
                  placeholder: t('instancesWorkPositions.placeHolder.indicateGenMinSalary'),
                  error: !!formState.errors.minSalary,
                  helperText: formState.errors.minSalary?.message as string,
                  sx: { width: '340px' },
                }}
              />
            </Box>
          </OpenWithUpdate>
          <Box justifyContent="flex-end" display="flex" width="100%">
            <Button variant="contained" color="secondary" type="submit">
              {t('general.button.continue')}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}
