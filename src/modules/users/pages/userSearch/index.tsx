import { Box } from '@mui/material'
import { BreadCrumbsList, GeneralTitle, PathName } from 'core'
import { SearchView, UserList } from 'modules/users/components'
import { UsersContext } from 'modules/users/context'
import { useContext } from 'react'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'

export const UserSearch: React.FC = () => {
  const { view } = useContext(UsersContext)
  const { t } = useTranslation()

  return (
    <Box>
      <BreadCrumbsList list={[PathName.UsersView]} />
      <GeneralTitle sx={styles.title}>{t('users.title.userGroupManagement')}</GeneralTitle>
      {!view && <SearchView />}
      {view && <UserList />}
    </Box>
  )
}
