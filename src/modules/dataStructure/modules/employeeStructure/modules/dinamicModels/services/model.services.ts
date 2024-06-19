import { DinamicFields } from 'core'
import { GET, PATCH } from 'core/services'

export const getSection = (code: string) => {
  const res = GET<{
    data: {
      id: number
      keyword: string
      name: string
      weight: number
      position: number
      isComplete: boolean
      isMultiple: boolean
    }
  }>(`/profile-sections/${code}`)
  return res
}

export const getFields = (code: string) => {
  const res = GET<{ data: DinamicFields[] }>(`/profile-sections/${code}/model-fields`)
  return res
}

export const changeMultipleStatus = (code: string, body: { active: boolean }) => {
  const res = PATCH<{ data: { data: { success: boolean } } }>(
    `/profile-sections/${code}/state-multiple`,
    body,
  )
  return res
}
