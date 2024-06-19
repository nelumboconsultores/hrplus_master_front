import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from 'core/components/spinner'
import { DetailSection, ProfileDetails, WorkPeriod } from '../types'
import { ProfileDetailContext } from '../context'
import { profileDetails } from '../services/profiles'
import { getModels } from 'modules/dataStructure/modules/employeeStructure/services/model.services'
import { formatModelData } from '../utils/formatModelData'

export const ProfileDetailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<ProfileDetails & { completedProfile: number }>(Object({}))
  const [sections, setSections] = useState<DetailSection[]>([])
  const [workPeriod, setWorkPeriod] = useState<WorkPeriod>(Object({}))
  const [listSections, setListSections] = useState<DetailSection[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchData = useCallback(async () => {
    const { data: resp } = await getModels()
    if (resp) {
      const modelData: DetailSection[] = resp.data.map(formatModelData)
      setListSections(modelData)
    }
    const { data } = await profileDetails(id ?? '')
    if (data) {
      setProfile({
        ...data.data.profile,
        completedProfile: data.data.completedProfile,
        workPosition: {
          ...data.data.profile.workPosition,
          structuresByType: data.data.structuresByType,
        },
      })
      setSections(data.data.sections)
      setWorkPeriod(data.data.workPeriod)
      setIsLoaded(true)
    }
  }, [setIsLoaded, setProfile, setSections, setListSections, id]) // eslint-disable-line

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!isLoaded) return <Spinner />

  return (
    <ProfileDetailContext.Provider
      value={{ profile, sections, loadProfile: fetchData, listSections, workPeriod }}
    >
      {children}
    </ProfileDetailContext.Provider>
  )
}
