import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Grid } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext, FieldTypeEnumSelect, GeneralAccordion, ReturnInput, Variant } from 'core'
import Spinner from 'core/components/spinner'
import { getGenInfoFields } from 'core/services'
import { TypeJson } from 'core/components/returnInput/typeJson'

import { StaticJson } from './staticJson'
import { ModelContext } from '../../../context'
import { firstDataType } from '../../../types/modelSaveData'
import { styles } from './styles'
import { ModelBody, createModel, updateModel } from '../../../services/model.services'
import { errorCodes } from 'core/locale/es/errorCodes'
import { ActionTypes } from '../../../enums'
import { getDinamicDetailsPaths } from '../../../utils/getDinamicPaths'
import { getKeyword } from '../../../utils/getKeyword'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'

export const GeneralInfo = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { loadData, modelState, modelDispatch, modelLocale } = useContext(ModelContext)
  const { setActMessage } = useContext(AppContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const methods = useForm<firstDataType>()
  const [jsonFields, setJsonFields] = useState<TypeJson[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const isLastStep =
    !modelState.geographicalElements.length && !modelState.organizationalElements.length

  const hasChanges = () => {
    const currentValues = methods.getValues()
    const initialValues = modelState.initialFormInformation
    return JSON.stringify(currentValues) != JSON.stringify(initialValues)
  }
  const onSubmit = async (data: firstDataType) => {
    const toDetails = (newId?: string | number) => {
      const message = id ? 'editSuccess' : 'createSuccess'
      setActMessage({
        message: t(`${modelLocale}.creation.notifications.${message}`),
        type: Variant.success,
      })
      navigate(getDinamicDetailsPaths(pathname) + `/${newId ?? id ?? modelState.id}`)
    }

    if ((modelState?.id || id) && !hasChanges()) {
      if (isLastStep) return toDetails(modelState.id ?? id)
      return modelDispatch({ type: ActionTypes.SET_STEP, payload: 1 })
    }
    if (data && modelState) {
      setIsFetching(true)
      const {
        code,
        denomination,
        countryId,
        stateId,
        cityId,
        statusId,
        maxAuthorizedSalary,
        minAuthorizedSalary,
        ...rest
      } = data
      const trimmedCode = typeof code === 'string' ? code.trim() : code
      const trimmedDenomination =
        typeof denomination === 'string' ? denomination.trim() : denomination
      const body: ModelBody = {
        code: trimmedCode as string,
        denomination: trimmedDenomination as string,
        countryId: countryId as number,
        stateId: stateId as number,
        cityId: cityId as number,
        statusId: statusId as number,
        maxAuthorizedSalary: maxAuthorizedSalary as number,
        minAuthorizedSalary: minAuthorizedSalary as number,
        fieldsValues: { ...(rest as Record<string, string | number | boolean | number[]>) },
      }

      const currentId = modelState.id ?? id
      const { data: resp, error } = await (!currentId
        ? createModel(body)
        : updateModel(currentId ?? '', body))
      if (resp) {
        const geoSize = modelState.geographicalElements.length
        const orgSize = modelState.organizationalElements.length
        if (geoSize > 0 || orgSize > 0) await loadData({ id: resp.data.id, step: 1, newData: resp })
        else toDetails(resp.data.id)
      }
      if (error) {
        if (
          error?.errors?.code === 'C01CSTC05' ||
          error?.errors?.code === 'C01CTAB05' ||
          error?.errors?.code === 'C01CCAT05' ||
          error?.errors?.code === 'C01WPCA06'
        ) {
          const elementWithError = jsonFields.find((item) => item?.id === error?.errors?.id)
          const elementInsertErrors = elementWithError?.label?.toLocaleLowerCase()

          setActMessage({
            type: Variant.error,
            message: t('general.notifications.errorOnly', {
              value: elementInsertErrors,
              status: modelState.id ? 'editar' : 'crear',
            }),
          })
        } else {
          const genericError = modelState.id ? 'editError' : 'createError'
          const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
          setActMessage({
            message: errorCode
              ? errorCode
              : t(`${modelLocale}.creation.notifications.${genericError}`),
            type: Variant.error,
          })
        }
      }
      setIsFetching(false)
    }
  }

  const getFields = async (): Promise<TypeJson[] | undefined> => {
    const response = await getGenInfoFields(getKeyword(pathname))
    if (response.data) {
      const sorted = response.data.data
        .sort((a, b) => a.position - b.position)
        .filter((item) => item.visible)

      const jsonReady = sorted.map((item) => ({
        id: item.id,
        type: item.fieldType.id as FieldTypeEnumSelect,
        name: item.name,
        label: item.label,
        placeholder: item.placeholder ?? '',
        optionsId: item.catalogueId,
        validations: item.validations,
      }))
      setJsonFields([...StaticJson(pathname), ...(jsonReady ?? [])])
      return [...StaticJson(pathname), ...(jsonReady ?? [])]
    }
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      const jsonFields = await getFields()
      if (modelState?.id || id) {
        if (!Object.keys(modelState.initialFormInformation).length) {
          const fields = await loadData({ id })
          methods.reset(valuesByNames(jsonFields, fields))
        } else methods.reset(valuesByNames(jsonFields, modelState.initialFormInformation))
      }
      setIsLoaded(true)
    }

    if (jsonFields.length === 0) fetchData()
  }, []) // eslint-disable-line

  if (!isLoaded) return <Spinner />

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={styles.form as object}>
        <GeneralAccordion
          title={t(`${modelLocale}.creation.title.generalInformation`)}
          props={{
            accordionProps: {
              defaultExpanded: true,
              sx: { width: '100%' },
            },
          }}
        >
          <Grid container spacing={2}>
            {jsonFields?.map((item, index) => <ReturnInput field={item} key={index} />)}
          </Grid>
        </GeneralAccordion>

        <Box justifyContent="flex-end" display="flex" width="100%">
          <Button type="submit" color="secondary" variant="contained" disabled={isFetching}>
            {isLastStep ? 'Guardar' : t('general.button.continue')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}
