import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppContext, ButtonBack, Variant, typeRQ } from 'core'

import { CreationForm } from 'modules/dataStructure/components/creationForm'
import { FormOrgProvider } from 'modules/dataStructure/provider'
import { typeFields } from 'modules/dataStructure/types'
import { dinamicFieldsMapper } from 'modules/dataStructure/utils/dinamicFieldsMapper'

import { Services, pageFinishMessage } from '../../enum'
import { getFields } from '../../services/model.services'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

type FormCreationProps = { code: string }
export const FormCreation: React.FC<FormCreationProps> = ({ code }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const [initialData, setInitialData] = useState<typeFields[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFields(code)
      if (data) {
        const newData = dinamicFieldsMapper(data.data)
        const sortedData = newData?.sort((a, b) => (a?.newPosition ?? 0) - (b?.newPosition ?? 0))
        setInitialData(sortedData ?? [])
      }
    }
    fetchData()
  }, [setInitialData, code])

  const onFinish = () => {
    setActMessage({ type: Variant.success, message: t(pageFinishMessage[code]) })
  }

  return (
    <Box>
      <Box sx={{ marginBottom: '12px' }}>
        <ButtonBack click={() => navigate(-1)} />
      </Box>

      <FormOrgProvider>
        <CreationForm
          services={{
            create: {
              path: Services.create.replace('{keyword}', code),
              type: typeRQ.POST,
            },
            edit: {
              path: Services.edit.replace('{keyword}', code),
              type: typeRQ.PUT,
            },
            remove: {
              path: Services.remove.replace('{keyword}', code),
              type: typeRQ.DELETE,
            },
          }}
          listFields={initialData}
          onFinish={onFinish}
        />
      </FormOrgProvider>
    </Box>
  )
}
