import { Button, Grid } from '@mui/material'
import {
  AppContext,
  DynamicFormValues,
  OpenWithUpdate,
  PathName,
  ReturnInput,
  ReturnInputFields,
  Variant,
  isTheSameDay,
  validateIsAdult,
} from 'core'
import { FormProvider, useForm } from 'react-hook-form'
import { WorkPositionsForm } from './workPositionsForm'
import { CreateProfilesBody, createProfiles } from 'modules/contributors/services/profiles'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { errorCodes } from 'core/locale/es/errorCodes'
import { BirthdayModal } from '../details/updateSection/birthdayModal'

type FromBodyType = {
  arrayInputs: ReturnInputFields[]
}

const birthdayField = 'PSBI02#Fecha de nacimiento'
const hireDateField = 'PSPI01#Fecha de contratación'
export const FormBody: React.FC<FromBodyType> = ({ arrayInputs }) => {
  const methods = useForm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

  const sendRequest = async (data: DynamicFormValues) => {
    const body = transformObject(data)
    if (!body) return
    const response = await createProfiles(body)
    if (response.data) {
      setActMessage({
        message: t('contributors.messages.profileSuccessfullyCreated'),
        type: Variant.success,
      })
      navigate(PathName.contributorsModule, { state: { flag: true } })
    }
    if (response.error) {
      if (response.error?.errors?.code === 'C01USER11') {
        setActMessage({
          message: errorCodes.C01USER11,
          type: Variant.error,
        })
      } else {
        setActMessage({
          message: t('contributors.messages.errorCreatingProfile'),
          type: Variant.error,
        })
      }
    }
  }
  const openModal = () => {
    const birthDate = methods.watch(birthdayField)
    if (!birthDate) return
    if (!validateIsAdult(birthDate as string)) setShowModal(true)
  }
  const onSubmit = async (data: DynamicFormValues) => {
    const birthDate = data[birthdayField]
    const hiredDate = data[hireDateField]
    if (isTheSameDay(birthDate as string, hiredDate as string)) {
      return methods.setError(birthdayField, {
        type: 'manual',
        message: t('contributors.messages.sameDate'),
      })
    }
    await sendRequest(data)
  }
  const formatFields = (fields: ReturnInputFields[]) => {
    return fields.map((field) => {
      if (field.name === birthdayField) field.onBlur = openModal
      return field
    })
  }
  const transformObject = (input: DynamicFormValues) => {
    const output: CreateProfilesBody = {
      workPositionId: input.workPosition as number,
      sectionValues: [],
    }

    for (const key in input) {
      if (key === 'workPosition') continue

      const [keyword, field] = key.split('#')
      let section = output?.sectionValues?.find((s) => s.keyword === keyword)

      if (!section) {
        section = { keyword, fieldsValues: {} }
        output?.sectionValues?.push(section)
      }

      section.fieldsValues[field] = input[key]
    }

    return output
  }
  const birthDate = methods.watch(birthdayField)
  const hiredDate = methods.watch(hireDateField)
  useEffect(() => {
    if (birthDate) {
      const hasError = methods.formState.errors[birthdayField]
      if (!isTheSameDay(birthDate as string, hiredDate) && hasError) {
        methods.clearErrors(birthdayField)
      }
    }
  }, [birthDate, hiredDate, methods])
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <OpenWithUpdate title={t('contributors.title.basicCollaboratorProfile')} hiddenIcon>
            <Grid container spacing={2}>
              {formatFields(arrayInputs)?.map((input: ReturnInputFields, index) => (
                <ReturnInput field={input} key={index} />
              ))}
            </Grid>
          </OpenWithUpdate>
          <WorkPositionsForm />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 2 }}
          >
            {t('general.button.save')}
          </Button>
        </form>
      </FormProvider>
      <BirthdayModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}
