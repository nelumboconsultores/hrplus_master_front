import React, { SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { postAssignments } from 'modules/contributors/services/profiles'
import {
  AppContext,
  InputAutocomplete,
  ItemCard,
  ItemsSelectType,
  ServerError,
  ServicesError,
  Variant,
} from 'core'
import { useForm } from 'react-hook-form'
import { ButtonBack } from 'modules/manageOrganization/components'
import { useTranslation } from 'react-i18next'
import { ProfileDetailContext } from 'modules/contributors/context'
import { errorCodes } from 'core/locale/es/errorCodes'
import { getWorkPeriods } from 'modules/manageOrganization/modules/stores/services/model.services'
import Spinner from 'core/components/spinner'
import { styles } from './styles'
import { workPerioType } from 'modules/workingDays/enums/workPerioType'
import { WorkPeriodBody } from 'modules/manageOrganization/modules/stores/types'

type UpdateSectionProps = {
  setWorkPeriod: React.Dispatch<SetStateAction<{ value: number; name: string } | undefined>>
}

type FullPeriodInfo = {
  id: number
  workPeriod: {
    workPeriod: WorkPeriodBody
    quantityProfiles: number
    active: boolean
    custom: boolean
  }
}[]

export const UpdateWorkPeriod: React.FC<UpdateSectionProps> = ({ setWorkPeriod }) => {
  const { setActMessage } = useContext(AppContext)
  const { loadProfile, profile, workPeriod } = useContext(ProfileDetailContext)

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<{ workPeriod: number | undefined }>({
    defaultValues: { workPeriod: workPeriod?.id },
  })
  const { t } = useTranslation()
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const [isloading, setIsLoading] = useState(false)
  const [fullPeriodInfo, setFullPeriodInfo] = useState<FullPeriodInfo>([])

  const handleErrors = (message: string, error: (ServerError & ServicesError) | null) => {
    const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
    setActMessage({ message: errorCode ?? t(message), type: Variant.error })
  }
  const onSubmit = async ({ workPeriod }: { workPeriod?: number }) => {
    if (workPeriod === undefined) return

    setIsFetching(true)
    const body: {
      profileIds: number[]
      temporal: false
      force: true
      allProfiles: false
    } = {
      profileIds: [profile.id],
      temporal: false,
      force: true,
      allProfiles: false,
    }
    const { data, error } = await postAssignments(workPeriod.toString(), body)

    if (data) {
      const user =
        data.data.profilesAdded < 1
          ? data.data.profilesAdded + ' usuarios'
          : data.data.profilesAdded + ' usuario'
      setActMessage({
        message: t('users.msg.successfulConference', {
          name: data.data.workPeriodDetails.name,
          length: user,
        }),
        type: Variant.success,
      })
      await loadProfile()
      setWorkPeriod(undefined)
    } else handleErrors('authentication.alertError', error)

    setIsFetching(false)
  }

  const handleDelete = () => setValue('workPeriod', undefined)

  useEffect(() => {
    const fetchOptions = async () => {
      setIsLoading(true)
      const { data } = await getWorkPeriods(profile?.workPosition?.store?.id)
      if (data) {
        const newOptions = data.data.workPeriods.map((item) => ({
          label: `${item.workPeriod.workPeriod.name}`,
          value: item.workPeriod.workPeriod.id,
        }))
        setFullPeriodInfo(data.data.workPeriods)
        setOptions(newOptions)
      }
      setIsLoading(false)
    }
    fetchOptions()
  }, []) // eslint-disable-line

  const infoCard = useMemo(() => {
    const value = watch('workPeriod')
    if (!value) return { title: '', label: '' }
    const info = fullPeriodInfo.find((item) => item.workPeriod.workPeriod.id === value)
    return {
      title:
        workPerioType[
          info?.workPeriod.workPeriod.workPeriodType.name as keyof typeof workPerioType
        ],
      label: info?.workPeriod.workPeriod.name ?? '',
    }
  }, [watch('workPeriod'), fullPeriodInfo]) // eslint-disable-line
  if (isloading) return <Spinner />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <Paper sx={styles.root}>
        <Typography sx={styles.title}>Informacion de Jornada</Typography>
        <Grid sx={styles.formContainer}>
          {!infoCard.title ? (
            <Grid item xs={4.5}>
              <InputAutocomplete
                control={control}
                name="workPeriod"
                label="Buscar Jornada *"
                options={options}
                errors={errors.workPeriod?.message as string}
                helpertext={errors.workPeriod?.message as string}
                controlProps={{
                  rules: {
                    required: {
                      value: true,
                      message: t('general.validations.requiredName', { name: 'Jornada' }),
                    },
                  },
                }}
              />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <ItemCard label={infoCard.label} title={infoCard.title} clearPost={handleDelete} />
            </Grid>
          )}
        </Grid>

        <Box sx={styles.actionsContainer}>
          <ButtonBack click={() => setWorkPeriod(undefined)} sx={{ position: 'inherit' }} />
          <Button type="submit" color="secondary" variant="contained" disabled={isFetching}>
            {t('general.button.save')}
          </Button>
        </Box>
      </Paper>
    </form>
  )
}
