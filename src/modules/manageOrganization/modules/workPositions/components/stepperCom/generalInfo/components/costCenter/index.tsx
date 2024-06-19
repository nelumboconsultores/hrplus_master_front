import {
  AppContext,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
} from 'core'
import { getListSearchCostCenters as getListSearchCostCenters } from 'core/services'
import { WorkPositionsContext } from 'modules/manageOrganization/modules/workPositions/context'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const CostCenter = () => {
  const {
    control,
    watch,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
  } = useFormContext()
  const { setActMessage } = useContext(AppContext)
  const { modelState } = useContext(WorkPositionsContext)
  const { t } = useTranslation()
  const [optionsPost, setOptionsPost] = useState<ItemsSelectType[]>([])
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()

  const getSearchedPosts = async (search?: string) => {
    const trimmedValue = search?.toString().trim()
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getListSearchCostCenters(`search=${search}`)
      if (data) {
        const newOptions = data.data.map((item) => ({
          label: `${item.code} - ${item.denomination}`,
          value: item.id,
        }))

        setOptionsPost(newOptions)
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
      setError('cost_center', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const clearPost = () => {
    setInfoCard(undefined)
    setValue('cost_center', undefined)
    setOptionsPost([])
  }
  useEffect(() => {
    if (watch('cost_center') && modelState.id && !infoCard) {
      setInfoCard({
        label:
          (modelState.formInformation?.generalInfo.costCenter[0].value ?? '-') +
          ' - ' +
          (modelState.formInformation?.generalInfo.costCenter[1].value ?? '-'),
        value: 'Código - Denominación',
      })
    }
  }, [watch('cost_center'), modelState.id]) // eslint-disable-line

  return (
    <OpenWithUpdate
      title={t('instancesWorkPositions.view.inputs.costCenter')}
      onRefresh={getSearchedPosts}
      hiddenIcon={!infoCard ? false : true}
    >
      {!infoCard ? (
        <InputAutoSearchButton
          options={optionsPost}
          sx={{ width: '340px' }}
          control={control}
          propsInput={{
            name: 'cost_center',
            label: t('instancesWorkPositions.input.costCenter'),
            placeholder: t('instancesWorkPositions.placeHolder.costCenter'),
            error: !!errors.cost_center,
            helperText: errors.cost_center?.message as string,
            onChange: () => clearErrors('cost_center'),
          }}
          onSearch={getSearchedPosts}
          controlProps={{
            rules: {
              required: {
                value: true,
                message: t('general.validations.requiredName', { name: 'Centro de costos' }),
              },
              onChange: () => {
                const element = optionsPost.find((item) => item.value === watch('cost_center'))
                if (element) setInfoCard(element)
              },
            },
          }}
        />
      ) : (
        <ItemCard
          label={infoCard.label.toString()}
          title={t('instancesWorkPositions.creation.title.codeAndName')}
          clearPost={clearPost}
        />
      )}
    </OpenWithUpdate>
  )
}
