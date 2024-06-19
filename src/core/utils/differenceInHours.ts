export const diferenceInHours = (dateFrom: string, dateTo: string, numberOfDays?: number) => {
  const [hoursFrom, minutesFrom] = dateFrom.split(':').map(Number)
  const [hoursTo, minutesTo] = dateTo.split(':').map(Number)
  const dateFromInMinutes = hoursFrom * 60 + minutesFrom
  const dateToInMinutes = hoursTo * 60 + minutesTo
  const differenceInMinutes = dateToInMinutes - dateFromInMinutes

  if (numberOfDays) return (differenceInMinutes / 60) * numberOfDays

  return differenceInMinutes / 60
}
