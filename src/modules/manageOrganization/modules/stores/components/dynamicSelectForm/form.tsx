import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, Tooltip } from '@mui/material'
import { AppContext, DynamicFormType, DynamicGrid, Variant, icons, useBuildSchema } from 'core'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { firstDataType, listAuxType } from '../../types/modelSaveData'
import { useContext, useEffect } from 'react'
import { ModelContext } from '../../context'
import { ActionTypes, TypeStructure } from '../../enums'
import { saveModelDetails } from '../../services/model.services'
import { useTranslation } from 'react-i18next'

type FormMainProps = {
  configData: DynamicFormType
  ListAux: listAuxType[]
  type: TypeStructure
  disabled?: boolean
}

export const FormMain: React.FC<FormMainProps> = ({ configData, type, disabled }) => {
  const { buildSchema } = useBuildSchema()
  const { t } = useTranslation()
  const { modelState, modelDispatch, addChildren } = useContext(ModelContext)
  const { setActMessage } = useContext(AppContext)
  const methods = useForm({
    resolver: zodResolver(
      z.object({
        ...buildSchema(configData),
      }),
    ),
  })
  useEffect(() => {
    methods.reset(
      configData.reduce((acc, item) => {
        return {
          ...acc,
          [item.name]: typeof item?.value === 'object' ? item?.value?.value : item?.value,
        }
      }, {}),
    )
  }, [configData]) //eslint-disable-line

  const onSubmit = async (data: firstDataType) => {
    const orgEntityDetail = Object?.entries(data)?.map(([, value]) => value)
    const orgEntityDetailIds: number[] = orgEntityDetail.filter(
      (item): item is number => typeof item === 'number',
    )
    const response = await saveModelDetails(modelState?.id ?? 6, {
      orgEntityDetailIds: orgEntityDetailIds,
    })
    if (response.data) {
      const info = response.data.data
      const arrayChildren: { name: string; type: string }[] = []
      arrayChildren.push({
        name: info?.structures[0]?.name,
        type: info?.structures[0]?.orgEntity.name,
      })
      if (info.structures[0].children) addChildren(arrayChildren, info.structures[0].children)
      if (type === TypeStructure.org) {
        modelDispatch({
          type: ActionTypes.SET_ORGANATIONAL_FIELDS,
          payload: [...modelState.organizationalFields, { id: info.id, data: arrayChildren }],
        })
      }
      if (type === TypeStructure.geo) {
        modelDispatch({
          type: ActionTypes.SET_GEOGRAPHICAL_FIELDS,
          payload: [...modelState.geographicalFields, { id: info.id, data: arrayChildren }],
        })
      }
      methods.reset()
    }
    if (response.error) {
      setActMessage({ type: Variant.error, message: 'Error al guardar los datos' })
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DynamicGrid listInputs={configData ?? []} spacing={1} xs={4} />
        <IconButton
          type="submit"
          color="primary"
          disabled={disabled}
          sx={{
            alignSelf: 'flex-end',
            '& .MuiSvgIcon-root': {
              fontSize: '3rem',
            },
          }}
        >
          <Tooltip title={t('general.button.aggregate')}>{icons.add}</Tooltip>
        </IconButton>
      </form>
    </FormProvider>
  )
}
