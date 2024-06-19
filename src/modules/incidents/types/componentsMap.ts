export type TemplateTextBlockProps = {
  title: string
  keys?: string
  description?: string
  url?: string
  urlType?: string
  column?: string
  solicitationCatalogid?: number
  options?: { id: number; name: string }
  textRecordData?: TextRecordData[]
}

type TextRecordData = {
  id: number
  actionType: {
    id: number
    name: string
    type: number
  }
  description: string
  position: number
  solicitationActionType: {
    id: number
    name: string
    type: number
  }
}
