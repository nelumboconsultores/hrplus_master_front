export const isNotEmail = (email: string) => {
  return !email.includes('@')
}

export const obscureCode = (code: string) => {
  const last4Letters = code.slice(-4)
  return `${new Array(code.length - 4).join('*')}${last4Letters}`
}

export const obscureEmail = (email: string) => {
  if (isNotEmail(email)) return obscureCode(email)
  const [name, domain] = email.split('@')

  const last4Letters = name.slice(-4)
  return `${new Array(name.length - 4).join('*')}${last4Letters}@${domain}`
}
