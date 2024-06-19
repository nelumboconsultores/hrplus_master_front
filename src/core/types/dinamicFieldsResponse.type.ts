export type getListItemsResponse = {
  data: {
    orgEntity: {
      id: number
      name: string
      parentId: number
      isCompleted: boolean
    }
    fields: DinamicFields[]
  }
}

export type DinamicFields = {
  id: number
  name: string
  label: string
  validations: {
    required: boolean
    max_chars?: number
    min_chars?: number
    max_value?: number
    min_value?: number
    unique?: boolean
    max_date?: string
    max_range?: number
    max_currency: number
    min_currency: number
    max_time: string
    min_time: string
    file_type: string
    max_size: number
    depth: number
  }
  fieldType: {
    id: number
    name: string
  }
  catalogueId: number
  visible: boolean
  position: number
  locked: boolean
  used: boolean
}
