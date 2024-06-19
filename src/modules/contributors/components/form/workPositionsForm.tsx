import { Box } from '@mui/material'
import {
  AppContext,
  DetailsModel,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
} from 'core'
import { getListWorkPositions } from 'modules/manageOrganization/modules/workPositions/services/model.services'
import { useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const WorkPositionsForm = () => {
  const { setActMessage } = useContext(AppContext)
  const {
    control,
    setError,
    formState: { errors },
    clearErrors,
    getValues,
    setValue,
  } = useFormContext()
  const { t } = useTranslation()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()

  const getSearchedPosts = async (search?: string) => {
    const trimmedValue = search?.toString().trim()
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getListWorkPositions(`search=${search}`)
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
      setError('workPosition', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const clearPost = () => {
    setInfoCard(undefined)
    setValue('workPosition', undefined)
  }
  return (
    <OpenWithUpdate title={t('contributors.title.position')} onRefresh={getSearchedPosts}>
      {!infoCard ? (
        <InputAutoSearchButton
          options={options}
          sx={{ width: '340px' }}
          control={control}
          propsInput={{
            name: 'workPosition',
            label: t('contributors.inputs.workPosition'),
            placeholder: t('contributors.inputs.workPositionPlaceholder'),
            error: !!errors.workPosition,
            helperText: errors.workPosition?.message as string,
            onChange: () => clearErrors('workPosition'),
          }}
          onSearch={getSearchedPosts}
          controlProps={{
            rules: {
              required: {
                value: true,
                message: t('general.validations.requiredName', { name: 'Cargo' }),
              },
              onChange: () => {
                const element = options.find((item) => item.value === getValues('workPosition'))
                if (element) setInfoCard(element)
              },
            },
          }}
        />
      ) : (
        <Box>
          <ItemCard
            label={infoCard.label.toString()}
            title={t('instancesWorkPositions.creation.title.workAndName')}
            clearPost={clearPost}
          />
          <DetailsModel id={Number(infoCard.value)} hiddenHeader />
        </Box>
      )}
    </OpenWithUpdate>
  )
}
