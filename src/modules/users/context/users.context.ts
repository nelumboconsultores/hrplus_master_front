import { DynamicFormValues, ItemsSelectType } from 'core'
import React, { createContext } from 'react'
import { DataUserTable, ErrorTableType } from '../types'

export const UsersContext = createContext<{
  view: boolean
  setView: React.Dispatch<React.SetStateAction<boolean>>
  isLoad: boolean
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>
  initVal: DynamicFormValues
  setInitVal: React.Dispatch<React.SetStateAction<DynamicFormValues>>
  sizeTable: number
  setSizeTable: React.Dispatch<React.SetStateAction<number>>
  rows: DataUserTable[]
  setRows: React.Dispatch<React.SetStateAction<DataUserTable[]>>
  selectedOption: string
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
  rowsError: ErrorTableType
  setRowsError: React.Dispatch<React.SetStateAction<ErrorTableType>>
  getDataTable: (
    page?: number,
    pageSize?: number,
    name?: string | null,
    sort?: string | null,
    search?: string,
    groupsIds?: number[],
  ) => void
  checkAll: boolean
  setCheckAll: React.Dispatch<React.SetStateAction<boolean>>
  idListSave: (id: number) => void
  profileIds: number[]
  setProfileIds: React.Dispatch<React.SetStateAction<number[]>>
  excludeProfileIds: number[]
  setExcludeProfileIds: React.Dispatch<React.SetStateAction<number[]>>
  listGroups: ItemsSelectType[]
  setListGroups: React.Dispatch<React.SetStateAction<ItemsSelectType[]>>
}>(Object({}))
