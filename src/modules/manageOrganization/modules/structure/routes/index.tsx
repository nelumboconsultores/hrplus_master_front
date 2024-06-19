import { PathName } from 'core'
import { Route, Routes } from 'react-router-dom'
import { ListInstances } from '../pages'
import { ViewFormRecords } from '../components'
import { DetailHierarchy } from '../pages/levelHirarchyDetail/pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path={PathName.listInstances + '/:id'} element={<ListInstances />} />
      <Route path={PathName.listInstances + '/:id/:oe_pid/:oe_id'} element={<ListInstances />} />

      <Route
        path={PathName.creationInsOrnManagement + '/:id/:oe_pid/:oe_id'}
        element={<ViewFormRecords />}
      />
      <Route
        path={PathName.editInsOrnManagement + '/:id/:oe_pid/:oe_id/:instanceId'}
        element={<ViewFormRecords />}
      />
      <Route path={PathName.treeOrgManagement + '/:id/*'} element={<DetailHierarchy />} />
    </Routes>
  )
}
