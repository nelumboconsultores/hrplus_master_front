import { AsyncReturnType, ServerError, ServicesError, typeRQ } from 'core'
import { getLocalStorage } from 'core/utils'
import { validateToken } from '.'

export const baseApiURL = import.meta.env.VITE_API_BASE_URL
const validateIsInInitialUrl = (): boolean => {
  const currentUrl = window.location.href
  const mainUrl = window.location.origin
  const isInInitialUrl = currentUrl === mainUrl || currentUrl === mainUrl + '/'
  return isInInitialUrl
}

async function GET<T = unknown>(url: string, key?: string): AsyncReturnType<T> {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`

  try {
    const response = await fetch(baseApiURL + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: accessToken }),
        Accept: '*/*',
        ...(key && { 'x-api-key': key }),
      },
    })
    const json = await response.json()
    if (response.status <= 299) return { data: json, error: null }
    if (response.status === 403 || response.status === 401) {
      const response = await validateToken<T>(Object({}), typeRQ.GET, url)
      if (response) {
        return response
      }
    }
    return { data: null, error: json }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  }
}

async function POST<T = unknown, P = object | string | number>(
  url: string,
  body: P,
  key?: string,
): AsyncReturnType<T> {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`
  try {
    const response = await fetch(baseApiURL + url, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: accessToken }),
        'Content-Type': 'application/json',
        Accept: '*/*',
        ...(key && { 'x-api-key': key }),
      },

      body: JSON.stringify(body),
    })
    const json: T = await response.json()
    if (response.status <= 299) return { data: json, error: null }
    if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
      const response = await validateToken<T>(Object(body), typeRQ.POST, url)
      if (response) {
        return response
      }
    }
    return { data: null, error: json as ServerError & ServicesError }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  }
}

async function PUT<T = unknown, P = object | string | number>(
  url: string,
  body: P,
  isRefresh: boolean = false,
  key?: string,
): AsyncReturnType<T> {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`
  try {
    const response = await fetch(baseApiURL + url, {
      method: 'PUT',
      headers: {
        ...(accessToken && { Authorization: accessToken }),
        ...(key && { 'x-api-key': key }),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const json = await response.json()
    if (response.status <= 299) return { data: json, error: null }
    if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
      if (!isRefresh) {
        const response = await validateToken<T>(Object(body), typeRQ.PUT, url)
        if (response) {
          return response
        }
      }
    }
    return { data: null, error: json }
  } catch (error) {
    return { data: null, error: body as ServerError & ServicesError }
  }
}

async function DELETE<T = unknown>(url: string, key?: string): AsyncReturnType<T> {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`
  try {
    const response = await fetch(baseApiURL + url, {
      method: 'DELETE',
      headers: {
        ...(key && { 'x-api-key': key }),
        ...(accessToken && { Authorization: accessToken }),
        'Content-type': 'application/json',
      },
    })
    try {
      const json = await response.json()
      if (response.status <= 299) return { data: json, error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        const response = await validateToken<T>(Object({}), typeRQ.DELETE, url)
        if (response) {
          return response
        }
      }
      return { data: null, error: json }
    } catch {
      if (response.status <= 299) return { data: Object({}), error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        const response = await validateToken<T>(Object({}), typeRQ.DELETE, url)
        if (response) {
          return response
        }
      }
      return { data: null, error: Object({}) }
    }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  }
}

async function PATCH<T = unknown, P = object | string | number>(
  url: string,
  body?: P,
): AsyncReturnType<T> {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`
  try {
    const response = await fetch(baseApiURL + url, {
      method: 'PATCH',
      headers: {
        ...(token && { Authorization: accessToken }),
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(body),
    })
    try {
      const json = await response.json()
      if (response.status <= 299) return { data: json, error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        const response = await validateToken<T>(Object(body), typeRQ.PATCH, url)
        if (response) {
          return response
        }
      }
      return { data: null, error: json }
    } catch {
      if (response.status <= 299) return { data: Object({}), error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        const response = await validateToken<T>(Object({}), typeRQ.PATCH, url)
        if (response) {
          return response
        }
      }
      return { data: null, error: Object({}) }
    }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  }
}

const request = async <T = unknown, P = unknown>(
  url: string,
  body: P,
  type: typeRQ,
): AsyncReturnType<T> => {
  const token = getLocalStorage()?.token
  const accessToken = `bearer ${token}`
  try {
    const requestOptions: RequestInit = {
      method: type,
      headers: {
        ...(token && { Authorization: accessToken }),
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    }

    if (type !== 'GET') {
      requestOptions.body = JSON.stringify(body)
    }

    const response = await fetch(baseApiURL + url, requestOptions)
    try {
      const json = await response.json()
      if (response.status <= 299) return { data: json, error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        localStorage.clear()
        window.location.href = '/'
      }
      return { data: null, error: json }
    } catch {
      if (response.status <= 299) return { data: Object({}), error: null }
      if ((response.status === 403 || response.status === 401) && !validateIsInInitialUrl()) {
        localStorage.clear()
        window.location.href = '/'
      }
      return { data: null, error: Object({}) }
    }
  } catch (error) {
    return { data: null, error: error as ServerError & ServicesError }
  }
}

export { GET, POST, PUT, DELETE, PATCH, request }
