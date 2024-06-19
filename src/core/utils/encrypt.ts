import { AES, enc } from 'crypto-js'
const key = import.meta.env.VITE_ENCRYPT_KEY
export const decrypt = (text: string) => {
  return AES.decrypt(text, key).toString(enc.Utf8)
}
export const encrypt = (text: string) => {
  return AES.encrypt(text, key).toString()
}

export const getLocalStorage = ():
  | {
      token: string
      refreshToken: string
      isAcceptedTerms: boolean
      isFinishedLocalization: boolean
      canSetup: boolean
    }
  | undefined => {
  try {
    const encryptedToken = localStorage.getItem('token')
    if (encryptedToken) {
      const token = decrypt(encryptedToken)
      return JSON.parse(token)
    }
    return
  } catch (error) {
    return
  }
}

export const saveLocalStorage = (token: {
  token: string
  refreshToken: string
  isAcceptedTerms: boolean
  isFinishedLocalization: boolean
  canSetup: boolean
}): void => {
  const corrrentToken = getLocalStorage() ?? {}
  const newToken = { ...corrrentToken, ...token }
  const encryptedToken = encrypt(JSON.stringify(newToken))
  localStorage.setItem('token', encryptedToken)
}
