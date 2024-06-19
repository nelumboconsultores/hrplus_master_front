import { PathName } from 'core'
import { Route, Routes } from 'react-router-dom'
import { DataCreationModule } from '../modules/dataCreation'
import { LevelHierarchyModule } from '../modules/levelHierarchy'

export const RouteProvider = () => {
  return (
    <Routes>
      <Route path={PathName.DataCreation + '/*'} element={<DataCreationModule />} />
      <Route path={PathName.hierarchySummary + '/*'} element={<LevelHierarchyModule />} />
    </Routes>
  )
}
