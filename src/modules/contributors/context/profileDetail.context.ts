import { createContext } from 'react'
import { DetailSection, ProfileDetails, WorkPeriod } from '../types'

export const ProfileDetailContext = createContext<{
  profile: ProfileDetails & { completedProfile: number }
  sections: DetailSection[]
  workPeriod: WorkPeriod
  loadProfile: () => Promise<void>
  listSections: DetailSection[]
}>(Object({}))
