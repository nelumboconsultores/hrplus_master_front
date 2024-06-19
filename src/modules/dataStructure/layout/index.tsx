import { Box, Paper } from '@mui/material'
import { CompleteTabs } from 'core/components/tabs'
import { BreadCrumbsList, PathName } from 'core'
import { RoutesProvider } from '../router'

export const Layout = () => {
  const pathnames = location.pathname.split('/').filter((x) => x)

  if (pathnames.length === 2)
    return (
      <Box>
        <BreadCrumbsList list={[PathName.UserStructure]} />

        <Paper sx={{ marginTop: '16px' }}>
          <CompleteTabs
            list={[
              { label: 'Empresas', href: PathName.DataStructure },
              {
                label: 'Empleados',
                href: PathName.employeeStructure,
              },
            ]}
          />
          <Box sx={{ padding: '16px 24px' }}>
            <RoutesProvider />
          </Box>
        </Paper>
      </Box>
    )

  if (pathnames.length > 2) return <RoutesProvider />
}
