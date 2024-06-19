import { DELETE, GET, PATCH, POST, PUT, getGenInfoFieldsResponse } from 'core/services'
import {
  DetailSection,
  ProfileDetails as ProfileDetailsType,
  StructureByType,
  WorkPeriod,
} from '../types'
import { DynamicFormValues, DynamicFormValuesType } from 'core'

export type CreateProfilesBody = {
  workPositionId: number
  sectionValues?: {
    keyword: string
    fieldsValues: DynamicFormValues
  }[]
}
export const createProfiles = async (body: CreateProfilesBody) => {
  const response = await POST('/profiles', body)
  return response
}

type ProfileDetails = {
  profile: ProfileDetailsType
  completedProfile: number
  sections: DetailSection[]
  workPeriod: WorkPeriod
  structuresByType: StructureByType[]
}

export const profileDetails = async (id: number | string) => {
  return await GET<{ data: ProfileDetails }>(`/profiles/${id}/profile-section-values`)
}

export const updateImageProfile = async (id: number | string, body: { fileUrl: string }) => {
  const response = await PATCH(`/profiles/${id}/image`, body)
  return response
}

export const getProfileSectionForm = async (id: number | string) => {
  return await GET<getGenInfoFieldsResponse>(`/profile-sections/${id}/model-fields`)
}
type ProfileDetailBody = {
  keyword: string
  fieldsValues: Record<string, DynamicFormValuesType>
}

export const createProfileDetailSection = async (id: string | number, body: ProfileDetailBody) => {
  return await POST<UpdateProfileDetailSectionResponse>(
    `/profiles/${id}/profile-section-values`,
    body,
  )
}

type UpdateProfileDetailSectionResponse = {
  data: {
    id: number
    profileSection: {
      id: number
      keyword: string
      name: string
      weight: number
      position: number
      isComplete: boolean
      isMultiple: boolean
      createdAt: string
    }
    fieldsValues: DynamicFormValues
    percentage: number
    isCompleted: boolean
  }
}
export const updateProfileDetailSection = async (
  id: string | number,
  sectionId: string | number,
  body: ProfileDetailBody,
) => {
  return await PUT<UpdateProfileDetailSectionResponse>(
    `/profiles/${id}/profile-section-values/${sectionId}`,
    body,
  )
}

export const updateWorkPosition = async (id: string | number, body: { workPositionId: number }) => {
  return await PUT(`/profiles/${id}`, body)
}

export const patchProfileActivation = (id: number) => {
  const response = PATCH(`/profiles/${id}/profile-activation`)
  return response
}
type RemoveProfileSectionResponse = {
  data: {
    success: true
  }
}
export const remove = (profileId: number, sectionId: number) => {
  const response = DELETE<RemoveProfileSectionResponse>(
    `/profiles/${profileId}/profile-section-values/${sectionId}`,
  )
  return response
}

//jornada de trabajo

type postAssignmentsBody = {
  profileIds: number[]
  temporal: false
  force: true
  allProfiles: false
}
type postAssignmentsResponse = {
  data: {
    profilesAdded: number
    workPeriodDetails: {
      id: number
      name: string
    }
    invalidProfiles: [
      {
        id: number
        conflictDetail: string
        gender: string
        orgProfileAccess: {
          id: number
          organigrama: {
            id: number
            name: string
            description: string
            parentId: number
          }
        }
        fullName: string
      },
    ]
  }
}

export const postAssignments = async (id: string, body: postAssignmentsBody) => {
  const response = await POST<postAssignmentsResponse, postAssignmentsBody>(
    `/work-periods/${id}/work-period-assignments`,
    body,
  )
  return response
}
