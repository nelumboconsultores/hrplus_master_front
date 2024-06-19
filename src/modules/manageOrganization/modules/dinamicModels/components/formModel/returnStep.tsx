import { useContext } from 'react'
import { ModelContext } from '../../context'
import { GeneralInfo, GeoStructure, OrgStructure } from '../stepperCom'
import { TypeStructure } from '../../enums'

export const ReturnStep = () => {
  const { modelState } = useContext(ModelContext)

  if (modelState?.step === 0) return <GeneralInfo />
  if (modelState?.step === 1) {
    if (modelState.geographicalElements) return <GeoStructure />
    else return <OrgStructure typeStructure={TypeStructure.org} />
  }
  if (modelState?.step === 2) return <OrgStructure typeStructure={TypeStructure.org} />
}
