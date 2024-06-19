import { Route, Routes } from 'react-router-dom'
import { DataCreationProvider } from '../provider'
import { PathName } from 'core'
import { DataEdit } from '../pages/datEdit'
import { DataCreation, EntityList } from '../pages'

export const RouteProvider = () => {
  return (
    <Routes>
      <Route
        path={PathName.createEntity + '/:id'}
        element={
          <DataCreationProvider>
            <DataCreation />
          </DataCreationProvider>
        }
      />

      <Route path={'/:id'} element={<EntityList />} />
      <Route
        path={PathName.operatingLevelFormEdit + '/:id/:idEntity'}
        element={
          <DataCreationProvider>
            <DataEdit />
          </DataCreationProvider>
        }
      />
    </Routes>
  )
}
