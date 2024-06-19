import { Box, Chip, Tooltip } from '@mui/material'
import { DynamicFormType, InputsEnum, ItemsSelectType, ValueEnum } from 'core'
import { useContext, useEffect, useState } from 'react'
import { GET, getInstances, getListResponse } from 'core/services'
import { FormMain } from './form'
import { styles } from './styles'
import { useFormContext } from 'react-hook-form'
import { DynamicSelectFormProps, listAuxType } from '../../types/modelSaveData'
import { TypeStructure } from '../../enums'
import { StrucData } from 'modules/manageOrganization/modules/stores/pages'
import { WorkPositionsContext } from '../../context'
import { Cancel } from '@mui/icons-material'

export const DynamicSelectForm: React.FC<DynamicSelectFormProps> = ({ type }) => {
  const [configData, setConfigData] = useState<DynamicFormType>()
  const { watch, setValue } = useFormContext()

  const { modelState } = useContext(WorkPositionsContext)
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
                value:
                  newOptions?.length === 1 && newOptions?.[0]
                    ? newOptions?.length === 1 && newOptions?.[0]
                    : undefined,
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
  const remove = async (id: string) => {
    const key = type === TypeStructure.geo ? 'geographyStructIds' : 'organizativeStructIds'
    const elemTraversed = watch(key) ?? []
    const newValues = elemTraversed.filter((item: StrucData) => item.id !== id)
    setValue(key, newValues)
  }
  const key = type === TypeStructure.geo ? 'geographyStructIds' : 'organizativeStructIds'
  const elemTraversed = watch(key) ?? []
  return (
    <Box>
      {configData && <FormMain configData={configData} ListAux={ListAux ?? []} type={type} />}

      {elemTraversed.length > 0 && (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {elemTraversed.map((structure: StrucData) => {
            const labels = Object.values(structure.data).map((data) => data?.label)
            const removeEmpty = labels.filter((label) => label && label !== '')
            return (
              <Chip
                sx={styles.chip}
                label={removeEmpty.join(' - ')}
                onDelete={() => remove(structure.id)}
                deleteIcon={
                  <Tooltip title="Eliminar">
                    <Cancel />
                  </Tooltip>
                }
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}
