//Changes any character to a void except numbers
export const onlyNumbers = (value: string) => value.replace(/([^0-9])/g, '')
