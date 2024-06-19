import { TypeOfDayEnum } from '../enums'

export const typeWorkingDays = [
  { value: TypeOfDayEnum.FixedHours, label: 'Horario Fijo / Turno Regular' },
  { value: TypeOfDayEnum.ShiftsVariable, label: 'Turnos con frecuencia variable' },
]

export const statusWorkingDays = [
  { label: 'Activo', value: 1 },
  { label: 'Inactivo', value: 2 },
  { label: 'Todos', value: 3 },
]

export enum StaWorkingEnum {
  Activo = 1,
  Inactivo = 2,
  Todos = 3,
}
