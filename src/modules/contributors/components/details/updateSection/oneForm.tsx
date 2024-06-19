import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { NamesEnum } from 'modules/dataStructure/modules/employeeStructure/enum'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { DetailsSectionData } from 'modules/contributors/types'
import { TypeJson } from 'core/components/returnInput/typeJson'
import {
  createProfileDetailSection,
  getProfileSectionForm,
  updateProfileDetailSection,
} from 'modules/contributors/services/profiles'
import {
  AppContext,
  DynamicFormValuesType,
  FieldTypeEnumSelect,
  PathName,
  ReturnInput,
  ServerError,
  ServicesError,
  Variant,
  hasBirthDate,
  isTheSameDay,
  validateIsAdult,
} from 'core'
import Spinner from 'core/components/spinner'
import { FormProvider, useForm } from 'react-hook-form'
import { ButtonBack } from 'modules/manageOrganization/components'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileDetailContext } from 'modules/contributors/context'
import { errorCodes } from 'core/locale/es/errorCodes'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'
import { BirthdayModal } from './birthdayModal'
import { dateToSpanish } from 'core/utils/textFormat'

type UpdateSectionProps = {
  selectedSection: DetailsSectionData
  setSelectedSection: Dispatch<SetStateAction<DetailsSectionData | undefined>>
}

const birthdayField = 'Fecha de nacimiento'
export const OneForm: React.FC<UpdateSectionProps> = ({ selectedSection, setSelectedSection }) => {
  const { setActMessage } = useContext(AppContext)
  const navigate = useNavigate()
  const { loadProfile, profile } = useContext(ProfileDetailContext)

  const methods = useForm<{ [key: string]: DynamicFormValuesType }>()
  const { t } = useTranslation()
  const { id } = useParams()

  const [fields, setFields] = useState<TypeJson[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const hiredDate = profile?.hiredDate ? dateToSpanish(profile.hiredDate) : ''

  const handleSuccess = async (message: string) => {
    setActMessage({ message: t(message), type: Variant.success })
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
  const sendRequest = async (data: { [key: string]: DynamicFormValuesType }) => {
    setIsFetching(true)
    const allPropertiesEmptyOrNull = Object.values(data).every(
      (value) => value === null || value === '',
    )

    if (!allPropertiesEmptyOrNull) {
      const hasValues = Object.keys(selectedSection.fieldsValues[0]?.fieldsValues ?? {}).length
      if (selectedSection.id && selectedSection.fieldsValues[0]?.id && hasValues) {
        const { data: resp, error } = await updateProfileDetailSection(
          id ?? '',
          selectedSection.fieldsValues[0].id,
          {
            keyword: selectedSection.keyword ?? '',
            fieldsValues: data,
          },
        )

        if (resp) {
          await handleSuccess('contributors.messages.sectionUpdatedSuccess')
          setSelectedSection(undefined)
        } else {
          handleErrors('contributors.messages.sectionUpdatedError', error)
        }
      } else {
        const { data: resp, error } = await createProfileDetailSection(id ?? '', {
          keyword: selectedSection.keyword ?? '',
          fieldsValues: data,
        })
        if (resp) {
          await handleSuccess('contributors.messages.sectionCreatedSuccess')
          setSelectedSection(undefined)
        } else {
          handleErrors('contributors.messages.sectionCreatedError', error)
        }
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
  const birthDate = methods.watch(birthdayField)
  useEffect(() => {
    if (birthDate) {
      const hasError = methods.formState.errors[birthdayField]
      if (!isTheSameDay(birthDate as string, hiredDate) && hasError) {
        methods.clearErrors(birthdayField)
      }
    }
  }, [birthDate, hiredDate, methods])

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
          const exitingKeys = fields.map((field) => field.label)
          const fieldsEntries = Object.entries(selectedSection.fieldsValues[0]?.fieldsValues ?? [])
          const fieldValues = Object({})
          fieldsEntries.forEach(([key, value]) => {
            if (exitingKeys.includes(key)) fieldValues[key] = value
          })
          methods.reset(valuesByNames(fields, fieldValues))
          if (hasBirthDate(fieldValues))
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
  }, [selectedSection?.keyword, selectedSection?.fieldsValues, methods]) // eslint-disable-line

  if (!isLoaded) return <Spinner />

  return (
    <>
      <Paper
        sx={
          fields && fields.length === 0 ? { ...styles.root, justifyContent: 'center' } : styles.root
        }
      >
        {fields && fields.length > 0 ? (
          <>
            <Box sx={{ display: 'flex' }}>
              <ButtonBack
                click={() => setSelectedSection(undefined)}
                sx={{ position: 'inherit' }}
              />
            </Box>
            <Typography sx={styles.title}>{NamesEnum[selectedSection.keyword ?? '']}</Typography>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                style={{ flexGrow: 1, display: 'flex' }}
              >
                <Box sx={styles.formContainer}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {fields.map((field, index) => (
                        <ReturnInput field={field} key={index} xs={6} />
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={styles.actionsContainer}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      disabled={isFetching}
                    >
                      {t('general.button.save')}
                    </Button>
                  </Box>
                </Box>
              </form>
            </FormProvider>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex' }}>
              <ButtonBack
                click={() => setSelectedSection(undefined)}
                sx={{ position: 'absolute', top: '30px' }}
              />
            </Box>
            <Box sx={styles.boxTitle}>
              <Typography component="span" sx={styles.text}>
                {`Es necesario configurar los campos que se mostrarán en la sección ${
                  NamesEnum[selectedSection.keyword ?? '']
                }. Para ello, acceda a la `}
              </Typography>
              <Typography
                component="span"
                sx={styles.typography}
                onClick={() => {
                  navigate(PathName.employeeStructure)
                }}
              >
                Definición de la Estructura de Datos
              </Typography>
            </Box>
          </>
        )}
      </Paper>
      <BirthdayModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
