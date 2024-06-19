import { ColumnsType, DynamicObject, RowsType } from '../context'
import { EnumConfigRelation } from '../enums'

export const NAME_MAIN = 'NAME_MAIN'
export const CHECKS = 'CHECKS'
export const NAME = 'NAME'

type data = {
  id: number
  name: string
  keyword: string
  createdAt: string
  allowRelationships: boolean
}[]

type blocks = {
  id: number
  name: string
}[]

export type blocksReady = {
  id: number
  typeItem: string
  label: string
}

export const orderBlocks = (data: blocks): blocksReady[] => {
  const titles = data.map((item) => {
    return {
      id: item.id,
      typeItem: NAME_MAIN,
      label: item.name,
    }
  })
  return titles
}

export const orderTitles = (data: data, str: blocksReady[]): ColumnsType[] => {
  const dynamicObject: DynamicObject = {}
  str.forEach((key) => {
    if (!dynamicObject[key.id]) dynamicObject[key.id] = []
  })
  const titles = data.map((item) => {
    return {
      key: item.keyword,
      field: item.id,
      headerName: EnumConfigRelation[item.name],
      orgEntityId: dynamicObject,
      hasMany: [],
      disabledSwitch: [],
      disabledColumn: [],
    }
  })

  return [
    {
      field: NAME,
      headerName: 'Listado de relaciones',
    },

    ...titles,
  ]
}

export const nestChildren = (
  map: Map<number, RowsType>,
  reorderedArray: RowsType[],
  usedIds: Set<number>,
) => {
  map.forEach((item) => {
    if (item?.children?.length === 1 && !usedIds.has(Number(item.id))) {
      if (item.parentId === reorderedArray[reorderedArray.length - 1].id) {
        reorderedArray.push(item)
        usedIds.add(Number(item.id))
        nestChildren(map, reorderedArray, usedIds)
      }
    }

    if (item?.children && item?.children?.length > 1 && !usedIds.has(Number(item.id))) {
      if (item.parentId === reorderedArray[reorderedArray.length - 1].id) {
        usedIds.add(Number(item.id))
        const newChildren = add(map, usedIds, item.children)
        reorderedArray.push({
          ...item,
          children: newChildren,
        })
      }
    }

    if (item?.children?.length === 0 && !usedIds.has(Number(item.id))) {
      if (item.parentId === reorderedArray[reorderedArray.length - 1].id) {
        reorderedArray.push(item)
        usedIds.add(Number(item.id))
      }
    }
  })
  return reorderedArray
}

const add = (map: Map<number, RowsType>, usedIds: Set<number>, children: RowsType[]) => {
  const newItem = children.map((item) => {
    const childrenFind = findChildren(Array.from(map.values()), Number(item.id))

    if (childrenFind.length > 0) {
      item = {
        ...item,
        children: add(map, usedIds, childrenFind),
      }
    }

    usedIds.add(Number(item.id))
    return item
  })
  return newItem
}

const findChildren = (data: RowsType[], parentId: number): RowsType[] => {
  return data.filter((child) => child.parentId === parentId)
}

export const listBlocks = [
  {
    id: 1,
    name: 'Nivel de la Estructura Geográfica',
  },
  {
    id: 2,
    name: 'Nivel de la Estructura Organizativa',
  },
]

export const strIds = {
  strGro: 1,
  strOrg: 2,
}

export const specialModuleCable = {
  cost_centers: 1,
  stores: 3,
  work_positions: 5,
}
