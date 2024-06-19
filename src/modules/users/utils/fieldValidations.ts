export const noBlanks = (event: React.ChangeEvent<HTMLInputElement>) =>
  (event.target.value = event.target.value.replace(/\s/g, ''))

export const noNumbers = (event: React.ChangeEvent<HTMLInputElement>) =>
  (event.target.value = event.target.value.replace(/[0-9]/g, ''))
