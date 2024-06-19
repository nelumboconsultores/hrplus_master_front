import { useForm } from 'react-hook-form'
import { InputName } from '../inputName'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { AppContext, Variant, useValidations } from 'core'
import { z } from 'zod'
import { createOrgEntity, editCreateOrgEntity } from 'core/services'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ResponseStates } from '../../enums'
import { DataStructureContext } from 'modules/dataStructure/modules/companyStructure/provider'

type SaveEntityNameProps = {
  nameEntity: string
  isCompleted: boolean
}

export const SaveEntityName: React.FC<SaveEntityNameProps> = ({ nameEntity, isCompleted }) => {
  const { t } = useTranslation()
  const { id, idEntity: idEN } = useParams()
  const { val } = useValidations()
  const [responseState, setResponseState] = useState<ResponseStates>(ResponseStates.init)
  const { idEntity, setIdEntity, loading, setLoading } = useContext(DataStructureContext)
  const { setActMessage } = useContext(AppContext)
  const [preName, setPreName] = useState<string>('')
  const schemaName = z.object({
    name: val.nameRequired,
  })
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<{ name: string }>({
    mode: 'onTouched',
    resolver: zodResolver(schemaName),
    defaultValues: { name: nameEntity ?? '' },
  })
  const onSubmitName = async (data: { name: string }) => {
    const nameNew = data.name.trim()
    if (!nameNew || nameNew === '' || preName === nameNew) return
    setResponseState(ResponseStates.loading)
    setLoading(true)
    const body = {
      name: data.name,
      parentId: null,
      orgEntityTypeId: Number(id),
    }
    const response = idEntity
      ? await editCreateOrgEntity(body, idEntity)
      : await createOrgEntity(body)
    setPreName(data.name)
    if (response.data) {
      if (!idEntity) setIdEntity(response?.data?.data?.id)
      setResponseState(ResponseStates.success)
    }
    if (response.error) {
      setResponseState(ResponseStates.error)
      setActMessage({ type: Variant.error, code: response.error.errors.code })
    }
    setLoading(false)
  }
  return (
    <form
      onBlur={watch('name') ? handleSubmit(onSubmitName) : (e) => e.preventDefault()}
      onSubmit={(e) => e.preventDefault()}
      style={{ marginTop: '4px' }}
    >
      <InputName
        {...register('name')}
        label={t(
          idEN ? 'operatingLevel.input.editLevelEntity' : 'operatingLevel.input.newLevelEntity',
        )}
        error={!!errors?.name}
        helperText={errors?.name?.message as string}
        loading={responseState}
        disabled={loading || isCompleted}
        showIcons={!idEN}
      />
    </form>
  )
}
