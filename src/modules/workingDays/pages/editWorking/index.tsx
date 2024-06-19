import { Box } from '@mui/material'
import { styles } from './styles'
import { WorkshopForm } from 'modules/workingDays/components'
import { BreadCrumbsList } from 'core'

const EditWorking = () => {
  return (
    <Box sx={styles.container}>
      <BreadCrumbsList />
      <WorkshopForm />
    </Box>
  )
}

export default EditWorking
