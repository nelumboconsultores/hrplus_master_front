import { Box } from '@mui/material'
import { BreadCrumbsList } from 'core'
import { DetailHeaderActions, DetailsLayout } from 'modules/contributors/components'
import { styles } from './styles'
import { ProfileDetailProvider } from 'modules/contributors/providers'

const DetailsView: React.FC = () => {
  return (
    <ProfileDetailProvider>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <BreadCrumbsList />
          <DetailHeaderActions />
        </Box>
        <DetailsLayout />
      </Box>
    </ProfileDetailProvider>
  )
}

export default DetailsView
