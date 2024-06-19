import { useContext, useEffect, useMemo, useState } from 'react'
import { Box, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { AppContext, ButtonBack, SwitchIOS, Variant, typeRQ } from 'core'

import { CreationForm } from 'modules/dataStructure/components/creationForm'
import { FormOrgProvider } from 'modules/dataStructure/provider'
import { typeFields } from 'modules/dataStructure/types'
import { dinamicFieldsMapper } from 'modules/dataStructure/utils/dinamicFieldsMapper'

import { Services, pageFinishMessage } from '../../enum'
import { changeMultipleStatus, getFields, getSection } from '../../services/model.services'
import { Info } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { errorCodes } from 'core/locale/es/errorCodes'

type FormCreationProps = { code: string }
export const FormCreation: React.FC<FormCreationProps> = ({ code }) => {
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const [checked, setChecked] = useState<boolean>(false)
  const [initialData, setInitialData] = useState<typeFields[]>([])
  const navigate = useNavigate()
  const disableSwitch = useMemo(() => initialData.some((item) => item.locked), [initialData])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getFields(code)
      if (data) {
        const newData = dinamicFieldsMapper(data.data)
        const sortedData = newData?.sort((a, b) => (a?.newPosition ?? 0) - (b?.newPosition ?? 0))
        setInitialData(sortedData ?? [])
      }
      const { data: sectionData } = await getSection(code)
      if (sectionData) setChecked(sectionData.data.isMultiple)
    }
    fetchData()
  }, [setInitialData, code])

  const onFinish = () => {
    setActMessage({ type: Variant.success, message: t(pageFinishMessage[code]) })
  }

  const handleChangeMultipleStatus = async () => {
    const { data, error } = await changeMultipleStatus(code, { active: !checked })
    if (data) setChecked(!checked)
    else {
      const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
      setActMessage({
        type: Variant.error,
        message: errorCode ?? t('operatingLevel.modals.changedMultipleStatusError'),
      })
    }
  }

  return (
    <FormOrgProvider>
      <Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <ButtonBack click={() => navigate(-1)} />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              '& .MuiSwitch-root': {
                margin: '0px 8px',
              },
              '& .MuiTypography-root': {
                fontSize: '0.95rem',
                lineHeight: '0.5rem',
              },
              '& .MuiFormControlLabel-root': {
                marginLeft: '4px',
              },
            }}
          >
            {disableSwitch && (
              <Tooltip title={t('contributors.messages.multipleDisable')}>
                <Info fontSize="small" color="disabled" />
              </Tooltip>
            )}

            <SwitchIOS
              label={t('operatingLevel.input.allowMultipleSections')}
              labelPlacement="start"
              disabled={disableSwitch}
              checked={checked}
              onClick={handleChangeMultipleStatus}
            />
          </Box>
        </Box>

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
          //   backButtonSx={{ position: 'absolute', top: 0 }}
        />
      </Box>
    </FormOrgProvider>
  )
}
