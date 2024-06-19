export type MotivfsRequest = {
  id: number
  name: string
  isActive: boolean
  isLocked?: boolean
  catalogueType?: {
    id: number
    name: string
  }
  solicitationCatalogs: [
    {
      id: number
      name: string
    },
  ]
  subcategories: {
    id: number
    name: string
  }[]
}
