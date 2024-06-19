export enum WorkPeriodMaxDurations {
  FullTime48Hours = '48HWFT',
  FullTime40Hours = '40HWFT',
  PartTime30Hours = '30HWPT',
  PartTime48Hours = '48HWST',
}

export const WorkPeriodMaxDurationsLabels = new Map<WorkPeriodMaxDurations, string>([
  [WorkPeriodMaxDurations.FullTime48Hours, 'Completa – 48 horas por semana'],
  [WorkPeriodMaxDurations.FullTime40Hours, 'Completa – 40 horas por semana'],
  [WorkPeriodMaxDurations.PartTime30Hours, 'Parcial por horas – 30 horas por semana'],
  [WorkPeriodMaxDurations.PartTime48Hours, 'Por turnos - 48 horas por semana'],
])

export const getWorkPeriodMaxTime = (maxTime: number) => {
  switch (maxTime) {
    case 1:
    case 4:
      return 48
    case 2:
      return 40
    case 3:
      return 30
  }
}

export const getWorkPeriodMaxTimeDay = (maxTime: number) => {
  switch (maxTime) {
    case 1:
      return 24
    case 2:
      return 12
    case 3:
      return 8
    case 4:
      return 6
    case 5:
      return 4
  }
}
