import {
  AppContext,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
} from 'core'
import { WorkPositionsContext } from 'modules/manageOrganization/modules/workPositions/context'
import { getSearchWorkPositions } from 'modules/manageOrganization/modules/workPositions/services/model.services'
import { useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const JobConfig = () => {
  const {
    control,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useFormContext()
  const { setActMessage } = useContext(AppContext)
  const { modelState } = useContext(WorkPositionsContext)
  const { t } = useTranslation()
  const [optionsPost, setOptionsPost] = useState<ItemsSelectType[]>([])
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()

  const getSearchedPosts = async (search?: string) => {
    const trimmedValue = search?.toString().trim()
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getSearchWorkPositions(`search=${search}`)
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
      setError('workPosition', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const clearPost = () => {
    setInfoCard(undefined)
    setValue('workPosition', undefined)
    setOptionsPost([])
  }
  useEffect(() => {
    if (watch('workPosition') && modelState.id && !infoCard) {
      setInfoCard({
        label: (modelState.formInformation?.generalInfo.positions[0].value as string) ?? '-',
        value: 'Puesto',
      })
    }
  }, [watch('workPosition'), modelState.id]) // eslint-disable-line

  return (
    <OpenWithUpdate
      title={t('instancesWorkPositions.view.inputs.post')}
      onRefresh={getSearchedPosts}
      hiddenIcon={!infoCard ? false : true}
    >
      {!infoCard ? (
        <InputAutoSearchButton
          options={optionsPost}
          sx={{ width: '340px' }}
          control={control}
          propsInput={{
            name: 'workPosition',
            label: t('instancesWorkPositions.input.searchPost'),
            placeholder: t('instancesWorkPositions.placeHolder.searchPost'),
            error: !!errors.workPosition,
            helperText: errors.workPosition?.message as string,
            onChange: () => clearErrors('workPosition'),
          }}
          onSearch={getSearchedPosts}
          controlProps={{
            rules: {
              required: {
                value: true,
                message: t('general.validations.requiredName', { name: 'Puesto' }),
              },
              onChange: () => {
                const element = optionsPost.find((item) => item.value === watch('workPosition'))
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
