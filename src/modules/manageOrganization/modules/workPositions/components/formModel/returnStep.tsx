import { useContext } from 'react'
import { GeneralInfo, JobCategory, Tab } from '../stepperCom'
import { LevelGeoStr } from '../stepperCom/levelGeoStr'
import { WorkPositionsContext } from '../../context'
export const ReturnStep = () => {
  const { modelState } = useContext(WorkPositionsContext)

  switch (modelState?.step) {
    case 0:
      return <GeneralInfo />
    case 1:
      return <JobCategory />
    case 2:
      return <Tab />
    case 3:
      return <LevelGeoStr />
  }
}
