import { Box, Button } from '@mui/material'
import {
  AppContext,
  GeneralAccordion,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
  useValidations,
} from 'core'
import { GridBox } from 'modules/manageOrganization/components'
import { ArrowBox } from 'modules/manageOrganization/components/infoBox/arrowBox'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { updateWorksPositions } from '../../../services/model.services'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCompCategory } from 'core/services'
import { WorkPositionsContext } from '../../../context'
import { styles } from './styles'
import { DetailCard } from '../../dynamicSelectForm/detailCard'

type FieldsType = { category: number }

export const JobCategory = () => {
  const { setActMessage } = useContext(AppContext)
  const { loadData, modelState, formatArrayToDynamic } = useContext(WorkPositionsContext)
  const { requiredNumber } = useValidations()
  const refillDetails = modelState.formInformation?.generalInfo
  const { t } = useTranslation()
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const schema = z.object({
    category: requiredNumber(t('instancesWorkPositions.validations.jobCategoryRequired')),
  })
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<FieldsType>({
    resolver: zodResolver(schema),
    defaultValues: { category: modelState.formInformation?.jobConfig?.id ?? 0 },
  })

  const onSubmit = async (body: FieldsType) => {
    const { data, error } = await updateWorksPositions(modelState.id?.toString() ?? '0', {
      compCategoryId: body.category as number,
    })
    if (data) {
      loadData({ newData: data, step: 2, id: data.data.workPosition.id })
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
      const { data, error } = await getCompCategory(`search=${search}`)
      if (data) {
        const newOPtions = data.data.map((item) => ({
          label: `${item.code} - ${item.denomination}`,
          value: item.id,
        }))

        setOptions(newOPtions)
        if (newOPtions.length === 0)
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
      setError('category', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const clearPost = () => {
    setInfoCard(undefined)
    setOptions([])
    reset({ category: undefined })
  }

  useEffect(() => {
    if (watch('category')) {
      if (options.length === 0) {
        setInfoCard({
          label: modelState.formInformation?.jobConfig?.description.value ?? '',
          value: watch('category'),
        })
      } else {
        const element = options.find((item) => item.value === watch('category'))
        if (element) setInfoCard(element)
      }
    }
  }, [watch('category')]) // eslint-disable-line

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
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form as object}>
        <OpenWithUpdate
          title={t('instancesWorkPositions.view.inputs.catPositions')}
          onRefresh={getSearchedPosts}
          hiddenIcon={!infoCard ? false : true}
        >
          {!infoCard ? (
            <InputAutoSearchButton
              options={options}
              sx={{ width: '340px' }}
              control={control}
              propsInput={{
                name: 'category',
                label: t('instancesWorkPositions.input.catPositions'),
                placeholder: t('instancesWorkPositions.placeHolder.catPositions'),
                error: !!errors.category,
                helperText: errors.category?.message as string,
                onChange: () => clearErrors('category'),
              }}
              onSearch={getSearchedPosts}
            />
          ) : (
            <ItemCard
              label={infoCard.label.toString()}
              title={t('instancesWorkPositions.creation.title.codeAndName')}
              clearPost={clearPost}
            />
          )}
        </OpenWithUpdate>
        <Box justifyContent="flex-end" display="flex" width="100%">
          <Button variant="contained" color="secondary" type="submit">
            {t('general.button.continue')}
          </Button>
        </Box>
      </form>
    </Box>
  )
}
