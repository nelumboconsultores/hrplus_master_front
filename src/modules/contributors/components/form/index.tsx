import { Box, Paper, Typography } from '@mui/material'
import { BreadCrumbsList, FieldTypeEnumSelect, ReturnInputFields } from 'core'
import { FormBody } from './formBody'
import { useEffect, useState } from 'react'
import { GetListInputsType, getListInputs } from 'modules/contributors/services'
import { getCatalogues } from 'core/services'
import { useTranslation } from 'react-i18next'
import Spinner from 'core/components/spinner'

export const GeneralForm = () => {
  const [inputs, setInputs] = useState<ReturnInputFields[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useTranslation()
  useEffect(() => {
    arrayFilling()
  }, []) // eslint-disable-line

  const arrayFilling = async () => {
    const response = await getListInputs()

    if (!response.data) return
    const promises = response.data.data.flatMap((element: GetListInputsType) => {
      return element.modelFieldResponses.map((input) => {
        if (input.fieldType.id === FieldTypeEnumSelect.catalog) {
          return getCats(input?.catalogueId).then((optionsCat) => ({
            id: input.id,
            name: element.keyword + '#' + input.name,
            label: input?.name ?? '',
            type: input.fieldType.id,
            validations: input.validations,
            optionsOut: optionsCat ?? [],
          }))
        } else {
          return Promise.resolve({
            id: input.id,
            name: element.keyword + '#' + input.name,
            label: input?.name,
            type: input.fieldType.id,
            validations: input.validations,
          })
        }
      })
    })
    const arrayInputs = await Promise.all(promises)

    setInputs(arrayInputs)
    setIsLoaded(true)
  }

  const getCats = async (catalogId: number) => {
    const response = await getCatalogues(catalogId)
    if (response?.data) {
      return response.data.subcategories.map((subcat) => ({
        value: subcat.name,
        label: subcat.name,
      }))
    } else {
      return []
    }
  }

  if (!isLoaded) return <Spinner />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <BreadCrumbsList />
      <Paper sx={{ padding: '32px 24px' }}>
        <Typography variant="h1" sx={{ marginBottom: '28px' }}>
          {t('contributors.title.newContributor')}
        </Typography>

        {inputs.length > 0 && <FormBody arrayInputs={inputs} />}
      </Paper>
    </Box>
  )
}
