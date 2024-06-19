import {
  AsyncReturnType,
  ServerError,
  ServicesError,
  getLocalStorage,
  saveLocalStorage,
  typeRQ,
} from 'core'
import { GET, PATCH, POST, PUT, request } from '.'

type loginResponse = {
  data: {
    token: string
    user: string
    tokenExpires: number
    refreshToken: string
    refreshTokenExpires: number
    acceptedTerms: boolean
    finishedLocalization: boolean
  }
}
type loginBody = {
  email: string | number
  password: string
}

export const login = async (body: loginBody): AsyncReturnType<loginResponse> => {
  const response = await POST<loginResponse, loginBody>('/login', body)
  return response
}

type EmailCodeResponse = {
  data: {
    send: boolean
  }
}
type EmailCodeBody = {
  email: string | number
  imei?: string
  accessCode?: string
  app: boolean
}

export const emailCode = async (body: EmailCodeBody): AsyncReturnType<EmailCodeResponse> => {
  const response = await POST<EmailCodeResponse, EmailCodeBody>('/auth/password-recovery', body)
  return response
}
type PasswordRecoveryResponse = {
  data: {
    valid: boolean
  }
}
type PasswordRecoveryBody = {
  email: string
  imei?: string
  accessCode: string
  app: boolean
}

export const passwordRecovery = async (
  body: PasswordRecoveryBody,
): AsyncReturnType<PasswordRecoveryResponse> => {
  const response = await POST<PasswordRecoveryResponse, PasswordRecoveryBody>(
    '/auth/password-recovery/valid',
    body,
  )
  return response
}

type PasswordRecoveryCancelResponse = {
  data: {
    valid: boolean
  }
}
type PasswordRecoveryCancelBody = {
  email: string
  imei?: string
  accessCode: string
  app: boolean
}

export const passwordRecoveryCancel = async (
  body: PasswordRecoveryBody,
): AsyncReturnType<PasswordRecoveryCancelResponse> => {
  const response = await POST<PasswordRecoveryCancelResponse, PasswordRecoveryCancelBody>(
    '/auth/password-recovery/cancel',
    body,
  )
  return response
}

type RecoverResponse = {
  data: {
    loginData: {
      token: string
      user: string
      tokenExpires: number
      refreshToken: string
      refreshTokenExpires: number
      verifiedCode: string
      setup: true
    }
    codeGranted: string
  }
}
type RecoveryBody = {
  email: string
  imei?: string
  password: string
  confirmPassword: string
  app: boolean
}

export const authPasswordRecover = async (body: RecoveryBody) => {
  const response = await PATCH<RecoverResponse, RecoveryBody>(`/auth/password-recovery`, body)
  return response
}

type UserRecoverBody = {
  email?: string
  app: boolean
}

export const authUserRecove = async (body: UserRecoverBody) => {
  const response = await POST<RecoverResponse, UserRecoverBody>(`/auth/user-recovery`, body)
  return response
}

let isRefreshingToken = false

export async function validateToken<T = unknown>(body: T, type: typeRQ, url: string) {
  if (isRefreshingToken) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return
  }

  isRefreshingToken = true
  const userInfo = getLocalStorage()

  try {
    const response = await PUT<loginResponse>(
      '/auth/refresh',
      { refreshToken: userInfo?.refreshToken },
      true,
    )
    if (response.data) {
      const dataLogin = {
        token: response.data.data.token,
        refreshToken: response.data.data.refreshToken,
      }
      saveLocalStorage({ ...(userInfo ?? Object({})), ...dataLogin })
    }
    if (response.error) {
      localStorage.clear()
      window.location.href = '/'
    }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  } finally {
    isRefreshingToken = false
  }

  return request<T>(url, body, type)
}

export const logout = async () => {
  const response = await GET('/logout')
  return response
}
