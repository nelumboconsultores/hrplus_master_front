import { Route, Routes } from 'react-router-dom'
import { PathName, getPath } from 'core'
import { EmployeeStructureModule } from '../modules/employeeStructure'
import { DataStructureModule } from '../modules/companyStructure'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path={getPath(PathName.DataStructure) + '/*'} element={<DataStructureModule />} />
      <Route
        path={getPath(PathName.employeeStructure) + '/*'}
        element={<EmployeeStructureModule />}
      />
    </Routes>
  )
}
