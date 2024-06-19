import { Box, Grid } from '@mui/material'
import { editDetailsInstance, getDetailsInstance, saveInstances } from 'core/services'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReturnField } from '../returnField'
import { FormProvider, useForm } from 'react-hook-form'
import {
  AppContext,
  DynamicFormValues,
  FieldTypeEnumSelect,
  InputRoot,
  PathName,
  Variant,
} from 'core'
import { LoadingButton } from '@mui/lab'
import { getListOrganizationsItems } from 'core/services/createRecords'
import { returnPathList } from 'modules/manageOrganization/utils'
import { HeaderTitle } from '..'
import { getLocalStorage } from '../../utils'
import { styles } from './styles'
import { ButtonBack } from 'modules/manageOrganization/components'
import Spinner from 'core/components/spinner'
import { valuesByNames } from 'core/utils/dinamicValuesByNames'
import { TypeJson } from 'core/components/returnInput/typeJson'

type responseFieldsType = {
  orgEntity: string
  fields: fieldsType[]
}

type fieldsType = {
  type: FieldTypeEnumSelect
  id: number
  name: string
  label: string
  value?: string | number | boolean
  validations: {
    required: boolean
    max_chars?: number
    min_chars?: number
    max_value?: number
    min_value?: number
  }
  fieldType: {
    id: number
    name: string
  }
  catId: number
  visible: boolean
}

export const ViewFormRecords: React.FC = () => {
  const navigate = useNavigate()
  const { id, oe_id, oe_pid, instanceId } = useParams()
  const { setActMessage } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  const routeRoad = getLocalStorage('routeRoad')
  const [information, setInformation] = useState<responseFieldsType>()
  const location = useLocation()
  const methods = useForm()
  const onSubmit = async (data: DynamicFormValues) => {
    if (!data || !oe_id || oe_pid === undefined) return
    setLoading(true)
    const { name, ...dataOnly } = data
    const trimObjectValues = (
      obj: Record<string, string | number | boolean | number[] | { name: string; id: number }[]>,
    ): Record<string, string | number | boolean | number[] | { name: string; id: number }[]> => {
      const trimmedObject: Record<
        string,
        string | number | boolean | Array<{ name: string; id: number }> | number[]
      > = {}

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key]
          if (Array.isArray(value)) {
            //trimmedObject[key] = value.length > 0 ? value[0] : ''
            trimmedObject[key] = value.length > 0 ? value : ''
          } else if (typeof value === 'string') {
            trimmedObject[key] = value.trim()
          } else {
            trimmedObject[key] = value
          }
        }
      }

      return trimmedObject
    }
    const trimmedDataOnly = trimObjectValues(dataOnly)
    const trimmedName = typeof name === 'string' ? name.trim() : name

    const body = {
      parentId: Number(oe_id) === 0 ? null : Number(oe_id),
      fieldValues: {
        ...trimmedDataOnly,
      },
      name: trimmedName,
    }

    const response = instanceId
      ? await editDetailsInstance(Number(oe_pid), Number(instanceId), body)
      : await saveInstances(Number(oe_pid), body)
    if (response?.data) {
      navigate(returnPathList(id ?? '1') + `/${id}`)
      setActMessage({
        message: t(
          instanceId ? 'creationRecords.messages.edit' : 'creationRecords.messages.success',
        ),
        type: Variant.success,
      })
    } else {
      setActMessage({
        type: Variant.error,
        code: response?.error?.errors?.code,
        elementInsertError: information?.fields.find(
          (item) => item.id === response?.error?.errors.id,
        )?.label,
      })
    }
    setLoading(false)
  }
  useEffect(() => {
    getFields()
  }, []) // eslint-disable-line

  const getFields = async () => {
    const response = await getListOrganizationsItems(Number(oe_pid))
    const newInformation = response.data?.data.fields.map((item) => {
      return {
        type: item.fieldType.id,
        id: item.id,
        label: item.label,
        name: item.name,
        validations: {
          required: item.validations.required,
          max_chars: item.validations.max_chars,
          min_chars: item.validations.min_chars,
          max_value: item.validations.max_value,
          min_value: item.validations.min_value,
          max_currency: item.validations.max_currency,
          min_currency: item.validations.min_currency,
          max_time: item.validations.max_time,
          min_time: item.validations.min_time,
          max_date: item.validations.max_date,
          depth: item.validations.depth,
          max_range: item.validations.max_range,
        },
        fieldType: {
          id: item.fieldType.id,
          name: item.fieldType.name,
        },
        catId: item.catalogueId,
        visible: item.visible,
      }
    })
    const newData = await getDetailsFields(newInformation ?? [])

    setInformation({
      orgEntity: response.data?.data.orgEntity.name ?? '',
      fields: newData ?? [],
    })
    setIsLoaded(true)
  }

  const getDetailsFields = async (newInformation: fieldsType[]): Promise<fieldsType[]> => {
    if (instanceId === undefined) return newInformation
    const response = await getDetailsInstance(Number(oe_pid), Number(instanceId))
    const arrayObject = valuesByNames(
      newInformation as TypeJson[],
      response?.data?.data?.fieldValues,
    )

    const array = newInformation.map((item) => {
      return {
        ...item,
        value: arrayObject?.[item.name as keyof typeof arrayObject],
      }
    })
    const objectFromReduce = array.reduce(
      (acc, { name, value }) => {
        acc[name] = (value as string | number | boolean) ?? ''
        return acc
      },
      {} as { [key: string]: string | number | boolean },
    )

    if (response.data) {
      methods.reset({
        name: response.data.data.name,
        ...objectFromReduce,
      })
    }
    return array as fieldsType[]
  }

  const returnLabelTitle = () => {
    if (location.pathname.includes(PathName.creationInsOrnManagement))
      return t('creationRecords.title.new')

    return t('creationRecords.title.edit')
  }
  if (!isLoaded) return <Spinner />

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={styles.form as React.CSSProperties}>
        <Box sx={{ position: 'relative', marginTop: '28px' }}>
          <Box sx={{ marginBottom: '4px' }}>
            <ButtonBack click={() => navigate(-1)} />
          </Box>

          <HeaderTitle
            title={returnLabelTitle() + ' ' + information?.orgEntity}
            routeRoad={routeRoad ?? []}
          />

          <Grid container sx={{ my: '16px' }} spacing={2}>
            <Grid item xs={4}>
              <InputRoot
                {...methods.register('name', {
                  required: {
                    value: true,
                    message: t('creationRecords.validations.required', {
                      campo: t('creationRecords.title.name'),
                    }),
                  },
                })}
                label={t('creationRecords.title.name')}
                error={!!methods.formState.errors.name}
                helperText={methods.formState.errors.name?.message as string}
                value={methods.watch('name') ?? ''}
              />
            </Grid>

            {information?.fields.map((field, index) =>
              field.visible ? (
                <ReturnField
                  key={index}
                  name={field.name}
                  label={field.label}
                  type={field?.fieldType?.id}
                  validations={field.validations}
                  catId={field.catId}
                />
              ) : (
                <></>
              ),
            )}
          </Grid>
        </Box>

        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          color="secondary"
          sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end' }}
        >
          {t('creationRecords.button.save')}
        </LoadingButton>
      </form>
    </FormProvider>
  )
}
