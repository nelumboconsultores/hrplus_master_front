import { PathName } from 'core'
import { Route, Routes } from 'react-router-dom'
import { UserSearch } from '../pages'
import { UsersProvider } from '../providers'

export const RoutesProvider = () => {
  return (
    <UsersProvider>
      <Routes>
        <Route path={PathName.UserSearch} element={<UserSearch />} />
      </Routes>
    </UsersProvider>
  )
}
