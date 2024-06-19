import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { DetailsSectionData } from 'modules/contributors/types'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import {
  AppContext,
  CapitalIconButton,
  DynamicFormValues,
  DynamicFormValuesType,
  FieldTypeEnumSelect,
  MapGrid,
  ReturnInput,
  ServerError,
  ServicesError,
  TemplateCardItem,
  Variant,
  hasBirthDate,
  icons,
  isTheSameDay,
  objectToArray,
  validateIsAdult,
} from 'core'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { ButtonBack } from 'modules/manageOrganization/components'
import {
  createProfileDetailSection,
  getProfileSectionForm,
  remove,
  updateProfileDetailSection,
} from 'modules/contributors/services/profiles'
import { ProfileDetailContext } from 'modules/contributors/context'
import { errorCodes } from 'core/locale/es/errorCodes'
import { TypeJson } from 'core/components/returnInput/typeJson'
import { NamesEnum } from 'modules/dataStructure/modules/employeeStructure/enum'
import { useParams } from 'react-router-dom'
import Spinner from 'core/components/spinner'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'
import { BirthdayModal } from './birthdayModal'
import { dateToSpanish } from 'core/utils/textFormat'

type MultipleFormsProps = {
  selectedSection: DetailsSectionData
  setSelectedSection: Dispatch<SetStateAction<DetailsSectionData | undefined>>
}

const birthdayField = 'Fecha de nacimiento'
export const MultipleForms: React.FC<MultipleFormsProps> = ({
  selectedSection,
  setSelectedSection,
}) => {
  const { t } = useTranslation()
  const methods = useForm()
  const { setActMessage } = useContext(AppContext)
  const { loadProfile, profile } = useContext(ProfileDetailContext)
  const [isFetching, setIsFetching] = useState(false)
  const [fields, setFields] = useState<TypeJson[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEdit, setIsEdit] = useState<number>()
  const [showModal, setShowModal] = useState(false)
  const { id } = useParams()
  const hiredDate = profile?.hiredDate ? dateToSpanish(profile.hiredDate) : ''

  const sendRequest = async (data: { [key: string]: DynamicFormValuesType }) => {
    setIsFetching(true)
    const allPropertiesEmptyOrNull = Object.values(data).every(
      (value) => value === null || value === '',
    )
    if (!allPropertiesEmptyOrNull) {
      if (isEdit) {
        const { data: resp, error } = await updateProfileDetailSection(id ?? '', isEdit, {
          keyword: selectedSection.keyword ?? '',
          fieldsValues: data,
        })

        if (resp) await handleSuccess()
        else handleErrors('contributors.messages.sectionUpdatedError', error)
      } else {
        const { data: resp, error } = await createProfileDetailSection(id ?? '', {
          keyword: selectedSection.keyword ?? '',
          fieldsValues: data,
        })
        if (resp) await handleSuccess(resp?.data?.id)
        else handleErrors('contributors.messages.sectionCreatedError', error)
      }
    }
    setIsFetching(false)
  }
  const sendRequestBirthDate = async (data: { [key: string]: DynamicFormValuesType }) => {
    const birthDate = data[birthdayField]
    if (isTheSameDay(birthDate as string, hiredDate)) {
      return methods.setError(birthdayField, {
        type: 'manual',
        message: t('contributors.messages.sameDate'),
      })
    }
    await sendRequest(data)
  }

  const onSubmit = async (data: { [key: string]: DynamicFormValuesType }) => {
    if (!hasBirthDate(data)) await sendRequest(data)
    else await sendRequestBirthDate(data)
  }
  const openModal = () => {
    const birthDate = methods.watch(birthdayField)
    const currentBirthDate = selectedSection?.fieldsValues[0]?.fieldsValues[birthdayField]
    if (!birthDate) return
    if (
      !validateIsAdult(birthDate as string) &&
      !isTheSameDay(birthDate as string, currentBirthDate as string)
    ) {
      setShowModal(true)
    }
  }
  const handleSuccess = async (respId?: number) => {
    if (isEdit || respId) {
      setSelectedSection({
        ...selectedSection,
        fieldsValues: [
          ...(selectedSection?.fieldsValues ?? []),
          { id: respId ?? isEdit ?? 1, fieldsValues: methods.getValues() },
        ],
      })
      setIsEdit(undefined)
    }
    methods.reset()
    return await loadProfile()
  }

  const handleErrors = (message: string, error: (ServerError & ServicesError) | null) => {
    if (error?.errors?.code === 'C01PRSV03') {
      const elementWithError = fields?.find((item) => item?.id === error?.errors?.id)
      const elementInsertErrors = elementWithError?.label?.toLocaleLowerCase()

      setActMessage({
        type: Variant.error,
        message: t('general.notifications.errorOnly', {
          value: elementInsertErrors,
          status: 'guardar',
        }),
      })
    } else {
      const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
      setActMessage({ message: errorCode ?? t(message), type: Variant.error })
    }
  }
  const edit = (item: { id: number; fieldsValues: DynamicFormValues }) => {
    if (isEdit) return
    setIsEdit(item.id)
    const fieldsEntries = Object.entries(item.fieldsValues)
    const fieldValues = Object({})
    fieldsEntries.forEach(([key, value]) => {
      fieldValues[key] = value
    })
    methods.reset(valuesByNames(fields, fieldValues))
    selectedSection.fieldsValues = selectedSection.fieldsValues.filter(
      (field) => field.id !== item.id,
    )
  }
  const removeSections = async (edit: number) => {
    if (!id) return
    const response = await remove(Number(id), edit)
    if (response.data) {
      setSelectedSection({
        ...selectedSection,
        fieldsValues: selectedSection.fieldsValues.filter((field) => field.id !== Number(edit)),
      })
      return await loadProfile()
    }
    if (response.error) {
      setActMessage({
        message: t('contributors.messages.sectionDeletedError'),
        type: Variant.error,
      })
    }
  }

  const birthDate = methods.watch(birthdayField)
  useEffect(() => {
    if (birthDate) {
      const hasError = methods.formState.errors[birthdayField]
      if (!isTheSameDay(birthDate as string, hiredDate) && hasError) {
        methods.clearErrors(birthdayField)
      }
    }
  }, [birthDate, hiredDate, methods, selectedSection?.fieldsValues])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getProfileSectionForm(selectedSection?.keyword ?? '')
      if (data) {
        const sorted = data.data
          .sort((a, b) => a.position - b.position)
          .filter((item) => item.visible)

        let fields: TypeJson[] = sorted.map((item) => ({
          id: item.id,
          type: item.fieldType.id as FieldTypeEnumSelect,
          name: item.name,
          label: item.label,
          placeholder: item.placeholder ?? '',
          optionsId: item.catalogueId,
          validations: item.validations,
        }))
        if (selectedSection?.fieldsValues) {
          const exitingKeys = fields.map((field) => field.name)
          const fieldsEntries = Object.entries(selectedSection.fieldsValues)
          const fieldValues = Object({})

          fieldsEntries.forEach(([key, value]) => {
            if (exitingKeys.includes(key)) {
              fieldValues[key] = value
            }
          })
          methods.reset(fieldValues)
          if (fields.some((field) => field.name === birthdayField))
            fields = fields.map((field) => {
              if (field.name === birthdayField) field.onBlur = openModal
              return field
            })
        }
        setFields(fields ?? [])
      }
      setIsLoaded(true)
    }

    fetchData()
  }, [selectedSection?.keyword, selectedSection?.fieldsValues, methods]) //eslint-disable-line
  if (!isLoaded) return <Spinner />
  return (
    <>
      <Paper sx={styles.root}>
        <Box sx={{ display: 'flex' }}>
          <ButtonBack click={() => setSelectedSection(undefined)} sx={{ position: 'inherit' }} />
        </Box>
        <Paper sx={{ padding: '16px 32px' }}>
          <Typography sx={styles.title}>{NamesEnum[selectedSection.keyword ?? '']}</Typography>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} style={styles.formContainer as object}>
              <Grid container spacing={2}>
                {fields.map((field, index) => (
                  <ReturnInput field={field} key={index} xs={6} />
                ))}
              </Grid>
              <Box sx={{ alignSelf: 'flex-end' }}>
                <CapitalIconButton
                  color={isEdit ? 'secondary' : 'primary'}
                  type="submit"
                  disabled={isFetching}
                  title={t('general.toolTip.add')}
                  sx={{ svg: { width: '1.5em', height: '1.5em' } }}
                >
                  {isEdit ? icons.saveDis : icons.add}
                </CapitalIconButton>
              </Box>
            </form>
          </FormProvider>
        </Paper>
        {selectedSection.fieldsValues
          .sort((a, b) => a.id - b.id)
          .map((item) => {
            return (
              <TemplateCardItem key={item.id}>
                <Box sx={{ display: 'flex', gap: '16px' }}>
                  <MapGrid arrayInfo={objectToArray(item.fieldsValues)} />
                  <Box sx={{ display: 'flex' }}>
                    <CapitalIconButton
                      title={t('general.toolTip.edit')}
                      color="secondary"
                      onClick={() => edit(item)}
                      sx={{ alignSelf: 'center' }}
                    >
                      {icons.edit}
                    </CapitalIconButton>
                    <CapitalIconButton
                      title={t('general.toolTip.delete')}
                      color="error"
                      onClick={() => removeSections(item.id)}
                      sx={{ alignSelf: 'center' }}
                    >
                      {icons.close}
                    </CapitalIconButton>
                  </Box>
                </Box>
              </TemplateCardItem>
            )
          })}
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Button
            color="secondary"
            onClick={() => {
              setSelectedSection(undefined)
              setActMessage({
                message: t('contributors.messages.sectionSaved'),
                type: Variant.success,
              })
            }}
          >
            {t('general.button.save')}
          </Button>
        </Box>
      </Paper>
      <BirthdayModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
