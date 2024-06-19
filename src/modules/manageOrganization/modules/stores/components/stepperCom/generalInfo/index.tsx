import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AppContext,
  GeneralAccordion,
  FieldTypeEnumSelect,
  PathName,
  ReturnInput,
  Variant,
} from 'core'
import Spinner from 'core/components/spinner'
import { getGenInfoFields } from 'core/services'
import { TypeJson } from 'core/components/returnInput/typeJson'

import { staticJson } from './staticJson'
import { ModelContext } from '../../../context'
import { firstDataType } from '../../../types/modelSaveData'
import { styles } from './styles'
import { ModelBody, createModel, updateModel } from '../../../services/model.services'
import { errorCodes } from 'core/locale/es/errorCodes'
import { ActionTypes, ModelKeywords } from '../../../enums'
import { GeoLocationAccordion } from './geoLocationAccordion'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'

export const GeneralInfo = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { loadData, modelState, modelDispatch } = useContext(ModelContext)
  const { setActMessage } = useContext(AppContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const methods = useForm<firstDataType>({
    defaultValues: !modelState.costCenter.id ? { statusId: 2 } : undefined,
  })
  const [jsonFields, setJsonFields] = useState<TypeJson[]>([])
  const [geoLocationFields, setGeoLocationFields] = useState<TypeJson[]>([])
  const [isFetching, setIsFetching] = useState(false)

  const hasChanges = (): boolean => {
    const currentValues = methods.getValues()
    const initialValues = modelState.initialFormInformation
    return JSON.stringify(currentValues) != JSON.stringify(initialValues)
  }
  const onSubmit = async (data: firstDataType) => {
    if (!data?.address) {
      return methods.setError('address', {
        type: 'required',
        message: t('general.validations.requiredName', { name: 'Dirección' }),
      })
    }
    if ((modelState?.id || id) && !hasChanges()) {
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
        address,
        zipcode,
        georefDistance,
        latitude,
        longitude,
        costCenterId,
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
        fieldsValues: { ...rest },
        address: address as string,
        zipcode: zipcode as string,
        georefDistance: georefDistance as number,
        latitude: latitude as number,
        longitude: longitude as number,
        ...(!!costCenterId && { costCenterId: costCenterId as number }),
      }
      const currentId = modelState.id ?? id
      const { data: resp, error } = await (!currentId
        ? createModel(body)
        : updateModel(currentId ?? '', body))
      if (resp) {
        const geoSize = modelState.geographicalElements.length
        const orgSize = modelState.organizationalElements.length
        if (geoSize > 0 || orgSize > 0) await loadData({ id: resp.data.id, step: 1, newData: resp })
        else {
          const message = id ? 'editSuccess' : 'createSuccess'
          setActMessage({
            message: t(`instancesStores.creation.notifications.${message}`),
            type: Variant.success,
          })
          navigate(`${PathName.instanceStoresDetail}/${resp.data.id}`)
        }
      }
      if (error) {
        if (error?.errors?.code === 'C01STRE05') {
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
              : t(`instancesStores.creation.notifications.${genericError}`),
            type: Variant.error,
          })
        }
      }
    }
    setIsFetching(false)
  }

  const getFields = async (): Promise<TypeJson[] | undefined> => {
    const response = await getGenInfoFields(ModelKeywords.Stores)
    if (response.data) {
      const sorted = response.data.data
        .sort((a, b) => a.position - b.position)
        .filter((item) => item.visible)

      const jsonReady = sorted.map((item) => {
        if (item.name === 'statusId') {
          return {
            id: item.id,
            type: FieldTypeEnumSelect.catalog,
            name: item.name,
            label: item.label,
            optionsId: item.catalogueId,
            validations: item.validations,
          }
        }

        return {
          id: item.id,
          type: item.fieldType.id as FieldTypeEnumSelect,
          name: item.name,
          label: item.label,
          placeholder: item.placeholder ?? '',
          optionsId: item.catalogueId,
          validations: item.validations,
        }
      })

      const firstThreeFields = staticJson.slice(0, 3).map((item) => {
        if (item.name === 'statusId') return { ...item, disabled: !modelState.costCenter.id }
        return item
      })
      const restFields = staticJson.slice(3)
      setJsonFields([...firstThreeFields, ...(jsonReady ?? [])])
      setGeoLocationFields(restFields)
      const fields = [...staticJson, ...(jsonReady ?? [])]
      return fields
    }
    return
  }

  useEffect(() => {
    if (modelState.costCenter.id) {
      const newFields = jsonFields.map((item) => {
        if (item.name === 'statusId') return { ...item, disabled: false }
        return item
      })
      setJsonFields(newFields)
    }
  }, [modelState.costCenter.id, setJsonFields]) // eslint-disable-line

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
        <Box width="100%">
          <GeneralAccordion
            title={t(`instancesStores.creation.title.generalInformation`)}
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
          <GeoLocationAccordion fields={geoLocationFields} />
        </Box>
        <Box justifyContent="flex-end" display="flex" width="100%">
          <Button type="submit" color="secondary" variant="contained" disabled={isFetching}>
            {t('general.button.continue')}
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}
