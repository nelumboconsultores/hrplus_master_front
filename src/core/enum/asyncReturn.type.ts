export type ServicesError = {
  errors: {
    code: string
    description: string
    fields: Array<string>
    element: string
    invalids: { id: number; name: string }[]
    id: number
  }
}
export type ServerError = { message: string; code: string }

export type AsyncReturnType<T = unknown> = Promise<ResponseType<T>>

export type ResponseType<T> = {
  data: T | null
  error: null | (ServerError & ServicesError)
}
