import { Box } from '@mui/material'
import { ConfigurationHeader } from '../../components'
import { TableConfigurations } from '../../components/tableConfigurations'
import { TableProvider } from '../../context'

const CompanyStructureMenu = () => {
  return (
    <TableProvider>
      <Box>
        <ConfigurationHeader />
        <TableConfigurations />
      </Box>
    </TableProvider>
  )
}

export default CompanyStructureMenu
