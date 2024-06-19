export enum WorkDayMaxDurations {
  H24 = '24H',
  H12 = '12H',
  H8 = '8H',
  H6 = '6H',
  H4 = '4H',
}

export const WorkDayMaxDurationsLabels = new Map<WorkDayMaxDurations, string>([
  [WorkDayMaxDurations.H24, '24 horas'],
  [WorkDayMaxDurations.H12, '12 horas'],
  [WorkDayMaxDurations.H8, '8 horas'],
  [WorkDayMaxDurations.H6, '6 horas'],
  [WorkDayMaxDurations.H4, '4 horas'],
])

export const getWorkDayMaxTime = (maxTime: number) => {
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
