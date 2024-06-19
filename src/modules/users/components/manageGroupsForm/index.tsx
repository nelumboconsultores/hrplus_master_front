import * as React from 'react'
import { Box, FormControlLabel, Typography } from '@mui/material'
import {
  GeneralTitle,
  InputMultiSelect,
  Variant,
  AppContext,
  InputRange,
  getMultiselecValues,
} from 'core'
import { CardSwitch } from 'modules/incidents/hooks/cardSwitch'
import { styles } from './manageGroupsFormStyles'
import { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { addAssignments, addGroups, getGroups } from 'core/services'
import { UsersContext } from 'modules/users/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectedOptionEnum } from '../enum/selecteOptionEnum'
import { ButtonSend } from '../buttonSend'
import { ConfirmationGroupModal } from '../modals/confirGroup'
import { TypeOfDayEnum, useSchemaConfiguration } from 'modules/users/utils'
import dayjs from 'dayjs'
import { errorCodes } from 'core/locale/es/errorCodes'

type FormData = {
  type: TypeOfDayEnum
  groupIds: number[]
  startDate: string
  endDate: string
}

type Lists = {
  value: number
  label: string
}

export const ManagmentGroupsForm = () => {
  const { t } = useTranslation()
  const {
    getDataTable,
    setSelectedOption,
    profileIds,
    excludeProfileIds,
    checkAll,
    initVal,
    setProfileIds,
    setCheckAll,
  } = React.useContext(UsersContext)
  const { groupSchema } = useSchemaConfiguration()
  const { setActMessage } = React.useContext(AppContext)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isFetchingNewGroup, setIsFetchingNewGroup] = useState(false)
  const [switchValue, setSwitchValue] = React.useState(false)
  const [submitData, setSubmitData] = React.useState<FormData>()
  const [list, setList] = useState<Lists[]>([])

  const methods = useForm<FormData>({
    resolver: zodResolver(groupSchema),
  })
  useEffect(() => {
    addGroup() // eslint-disable-next-line
  }, [])
  useEffect(() => {
    methods.setValue('type', switchValue ? TypeOfDayEnum.FixedHours : TypeOfDayEnum.ShiftsVariable)
    // eslint-disable-next-line
  }, [switchValue])
  const addGroup = async (newGroup?: string) => {
    const { data: resp } = await getGroups()
    if (resp) {
      const contentData = resp.data.map((item) => {
        return {
          value: item.id,
          label: item.name ?? '',
        }
      })

      setList(contentData)

      if (newGroup) {
        const newValue = contentData.find(({ label }) => label === newGroup)?.value
        if (newValue) {
          const oldValues = methods.getValues('groupIds') as number[]

          const newValues = oldValues?.length ? [...oldValues, newValue] : [newValue]
          methods.setValue('groupIds', newValues)
        }
      }
    }
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setSwitchValue(isChecked)
  }

  const createBody = () => ({
    groupIds: methods?.getValues('groupIds') as number[],
    profileIds: checkAll ? [] : (profileIds as number[]),
    temporal: switchValue,
    allProfiles: checkAll,
    filterProfiles: {
      search: initVal.search as string,
      groupIds: initVal.groupIds as number[],
    },
    excludeProfileIds: excludeProfileIds,
    ...(switchValue && {
      dateFrom: dayjs(methods?.getValues('startDate')).format('YYYY-MM-DD'),
      dateTo: dayjs(methods?.getValues('endDate')).format('YYYY-MM-DD'),
    }),
  })

  const handleUpdate = async () => {
    setLoading(true)
    if (!submitData) {
      setOpen(false)
      setLoading(false)
    } else {
      const body = createBody()
      const { data: resp, error } = await addAssignments(body)

      if (resp) {
        setSelectedOption(SelectedOptionEnum.None)
        setCheckAll(false)
        setProfileIds([])
        getDataTable()
        setOpen(false)
        setActMessage({ type: Variant.success, message: t('users.msg.success') })
      }
      if (error) {
        if (error.errors.code === 'C01GRPS05') {
          setActMessage({
            type: Variant.error,
            message: errorCodes.C01GRPS05,
          })
        } else if (error.errors.code === 'C01GRPS04') {
          setActMessage({
            type: Variant.error,
            message: errorCodes.C01GRPS04,
          })
        } else {
          setActMessage({ type: Variant.error, message: t('incidents.modal.error') })
        }
      }
      setLoading(false)
    }
  }
  const handleAddNotFoundOption = async (newOption: string) => {
    setIsFetchingNewGroup(true)
    const { data: resp } = await addGroups({ name: newOption })

    if (resp) {
      await addGroup(newOption)
      setActMessage({ type: Variant.success, message: t('users.msg.createGroupSuccess') })
    } else setActMessage({ type: Variant.error, message: t('incidents.msg.createGroupError') })

    setIsFetchingNewGroup(false)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          setSubmitData(data)
          setOpen(true)
        })}
        style={{ height: '100%' }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <GeneralTitle sx={styles.container}>
              {t('users.workingDay.workingGroupTitle')}
            </GeneralTitle>
            <Typography lineHeight={1.3} sx={styles.text}>
              {t('users.workingDay.managmentGroups')}
            </Typography>
            <Typography lineHeight={1.3} sx={{ paddingBottom: '20px' }}>
              {t('users.workingDay.managmentGroupsDiscription')}
            </Typography>
            <InputMultiSelect
              control={methods.control}
              name="groupIds"
              disabled={isFetchingNewGroup}
              onAddNotFoundOption={handleAddNotFoundOption}
              clearOnBlur
              options={list}
              value={getMultiselecValues(methods.watch('groupIds'), list)}
              label={t('incidents.modal.select')}
              errors={methods.formState.errors.groupIds?.message}
              helpertext={methods.formState.errors.groupIds?.message}
            />

            <FormControlLabel
              control={
                <CardSwitch
                  sx={styles.cardStyles}
                  checked={switchValue}
                  onChange={handleSwitchChange}
                />
              }
              label={t('users.temporal')}
            />

            {switchValue && (
              <InputRange
                spacing={3}
                fromProp={{
                  gridProps: { xs: 12 },
                  name: 'startDate',
                  helperText: methods?.formState?.errors?.startDate?.message,
                  error: !!methods?.formState?.errors?.startDate,
                }}
                toProp={{
                  gridProps: { xs: 12 },
                  name: 'endDate',
                  helperText: methods?.formState?.errors?.endDate?.message,
                  error: !!methods?.formState?.errors?.endDate,
                }}
              />
            )}
          </Box>

          <ButtonSend text="APLICAR CAMBIOS" loading={loading} />
        </Box>
        <ConfirmationGroupModal open={open} setOpen={setOpen} handleUpdate={handleUpdate} />
      </form>
    </FormProvider>
  )
}
