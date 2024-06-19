import { request } from 'core/services'
import { ServicesConfig } from 'core/types/dropdownColorProps'

export const useServices = () => {
  const connectService = async <P, T = unknown>(config: ServicesConfig, body?: T) => {
    const response = await request<P>(config.path, body, config.type)
    return response
  }
  return { connectService }
}
