import { Box, Paper } from '@mui/material'
import { WithTitleTabs } from 'core/components/tabs'
import { RouteProvider } from '../router'
import { BreadCrumbsList } from 'core'
import { useTranslation } from 'react-i18next'
import {
  returnBreadCrumbs,
  returnPathDataCreation,
  returnPathHierarchySummaryView,
  returnTitle,
} from '../utils'

export const Layout = () => {
  const { t } = useTranslation()
  const pathnames = location.pathname.split('/').filter((x) => x)
  const id = pathnames.find((x) => {
    const num = Number(x)
    return !isNaN(num)
  })
  const listBreadCrumbs = returnBreadCrumbs(id ?? '')

  const listTabs = [
    {
      label: t('operatingStructure.title.dataCreation'),
      href: returnPathDataCreation(id ?? '') + `/${id}`,
    },
    {
      label: t('operatingStructure.title.hierarchySummary'),
      href: returnPathHierarchySummaryView(id ?? '') + `/${id}`,
    },
  ]

  return (
    <Box sx={{ height: '100%' }}>
      <BreadCrumbsList list={listBreadCrumbs} />

      <Paper sx={{ marginTop: '16px', height: 'calc(100% - 48px)', position: 'relative' }}>
        <WithTitleTabs list={listTabs} title={t(returnTitle(id ?? ''))} />
        <Box sx={{ padding: '16px 24px', height: 'calc(100% - 82px)' }}>
          <RouteProvider />
        </Box>
      </Paper>
    </Box>
  )
}
