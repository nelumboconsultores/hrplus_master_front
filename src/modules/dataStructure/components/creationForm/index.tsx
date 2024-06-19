import { FormProvider, useForm } from 'react-hook-form'
import { Box, Button, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { useContext, useEffect, useState } from 'react'
import { usePetitionBodyCreation } from '../../modules/companyStructure/hooks/usePetitionBodyCreation'
import { DynamicFieldsDAD } from '../../modules/companyStructure/components/FieldsDAD/dynamicField'
import { useNavigate } from 'react-router'
import { AppContext, FieldTypeEnumSelect, Variant } from 'core'
import {
  CreationFormProps,
  orgEntityRes,
} from 'modules/dataStructure/modules/companyStructure/types'
import { useServices } from 'modules/dataStructure/modules/companyStructure/hooks'
import { FormOrgContext } from 'modules/dataStructure/provider'
import { DynamicItem } from '../dynamicItem'
import { errorCodes } from 'core/locale/es/errorCodes'

export const CreationForm: React.FC<CreationFormProps> = (props) => {
  const { schema, returnBody } = usePetitionBodyCreation()
  const { services, listFields, removeActions, onFinish } = props
  const { connectService } = useServices()
  const { setActMessage } = useContext(AppContext)
  const { setLoading } = useContext(FormOrgContext)
  const navigate = useNavigate()
  const { t } = useTranslation()
  type SchemaType = z.infer<typeof schema> & { newPosition?: number }
  type FieldsAddType = SchemaType & { visible?: boolean; newPosition?: number }
  const [fieldsAdd, setFieldsAdd] = useState<Array<FieldsAddType>>([])
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { type: 0, required: false, unique: false, visible: true },
  })

  const replaceNullWithUndefined = <T extends object>(obj: T): T => {
    const newObj = { ...obj } as T
    for (const key in newObj) {
      if (newObj[key] === null) {
        (newObj[key] as unknown) = undefined
      }
    }
    return newObj
  }
  const onSubmit = async (data: SchemaType) => {
    setLoading(true)
    const position = methods.getValues('newPosition')
    const body = returnBody(data)
    if (body && body.validations) {
      body.validations = replaceNullWithUndefined(body.validations)
    }
    if (body) {
      const response = data.id
        ? await connectService<orgEntityRes>(
            {
              path: services.edit.path.replace('${fieldId}', data.id.toString()),
              type: services.edit.type,
            },
            {
              ...body,
              newPosition: position,
              visible: body.validations.required === true ? true : body.visible,
            },
          )
        : await connectService<orgEntityRes>(services.create, body)

      if (response.data) {
        const responseData = response.data.data

        fieldsAdd.push({
          ...data,
          id: responseData.id,
          visible: responseData.visible,
          newPosition: responseData.position,
        })
        fieldsAdd.sort((a, b) => (a?.newPosition ?? 0) - (b?.newPosition ?? 0))

        methods.reset({
          type: undefined,
          required: false,
          unique: false,
          visible: true,
        })
      }
      if (response.error) {
        if (response?.error?.errors?.code === 'C01MDFD09') {
          setActMessage({
            type: Variant.error,
            message: errorCodes.C01MDFD09,
          })
        } else {
          setActMessage({
            type: Variant.error,
            code: response?.error?.errors?.code,
          })
        }
      }
    }
    setLoading(false)
  }

  const clickEdit = (id: number) => {
    if (methods.getValues('id')) return
    const arrayEdit = fieldsAdd.find((field) => field.id === id)
    if (arrayEdit?.type === FieldTypeEnumSelect.file && typeof arrayEdit.fileType === 'string') {
      const newValue = (arrayEdit.fileType as string).split(',')
      if (newValue.length > 0) {
        arrayEdit.fileType = [newValue[0], ...newValue.slice(1)]
      }
    }
    methods.reset(arrayEdit)
    setFieldsAdd(fieldsAdd.filter((field) => field.id !== id))
  }

  const clickRemove = async (id: number) => {
    setLoading(true)
    const response = await connectService({
      path: services.remove.path.replace('${fieldId}', id.toString()),
      type: services.remove.type,
    })
    if (response.data) {
      setFieldsAdd(fieldsAdd.filter((field) => field.id !== id))
    }
    if (response.error) {
      setActMessage({
        type: Variant.error,
        code: response.error?.errors.code,
      })
    }
    setLoading(false)
  }

  const clickView = async (id: number) => {
    setLoading(true)
    const field = fieldsAdd.find((field) => field.id === id)
    if (field) {
      const changeVisible = {
        ...field,
        visible: !field.visible,
        required: !field.visible === false ? false : field.required,
      }
      const body = returnBody(changeVisible)
      if (body) {
        const response = await connectService<orgEntityRes>(
          {
            path: services.edit.path.replace('${fieldId}', id.toString()),
            type: services.edit.type,
          },
          body,
        )
        if (response.data) {
          setFieldsAdd(
            fieldsAdd.map((field) =>
              field.id === id
                ? {
                    ...field,
                    visible: !field.visible,
                    required: !field.visible === false ? false : field.required,
                  }
                : field,
            ),
          )
        }
        if (response.error) {
          setActMessage({
            type: Variant.error,
            code: response.error?.errors.code,
          })
        }
      }
    }
    setLoading(false)
  }
  const handleFinish = () => {
    if (onFinish) onFinish()
    navigate(-1)
  }

  useEffect(() => {
    if (listFields) setFieldsAdd(listFields)
  }, [listFields])
  return (
    <Box sx={styles.containerForm}>
      <Box>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Typography sx={{ fontWeight: 600 }}>{t('operatingLevel.table.add_edit')}</Typography>
            <Box sx={styles.fieldContainer}>
              <DynamicItem />
            </Box>
          </form>
        </FormProvider>
        <Typography sx={{ fontWeight: 600, marginY: '16px' }}>
          {t('operatingLevel.table.listFields')}
        </Typography>
        {fieldsAdd.length === 0 ? (
          <Typography sx={{ marginTop: '16px' }}>{t('operatingLevel.table.noFields')}</Typography>
        ) : (
          <DynamicFieldsDAD<FieldsAddType>
            fields={fieldsAdd}
            setFields={setFieldsAdd}
            click={{ edit: clickEdit, remove: clickRemove, view: clickView }}
            serviceEdit={services.edit}
            removeActions={removeActions}
          />
        )}
      </Box>
      <Box sx={styles.containerButtons}>
        <Button color="secondary" onClick={handleFinish}>
          {t('general.button.save')}
        </Button>
      </Box>
    </Box>
  )
}
{
  /* <Box sx={styles.containerForm}></Box> */
}
