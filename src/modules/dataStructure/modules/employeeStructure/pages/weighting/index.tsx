import { Box, Typography } from '@mui/material'
import { BreadCrumbsList, PathName, TemplatePaper, ValueEnum } from 'core'
import { useTranslation } from 'react-i18next'
import { FormWeighting } from '../../components'
import { styles } from './styles'
import { useEffect, useState } from 'react'
import { SectionType } from '../../types'
import { NamesEnum } from '../../enum'
import { getModels } from '../../services/model.services'
import Spinner from 'core/components/spinner'

export const Weighting = () => {
  const { t } = useTranslation()
  const ListBreadCrumbs = [PathName.employeeStructure, PathName.employeeStructureWeighting]
  const [listSections, setListSections] = useState<SectionType[]>([])

  useEffect(() => {
    if (listSections.length === 0) {
      getModels().then((response) => {
        const newData = response?.data?.data.map((item) => {
          return {
            id: item.id,
            name: item.keyword,
            title: NamesEnum[item.keyword] ?? item.name,
            weight: item.weight,
            position: item.position,
            validations: {
              type: ValueEnum.numberRequired,
            },
          }
        })
        setListSections(newData ?? [])
      })
    }
  }, []) // eslint-disable-line

  return (
    <Box sx={styles.container}>
      <BreadCrumbsList list={ListBreadCrumbs} />
      <TemplatePaper>
        <Typography variant="h1">
          {t('companyStructure.title.weightingSectionsOfTheCollaboratorFile')}
        </Typography>
        {listSections.length > 0 ? <FormWeighting arrayInputs={listSections} /> : <Spinner />}
      </TemplatePaper>
    </Box>
  )
}
