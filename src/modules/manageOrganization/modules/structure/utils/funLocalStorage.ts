import { RouteRoad } from '../types'

export const setLocalStorage = (key: string, value: RouteRoad[]) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string): RouteRoad[] | null => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}
