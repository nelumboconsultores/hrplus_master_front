import { useContext, useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { IconButton, Tooltip } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  AppContext,
  DynamicFormType,
  DynamicGrid,
  Variant,
  areObjectsEqual,
  icons,
  useBuildSchema,
} from 'core'

import { useTranslation } from 'react-i18next'
import { StrucData } from 'modules/manageOrganization/modules/stores/pages'
import { TypeStructure } from '../../../enums'
import { listAuxType } from '../../../types/modelSaveData'

type FormMainProps = {
  configData: DynamicFormType
  ListAux: listAuxType[]
  type: TypeStructure
}

export const FormMain: React.FC<FormMainProps> = ({ configData, type }) => {
  const { t } = useTranslation()
  const { buildSchema } = useBuildSchema()
  const { setActMessage } = useContext(AppContext)
  const { getValues, setValue } = useFormContext()
  const methods = useForm({
    resolver: zodResolver(z.object({ ...buildSchema(configData) })),
  })

  useEffect(() => {
    methods.reset(
      configData.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: typeof item?.value === 'object' ? item?.value : item?.value,
        }
      }, {}),
    )
  }, [configData]) //eslint-disable-line

  const onSubmit = async () => {
    const data = methods.getValues()
    const filteredData = Object.entries(data).reduce(
      (acc: Record<string, string | number | boolean>, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {},
    )
    if (Object.keys(filteredData).length === 0) {
      return
    }
    const isGeo = type === TypeStructure.geo
    const oldValues = getValues(isGeo ? 'geographyStructIds' : 'organizativeStructIds') ?? []
    const isExist: boolean = oldValues.some((item: StrucData) => areObjectsEqual(item.data, data))
    if (isExist) {
      return setActMessage({
        type: Variant.error,
        message: t('instancesStores.view.notifications.estructureAlreadyExist'),
      })
    }
    const id = new Date().getTime()
    const newValues = [...oldValues, { id, data: data }]
    setValue(isGeo ? 'geographyStructIds' : 'organizativeStructIds', newValues)
    methods.reset(
      configData.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: typeof item?.value === 'object' ? item?.value : item?.value,
        }
      }, {}),
    )
  }

  return (
    <FormProvider {...methods}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DynamicGrid listInputs={configData ?? []} spacing={1} xs={4} getNameAndValue />
        <IconButton
          onClick={onSubmit}
          color="primary"
          sx={{
            alignSelf: 'flex-end',
            '& .MuiSvgIcon-root': {
              fontSize: '3rem',
            },
          }}
        >
          <Tooltip title={t('general.button.aggregate')}>{icons.add}</Tooltip>
        </IconButton>
      </div>
    </FormProvider>
  )
}
