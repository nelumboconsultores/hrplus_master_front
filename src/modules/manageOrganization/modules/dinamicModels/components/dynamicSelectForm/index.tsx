import { Box } from '@mui/material'
import { DynamicFormType, InputsEnum, ItemsSelectType, ValueEnum } from 'core'
import { DetailCard } from './detailCard'
import { useContext, useEffect, useState } from 'react'
import { ModelContext } from '../../context'
import { GET, getInstances, getListResponse } from 'core/services'
import { FormMain } from './form'
import { DynamicSelectFormProps, listAuxType } from '../../types/modelSaveData'
import { removeDetails } from '../../services/model.services'
import { ActionTypes, TypeStructure } from '../../enums'

export const DynamicSelectForm: React.FC<DynamicSelectFormProps> = ({ type }) => {
  const [configData, setConfigData] = useState<DynamicFormType>()
  const { modelState, modelDispatch } = useContext(ModelContext)
  const [ListAux, setListAux] = useState<listAuxType[]>()
  useEffect(() => {
    const key = type === TypeStructure.org ? 'organizationalElements' : 'geographicalElements'
    if (modelState[key].length > 0) {
      getInstances(modelState[key][0]?.id, 0, '').then((response) => {
        const newOptions = response.data?.data.content.map((item) => {
          return {
            label: item.name,
            value: item.id,
          }
        })
        if (modelState) {
          const newData = modelState[key].map((item, index) => {
            const thisFather = modelState[key].find((father) => father.id === item.parentId)?.name

            const baseObject = {
              label: item.name,
              type: InputsEnum.SearchAutocomplete,
              placeHolder: `Introducir ${item.name}`,
              name: item.name,
              options: [],
              fathers: [`${thisFather}`],
              url: `/organization-entities/${item.id}/get-instances/idElection`,
              validations: {
                type: index === 0 ? ValueEnum.numberRequired : ValueEnum.numberOptional,
                required: index === 0 ? true : false,
                message: `El campo ${item.name} es requerido`,
              },
              getOptions: getOptions,
              disabledDelete: true,
              value: undefined,
            }
            if (index === 0) {
              return {
                ...baseObject,
                options: newOptions,
                value: newOptions?.length === 1 && newOptions?.[0],
                disabled: newOptions?.length === 1,
              }
            }

            return baseObject
          })
          setConfigData(newData ?? [])
        }
      })
    }
  }, [modelState.geographicalElements, modelState.organizationalElements]) // eslint-disable-line

  const getOptions = async (url: string): Promise<ItemsSelectType[]> => {
    const response = await GET<getListResponse>(url)
    if (response.data) {
      setListAux([...(ListAux ?? []), ...response.data.data.content])
      const newOptions = response.data.data?.content?.map((item) => {
        return {
          label: item.name,
          value: item.id,
        }
      })
      return newOptions
    }
    return []
  }
  const remove = async (id: number) => {
    const response = await removeDetails(modelState?.id ?? 6, id.toString())
    const key = type === TypeStructure.org ? 'organizationalFields' : 'geographicalFields'
    if (response.data) {
      const newModelData = modelState?.[key]?.filter((item) => item.id !== id)
      if (type === TypeStructure.org) {
        modelDispatch({ type: ActionTypes.SET_ORGANATIONAL_FIELDS, payload: newModelData ?? [] })
      } else {
        modelDispatch({ type: ActionTypes.SET_GEOGRAPHICAL_FIELDS, payload: newModelData ?? [] })
      }
    }
  }
  const key = type === TypeStructure.org ? 'organizationalFields' : 'geographicalFields'
  const idType = type === TypeStructure.org ? 'organizationalElements' : 'geographicalElements'
  const elemTraversed = modelState?.[key] ?? []
  return (
    <Box>
      {configData && (
        <FormMain
          configData={configData}
          ListAux={ListAux ?? []}
          type={type}
          disabled={!modelState[idType][0].hasMany && elemTraversed.length > 0}
        />
      )}

      {elemTraversed.length > 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '12px' }}>
          {elemTraversed.map((structure) => (
            <DetailCard key={structure?.id} structures={structure} onDelete={remove} />
          ))}
        </Box>
      )}
    </Box>
  )
}
