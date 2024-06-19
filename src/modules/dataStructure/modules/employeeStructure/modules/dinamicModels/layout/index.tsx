import { Box, Paper } from '@mui/material'
import { OnlyTitleTabs } from 'core/components/tabs'
import { BreadCrumbsList, ProfilePageKeyword, PathName } from 'core'
import { useTranslation } from 'react-i18next'
import { FormCreation } from '../pages/formCreation'
import { useParams } from 'react-router-dom'
import { pageBreadCrumbs, pageTitle } from '../enum'
import { styles } from './styles'

export const Layout = () => {
  const { '*': id } = useParams()
  const { t } = useTranslation()
  const code = ProfilePageKeyword[id ?? '']
  const listBreadCrumbs = [PathName.employeeStructure, pageBreadCrumbs[id ?? '']]

  return (
    <Box sx={{ height: '100%' }}>
      <BreadCrumbsList list={listBreadCrumbs} />

      <Paper sx={styles.paper}>
        <OnlyTitleTabs title={t(pageTitle[id ?? ''])} />
        <Box sx={styles.container}>
          <FormCreation code={code} />
        </Box>
      </Paper>
    </Box>
  )
}
