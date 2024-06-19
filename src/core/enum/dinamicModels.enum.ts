export enum ModulesIds {
  OperativeStructure = 1,
  OrganizationalStructure = 2,
  CostCenter = 3,
  TaxesCategories = 4,
  Tabs = 5,
  stores = 6,
  positions = 7,
  jobTitles = 8,
}

export const PageKeyword: Record<number | string, string> = {
  [ModulesIds.CostCenter]: 'CC01', // Centros de costo
  [ModulesIds.TaxesCategories]: 'CA01', // Categorías de puesto
  [ModulesIds.Tabs]: 'CT01', // Tabulador
  [ModulesIds.stores]: 'ST01', // Sucursales
  [ModulesIds.positions]: 'WP02', // Puestos
  [ModulesIds.jobTitles]: 'WP01', // Cargos
}
