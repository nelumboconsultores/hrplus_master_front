import { Box, Paper } from '@mui/material'
import { RoutesProvider } from '../routes'
import { BreadCrumbsList } from 'core'
import { styles } from './styles'
import { returnBreadCrumbs } from '../utils'

export const Layout = () => {
  const pathnames = location.pathname.split('/').filter((x) => x)

  const id = pathnames.find((x) => {
    const num = Number(x)
    return !isNaN(num)
  })
  const listBreadCrumbs = (): string[] | undefined => {
    const sendUrl =
      location.pathname.includes('estructura-geografica') ||
      location.pathname.includes('estructura-organizativa')
    if (!sendUrl || !id) return undefined
    return returnBreadCrumbs(id ?? '')
  }

  return (
    <Box sx={styles.root}>
      <BreadCrumbsList list={listBreadCrumbs()} />
      <Paper sx={styles.containerPaper}>
        <RoutesProvider />
      </Paper>
    </Box>
  )
}
