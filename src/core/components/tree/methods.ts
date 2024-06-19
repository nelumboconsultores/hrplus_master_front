import { TreeItem, TreeItemOptions } from './types'

function addNewNode(array: TreeItem[], indices: number[], valor: TreeItem) {
  let tempArray = array

  for (let i = 0; i < indices.length - 1; i++) {
    const index = indices[i]
    if (tempArray[index] && tempArray[index].children) {
      tempArray = tempArray[index].children as TreeItem[]
    } else {
      return array
    }
  }

  const lastIndex = indices[indices.length - 1]
  if (tempArray[lastIndex] && tempArray[lastIndex].children) {
    tempArray = tempArray[lastIndex].children as TreeItem[]
  } else if (!tempArray[lastIndex]) {
    tempArray[lastIndex] = { children: [] }
    tempArray = tempArray[lastIndex].children as TreeItem[]
  }

  tempArray.push(valor)

  return array
}

function removeEmptyNodes(nodos?: TreeItem[]) {
  return nodos?.filter((nodo) => {
    if (nodo.type !== undefined && nodo.type !== '') {
      if (nodo.children && nodo.children.length > 0) {
        nodo.children = removeEmptyNodes(nodo.children)
      }
      return true
    }
    return false
  })
}

function modifyCardValue({
  indices,
  nuevoValor,
  array,
  id,
}: {
  array?: TreeItem[]
  indices: number[]
  nuevoValor?: TreeItem
  id?: string | number
}) {
  let newArrays: TreeItem[] | TreeItem | undefined = array
  for (const index of indices) {
    if ((newArrays as TreeItem[])[index] && id == (newArrays as TreeItem[])[index].id) {
      (newArrays as TreeItem[])[index] = {
        ...nuevoValor,
        children: [...(newArrays?.[index]?.children ?? [])],
      }
      break
    } else {
      if ((newArrays as TreeItem[])[index]) {
        newArrays = (newArrays as TreeItem[])[index]?.children
      }
    }
  }
  return array
}

function getListStringOfTypes({
  data,
  idAEliminar,
  indices,
}: {
  data: TreeItem[]
  idAEliminar: string
  indices: number[]
}) {
  let newArrays: TreeItem[] | TreeItem | undefined = data
  for (const index of indices) {
    if ((newArrays as TreeItem[])[index] && idAEliminar == (newArrays as TreeItem[])[index].id) {
      newArrays = newArrays?.[index]
      break
    } else {
      if ((newArrays as TreeItem[])[index]) {
        newArrays = (newArrays as TreeItem[])[index]?.children
      }
    }
  }

  function getListStringOfTypesRecursivo(node: TreeItem[]) {
    let tipos: string[] = []
    if (node) {
      for (let i = 0; i < node.length; i++) {
        if (node?.[i]) {
          tipos.push(node[i].type as string)

          if (node?.[i]?.children?.length) {
            tipos = tipos.concat(getListStringOfTypesRecursivo(node[i].children as TreeItem[]))
          }
        }
      }
    }
    return tipos
  }
  const tiposResultantes = getListStringOfTypesRecursivo((newArrays as TreeItem).children ?? [])
  return { tiposResultantes: [(newArrays as TreeItem).type, ...tiposResultantes] }
}

function removeItem({
  indices,
  array,
  id,
}: {
  array?: TreeItem[]
  indices: number[]
  id?: string | number
}) {
  const RemoveItemRecursive = (array: TreeItem[], indices: number[], id?: string | number) => {
    const firstIndex = indices.shift()
    const newArray: TreeItem[] = []

    if (array && (firstIndex || firstIndex == 0)) {
      for (const index in array) {
        const arrayInAnIndex = array[index]
        if (arrayInAnIndex.id != id) {
          if (index != firstIndex.toString()) {
            newArray.push(arrayInAnIndex)
          } else {
            if (arrayInAnIndex.children) {
              arrayInAnIndex.children = RemoveItemRecursive(arrayInAnIndex.children, indices, id)
              newArray.push(arrayInAnIndex)
            }
          }
        }
      }
    }
    return newArray
  }
  if (array && id) {
    return RemoveItemRecursive(array, indices, id)
  }
  return array
}

const updateFatherValue = ({ item, children }: { children?: TreeItem; item: TreeItemOptions }) => {
  if (!children) {
    return item
  } else {
    return { ...children, ...item }
  }
}

const temporalValueWhileAnItemIsSelected = () => ({
  id: new Date().getTime().toString(),
  name: '',
  type: '',
  children: [],
})
export {
  addNewNode,
  getListStringOfTypes,
  modifyCardValue,
  removeItem,
  removeEmptyNodes,
  updateFatherValue,
  temporalValueWhileAnItemIsSelected,
}
