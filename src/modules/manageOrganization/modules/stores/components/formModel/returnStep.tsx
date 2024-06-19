import { useContext } from 'react'
import { ModelContext } from '../../context'
import { GeneralInfo, GeoStructure, OrgStructure, WorkPositions, CostCenter } from '../stepperCom'
import { TypeStructure } from '../../enums'

export const ReturnStep = () => {
  const { modelState } = useContext(ModelContext)

  if (modelState?.step === 0) return <GeneralInfo />
  if (modelState?.step === 1) return <WorkPositions />
  if (modelState?.step === 2) return <GeoStructure />
  if (modelState?.step === 3) return <OrgStructure typeStructure={TypeStructure.org} />
  if (modelState?.step === 4) return <CostCenter />
}
