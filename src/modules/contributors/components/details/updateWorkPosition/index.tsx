import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { Box, Button, Paper, Typography } from '@mui/material'
import { updateWorkPosition } from 'modules/contributors/services/profiles'
import {
  AppContext,
  DetailsModel,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  ServerError,
  ServicesError,
  Variant,
} from 'core'
import { useForm } from 'react-hook-form'
import { ButtonBack } from 'modules/manageOrganization/components'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { useParams } from 'react-router-dom'
import { ProfileDetailContext } from 'modules/contributors/context'
import { errorCodes } from 'core/locale/es/errorCodes'
import { getListWorkPositions } from 'modules/manageOrganization/modules/workPositions/services/model.services'

type UpdateSectionProps = {
  workPosition: { value: number; name: string }
  setWorkPosition: Dispatch<SetStateAction<{ value: number; name: string } | undefined>>
}

export const UpdateWorkPosition: React.FC<UpdateSectionProps> = ({
  workPosition,
  setWorkPosition,
}) => {
  const { id } = useParams()
  const { setActMessage } = useContext(AppContext)
  const { loadProfile } = useContext(ProfileDetailContext)

  const {
    control,
    setError,
    formState: { errors },
    clearErrors,
    getValues,
    setValue,
    handleSubmit,
  } = useForm<{ workPosition: number | undefined }>({
    defaultValues: { workPosition: workPosition.value },
  })

  const { t } = useTranslation()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()
  const [isFetching, setIsFetching] = useState(false)

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

  const handleSuccess = async (message: string) => {
    setActMessage({ message: t(message), type: Variant.success })
    return await loadProfile()
  }
  const handleErrors = (message: string, error: (ServerError & ServicesError) | null) => {
    const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
    setActMessage({ message: errorCode ?? t(message), type: Variant.error })
  }
  const onSubmit = async (data: { workPosition?: number }) => {
    if (data.workPosition === undefined) return

    setIsFetching(true)
    const { data: resp, error } = await updateWorkPosition(id ?? '', {
      workPositionId: data.workPosition ?? 0,
    })

    if (resp) await handleSuccess('contributors.messages.updateWorkPosition')
    else handleErrors('contributors.messages.updateWorkPositionError', error)
    setIsFetching(false)
    setWorkPosition(undefined)
  }

  useEffect(() => {
    if (workPosition.value != 0) {
      setValue('workPosition', workPosition.value)
      setInfoCard({ label: workPosition.name, value: workPosition.value })
    }
  }, [workPosition, setValue])
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper sx={styles.root}>
        <Typography sx={styles.title}>Informacion de Cargo</Typography>
        <Box sx={styles.formContainer}>
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
                title={t('instancesWorkPositions.creation.title.codeAndName')}
                clearPost={clearPost}
              />
              <DetailsModel id={Number(infoCard.value)} hiddenHeader />
            </Box>
          )}
        </Box>

        <Box sx={styles.actionsContainer}>
          <ButtonBack click={() => setWorkPosition(undefined)} sx={{ position: 'inherit' }} />
          <Button type="submit" color="secondary" variant="contained" disabled={isFetching}>
            {t('general.button.save')}
          </Button>
        </Box>
      </Paper>
    </form>
  )
}
