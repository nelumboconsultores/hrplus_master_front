import { createContext, useContext, useState } from 'react'
import { AppContext, Variant } from 'core'
import { useTranslation } from 'react-i18next'
import { NAME, nestChildren, specialModuleCable, strIds } from '../utils/orderData'
import { saveConfigurations } from '../services/tableRelationships'

export const TableContext = createContext<{
  rows: RowsType[]
  setRows: React.Dispatch<React.SetStateAction<RowsType[]>>
  columns: ColumnsType[]
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType[]>>
  changeCheckedStatuses: (columnSelect: ColumnsType, rowSelect: RowsType) => void
  onSubmit: () => void
  changeSwitch: (str: number, ColumnsSelect: ColumnsType) => void
  reorderArray: (originalArray: ElementService[], str: number) => RowsType[]
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
}>(Object({}))
export type DynamicObject = { [key: string]: number[] }

export type RowsType = {
  str: number
  id: number | string
  parentId?: number
  children?: RowsType[]
  name: string
  typeItem?: string
}
export type ColumnsType = {
  key?: string
  orgEntityId?: DynamicObject
  headerName: string
  field: number | string
  hasMany?: number[]
  disabledSwitch?: number[]
  disabledColumn?: number[]
}

export type ElementService = {
  /// esto es lo que viene del back y no puede cambiarlo
  id: number
  name: string
  parentId: number
  orgEntityType: { id: number; name: string }
  recordCount: number
}

export const TableProvider = ({ children }: { children: React.ReactElement }) => {
  const [rows, setRows] = useState<RowsType[]>([])
  const [columns, setColumns] = useState<ColumnsType[]>([])
  const { setActMessage } = useContext(AppContext)
  const [strArray] = useState<DynamicObject>({})
  const [disabled, setDisabled] = useState<boolean>(true)
  const { t } = useTranslation()

  const changeCheckedStatuses = (
    columnSelect: ColumnsType,
    rowSelect: RowsType,
    arrayAdd: number[] = [],
  ) => {
    setDisabled(false)
    if (columnSelect?.orgEntityId?.[rowSelect.str]?.includes(Number(rowSelect.id))) {
      arrayAdd = columnSelect.orgEntityId[rowSelect.str].filter((id) => id !== rowSelect.id)
      if (rowSelect.children) {
        rowSelect.children.forEach((child) => {
          arrayAdd = deleteIdsInPotatoes(child, arrayAdd)
        })
      }
    } else {
      if (rowSelect.parentId) {
        const rowParent = findItemById(rows, Number(rowSelect.id))
        if (rowParent) collectIdsPotatoes(rowParent, arrayAdd)
      } else {
        arrayAdd.push(Number(rowSelect.id))
      }
    }
    const newColumns = columns?.map((column) => {
      if (column.field === columnSelect.field) {
        if (arrayAdd.length > 0) {
          if (
            (strArray[rowSelect.str].includes(Number(rowSelect.id)) &&
              columnSelect.field === specialModuleCable.cost_centers) ||
            (strArray[rowSelect.str].includes(Number(rowSelect.id)) &&
              columnSelect.field === specialModuleCable.stores &&
              rowSelect.str === 2)
          ) {
            return {
              ...column,
              orgEntityId: { ...column.orgEntityId, [rowSelect.str]: arrayAdd ?? [] },

              disabledSwitch: [...(column.disabledSwitch ?? []), rowSelect.str],
            }
          } else {
            return {
              ...column,
              orgEntityId: { ...column.orgEntityId, [rowSelect.str]: arrayAdd ?? [] },
            }
          }
        }
        if (arrayAdd.length === 0) {
          if (rowSelect.str === strIds.strGro) {
            return {
              ...column,
              orgEntityId: { ...column.orgEntityId },
              hasMany: column.hasMany?.filter((id) => id !== rowSelect.str),
              disabledSwitch: column.disabledSwitch?.filter((id) => id !== rowSelect.str),
            }
          } else {
            return {
              ...column,
              orgEntityId: { ...column.orgEntityId, [rowSelect.str]: arrayAdd ?? [] },
              hasMany: column.hasMany?.filter((id) => id !== rowSelect.str),
              disabledSwitch: column.disabledSwitch?.filter((id) => id !== rowSelect.str),
            }
          }
        }
      }
      return column
    })
    // console.log(newColumns, '<----- newColumns')

    setColumns(newColumns ?? [])
  }

  const collectIdsPotatoes = (row: RowsType, arrayAdd: number[] = []) => {
    arrayAdd.push(Number(row.id))
    if (row.parentId) {
      const rowParent = findItemById(rows, Number(row.parentId))
      if (rowParent) collectIdsPotatoes(rowParent, arrayAdd)
    }
  }

  const deleteIdsInPotatoes = (row: RowsType, arrayAdd: number[] = []) => {
    const rowSelect = findItemById(rows, Number(row.id))
    arrayAdd = arrayAdd.filter((id) => id !== row.id)
    if (rowSelect?.children && arrayAdd.length > 0) {
      rowSelect?.children.forEach((child) => {
        arrayAdd = deleteIdsInPotatoes(child, arrayAdd)
      })
    }
    return arrayAdd
  }

  const findItemById = (
    rowsFind: RowsType[],
    id: number,
    isFirst: boolean = true,
  ): RowsType | undefined => {
    for (const item of rowsFind) {
      if (item.id === id) return item
      if (
        (item.children && item.children.length > 1) ||
        (item.children && !isFirst && item.children.length > 0)
      ) {
        const found = findItemById(item.children, id, false)
        if (found) return found
      }
    }
    return undefined
  }

  const changeSwitch = (str: number, columnsSelect: ColumnsType) => {
    setDisabled(false)
    const newColumns = columns?.map((column) => {
      if (column.field === columnsSelect.field) {
        let arrayAdd = [...(column.hasMany ?? [])]
        if (arrayAdd.includes(str)) arrayAdd = arrayAdd.filter((id) => id !== str)
        else arrayAdd.push(str)

        return { ...column, hasMany: arrayAdd }
      }
      return column
    })
    setColumns(newColumns ?? [])
  }

  const reorderArray = (originalArray: ElementService[], str: number) => {
    const reorderedArray: RowsType[] = []
    const map = new Map()
    const usedIds = new Set<number>()
    strArray[str] = []
    originalArray.forEach((item) => {
      strArray[str].push(item.id)
      map.set(item.id, { str, id: item.id, parentId: item.parentId, children: [], name: item.name })
    })

    originalArray.forEach((item) => {
      if (!item.parentId) {
        reorderedArray.push(map.get(item.id))
        usedIds.add(item.id)
      } else {
        if (map.has(item.parentId)) map.get(item.parentId).children.push(item)
      }
    })
    const porElAmorAdiosQueEstoSirva = nestChildren(map, reorderedArray, usedIds)

    return porElAmorAdiosQueEstoSirva
  }

  const onSubmit = async () => {
    if (columns.length === 0) return
    let hasError = false
    for (const column of columns) {
      if (column?.field === NAME) continue
      Object.keys(strArray).forEach(async (key) => {
        const data = {
          orgEntityId: column?.orgEntityId?.[key]?.slice()?.reverse() ?? [],
          hasMany: column?.hasMany?.includes(Number(key)) ?? false,
          orgEntityTypeId: Number(key),
        }
        const response = await saveConfigurations(data, Number(column.field))
        if (response.error) {
          setActMessage({
            type: Variant.error,
            message: t('companyStructure.error.errorSavingConfiguration', {
              type: column.headerName,
            }),
          })
          hasError = true
          return
        }
      })
    }

    if (!hasError) {
      setActMessage({
        type: Variant.success,
        message: t('companyStructure.messages.theConfigurationHasBeenSavedSuccessfully'),
      })
      setDisabled(true)
    }
  }

  return (
    <TableContext.Provider
      value={{
        onSubmit,
        changeCheckedStatuses,
        rows,
        setRows,
        columns,
        setColumns,
        changeSwitch,
        reorderArray,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
