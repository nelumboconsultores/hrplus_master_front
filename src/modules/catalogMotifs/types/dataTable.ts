export type DataCatalog = {
  id: number
  subcategories: string[]
  relationship: string
  catalogueTypeId: number
  isActive: boolean
  name: string
  isLocked?: boolean
}

export type DataCatalogIncidents = {
  id: number
  name: string
  description: string
  amountAssociations: number
  amountRegisters: number
  isActive: boolean
}
