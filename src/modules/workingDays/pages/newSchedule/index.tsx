import { Box } from '@mui/material'
import { BreadCrumbsList } from 'core'
import { WorkshopForm } from 'modules/workingDays/components'
import { styles } from './styles'

const NewSchedule = () => {
  return (
    <Box sx={styles.container}>
      <BreadCrumbsList />
      <WorkshopForm />
    </Box>
  )
}

export default NewSchedule
