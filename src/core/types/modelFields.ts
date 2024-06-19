export type ModelFields = {
  id: number
  label: string
  modelName: { id: number; name: string; keyword: string; createdAt?: string }
  name: string
  validations: {
    unique: boolean
    required: boolean
    max_value: number
    min_value: number
    max_chars: number
    min_chars: number
  }
  placeholder?: string
  catalogueId?: number
  fieldType: { id: number; name: string; hibernateLazyInitializer: object }
  visible: boolean
  used: boolean
  position: number
}
