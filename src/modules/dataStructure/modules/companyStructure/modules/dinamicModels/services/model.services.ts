import { DinamicFields } from 'core'
import { GET } from 'core/services'

export const getFields = (code: string) => {
  const res = GET<{ data: DinamicFields[] }>(`/model-names/${code}/model-fields`)
  return res
}

type getModelNamesResponse = {
  data: {
    id: number
    name: string
    keyword: string
    createdAt: string
    allowRelationships: boolean
  }[]
}
export const getModelNames = async () => {
  const res = await GET<getModelNamesResponse>(`/model-names` + '?allowRelationship=true')
  return res
}
