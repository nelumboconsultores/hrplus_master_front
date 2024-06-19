export const compareOnlyLetters = (a: string, b: string) => {
  const aWithoutSpecialCharacters = a.replace(/[^a-zA-Z]/g, '')
  const bWithoutSpecialCharacters = b.replace(/[^a-zA-Z]/g, '')
  return aWithoutSpecialCharacters === bWithoutSpecialCharacters
}
