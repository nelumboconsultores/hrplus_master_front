export enum ModelStatus {
  Active = 1,
  Inactive = 2,
  All = 3,
}

export const statusOptions = [
  { label: 'Activo', value: ModelStatus.Active },
  { label: 'Inactivo', value: ModelStatus.Inactive },
  { label: 'Todos', value: ModelStatus.All },
]

enum CostCenterStatus {
  Active = 'Activo',
  Inactive = 'Inactivo',
  All = 'Todos',
}

export const statusMapping: { [key: number]: CostCenterStatus } = {
  [ModelStatus.Active]: CostCenterStatus.Active,
  [ModelStatus.Inactive]: CostCenterStatus.Inactive,
  [ModelStatus.All]: CostCenterStatus.All,
}

export enum OrgEntityType {
  Operational = 'Estructura operativa',
  Organizational = 'Estructura organizacional',
}
