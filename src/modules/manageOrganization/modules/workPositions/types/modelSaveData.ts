import { TypeStructure } from '../enums'

export type ModelSaveData = { step: number; id?: number } | undefined

export type InputCascade = {
  id: number
  name: string
  requerido: boolean
  parentId: number
}

export type firstDataType = { [key: string]: string | number | boolean | number[] }

export type DynamicSelectFormProps = { type: TypeStructure }
export type itemSavedType = { id: number; data: { name: string; type: string }[] }[]

export type listAuxType = {
  id: number
  name: string
  parentId: number
}
