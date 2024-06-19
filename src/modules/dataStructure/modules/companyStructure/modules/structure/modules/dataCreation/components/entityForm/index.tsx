import { Box } from '@mui/material'
import { SaveEntityName } from '../saveEntityName'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { getListOrganizationsItems } from 'core/services/createRecords'
import { DataStructureContext } from 'modules/dataStructure/modules/companyStructure/provider'
import { CreationForm } from 'modules/dataStructure/components/creationForm'
import { ButtonBack, typeRQ } from 'core'
import { SerRouEnum } from 'modules/dataStructure/modules/companyStructure/enums'
import { typeFields } from 'modules/dataStructure/types'
import { dinamicFieldsMapper } from 'modules/dataStructure/utils/dinamicFieldsMapper'
import { FormOrgProvider } from 'modules/dataStructure/provider'

export const EntityForm = () => {
  const { idEntity: idE } = useParams()
  const navigate = useNavigate()
  const [nameEntity, setNameEntity] = useState<string>('')
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [fieldsAdd, setFieldsAdd] = useState<typeFields[]>([])
  const { setIdEntity, idEntity } = useContext(DataStructureContext)
  const transId = () => idEntity?.toString() ?? ''
  const isEditName = (idE && nameEntity) || !idE ? true : false
  const getDataFields = async () => {
    if (idE) {
      const response = await getListOrganizationsItems(Number(idE))
      if (!response.data) return
      setNameEntity(response.data.data.orgEntity.name)
      setIdEntity(response.data.data.orgEntity.id)
      setIsCompleted(response.data.data.orgEntity.isCompleted)
      const newData = dinamicFieldsMapper(response.data.data.fields)
      const sortedData = newData?.sort((a, b) => (a?.newPosition ?? 0) - (b?.newPosition ?? 0))
      setFieldsAdd(sortedData ?? [])
    }
  }
  useEffect(() => {
    setIdEntity(undefined)
    if (idE) {
      getDataFields()
      setIdEntity(Number(idE))
    }
  }, [idE]) // eslint-disable-line

  return (
    <Box
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        position: 'relative',
        paddingTop: '28px',
      }}
    >
      <Box sx={{ position: 'absolute', top: '1px', left: 0 }}>
        <ButtonBack click={() => navigate(-1)} />
      </Box>
      {isEditName && <SaveEntityName nameEntity={nameEntity} isCompleted={isCompleted} />}
      <Box sx={{ height: 'calc(100% - 47px)', marginTop: '8px' }}>
        <FormOrgProvider disable={Boolean(!idEntity)}>
          <CreationForm
            services={{
              edit: {
                path: SerRouEnum.EditAndRemoveOrgEntity.replace('${id}', transId()),
                type: typeRQ.PUT,
              },
              create: {
                path: SerRouEnum.CreateOrgEntity.replace('${id}', transId()),
                type: typeRQ.POST,
              },
              remove: {
                path: SerRouEnum.EditAndRemoveOrgEntity.replace('${id}', transId()),
                type: typeRQ.DELETE,
              },
            }}
            listFields={fieldsAdd}
          />
        </FormOrgProvider>
      </Box>
    </Box>
  )
}
