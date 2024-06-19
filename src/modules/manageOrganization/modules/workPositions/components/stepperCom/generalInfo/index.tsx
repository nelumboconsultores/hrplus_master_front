import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { AppContext, Variant, arrayToObject } from 'core'
import Spinner from 'core/components/spinner'
import { firstDataType } from '../../../types/modelSaveData'
import { styles } from './styles'
import { ModelBody, createModel, updateWorksPositions } from '../../../services/model.services'
import { errorCodes } from 'core/locale/es/errorCodes'
import { BranchConfig, CostCenter, FormMain } from './components'
import { JobConfig } from './components/jobConfig'
import { WorkPositionsContext } from '../../../context'
import { getGenInfoFields, getGenInfoFieldsResponse } from 'core/services'
import { ModelKeywords } from '../../../enums'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'

export const GeneralInfo = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { jsonFields, modelState, loadData, generalInfo, setGeneralInfo } =
    useContext(WorkPositionsContext)
  const { setActMessage } = useContext(AppContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const methods = useForm<firstDataType>()
  const [isFetching, setIsFetching] = useState(false)
  const [fieldsData, setFieldsData] = useState<getGenInfoFieldsResponse | null>(null)
  const onSubmit = async (data: firstDataType) => {
    if (data && modelState) {
      setIsFetching(true)
      const {
        code,
        denomination,
        statusId,
        template,
        stores,
        workPosition,
        storeOrganizativeId,
        cost_center,
        ...rest
      } = data
      const trimmedCode = typeof code === 'string' ? code.trim() : code
      const trimmedDenomination =
        typeof denomination === 'string' ? denomination.trim() : denomination

      const body: ModelBody = {
        code: trimmedCode as string,
        denomination: trimmedDenomination as string,
        authorizedStaff: template as number,
        statusId: statusId as number,
        fieldsValues: { ...rest },
        storeId: stores as number,
        workPosCatId: workPosition as number,
        storeOrganizativeId: storeOrganizativeId as number,
        costCenterId: cost_center as number,
      }

      const currentId = modelState.id ?? id
      const { data: resp, error } = await (!currentId
        ? createModel(body)
        : updateWorksPositions(currentId ?? '', body))
      setIsFetching(false)
      if (resp) {
        loadData({ newData: resp, id: resp.data.workPosition.id, step: 1 })
      }

      if (error) {
        if (error?.errors?.code === 'C01WPOS06') {
          const elementWithError = jsonFields?.find((item) => item?.id === error?.errors?.id)
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
              : t(`instancesWorkPositions.creation.notifications.${genericError}`),
            type: Variant.error,
          })
        }
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (modelState.formInformation?.generalInfo && generalInfo) {
        const resetNew = arrayToObject(modelState.formInformation?.generalInfo.main)
        const select = generalInfo?.structureOrg.find((str) => str.check)
        const fieldsMaped = valuesByNames(jsonFields, resetNew)

        methods.reset({
          ...fieldsMaped,
          code: modelState.formInformation?.code,
          denomination: modelState.formInformation?.title,
          template: modelState.formInformation.generalInfo.authorizedStaff,
          workPosition: modelState.formInformation.generalInfo.workPositionId,
          cost_center: modelState.formInformation.generalInfo.cost_centerId,
          storeOrganizativeId: select?.id,
        })
      }
      if (!fieldsData) {
        const { data } = await getGenInfoFields(ModelKeywords.JobTitles)
        setFieldsData(data)
      }
    }
    fetchData()
    const isLoaded = Object.values(methods.getValues()).some((item) => item)

    if (id || modelState.id) setIsLoaded(isLoaded)
    else setIsLoaded(true)
  }, [modelState.formInformation?.generalInfo, generalInfo, fieldsData]) // eslint-disable-line
  if (!isLoaded) return <Spinner />
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={styles.form as object}>
        <Box>
          <FormMain fieldsData={fieldsData} />
          <BranchConfig generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
          <JobConfig />
          <CostCenter />
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
