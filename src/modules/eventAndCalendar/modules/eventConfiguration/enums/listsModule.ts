export enum periodicityEnum {
  single = 1,
  repetitive = 2,
}

export const listPeriodicity = [
  { value: periodicityEnum.single, label: 'Evento único' },
  { value: periodicityEnum.repetitive, label: 'Evento que se repite' },
]

export const listReminder = [
  { value: 15, label: '15 minutos antes' },
  { value: 30, label: '30 minutos antes' },
  { value: 60, label: '1 hora antes' },
  { value: 120, label: '2 horas antes' },
  { value: 1400, label: '1 día antes' },
  { value: 2800, label: '2 días antes' },
  { value: 10080, label: '1 semana antes' },
  { value: 20160, label: '2 semanas antes' },
]
