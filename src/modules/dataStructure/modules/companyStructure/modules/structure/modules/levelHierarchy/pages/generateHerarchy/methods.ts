import { TreeItem, TreeItemOptions } from 'core/components/tree/types'
import { Datum, OrganizationHierarchyBody } from 'core/services'

function transformarEstructura(data: Datum[]) {
  function transformarRecursivo(node: Datum) {
    const newNode = {
      id: node?.id?.toString(),
      type: node?.id?.toString(),
      name: node.name,
      children: [],
    } as TreeItem

    if (node?.children && !!node?.children?.length && newNode.children) {
      for (const child of node.children) {
        newNode.children.push(transformarRecursivo(child))
      }
    }

    return newNode
  }
  const nuevaEstructura = data.map(transformarRecursivo)

  return nuevaEstructura
}

function transformResponseToOptionsMenu(data: Datum[]) {
  // Función recursiva para transformar la estructura
  function transformarRecursivo(node: Datum): TreeItemOptions[] {
    const currentNode: TreeItemOptions = {
      id: node?.id?.toString() ?? '',
      type: node?.id?.toString() ?? '',
      name: node.name ?? '',
    }

    const childrenArray = []

    if (node?.children && node?.children?.length) {
      for (const child of node.children) {
        const childNode = transformarRecursivo(child)
        childrenArray.push(...childNode)
      }
    }

    return [currentNode, ...childrenArray]
  }

  // Crear la nueva estructura transformada
  const resultado = data.map(transformarRecursivo)

  // Obtener array plano de nodos y sus hijos
  const arraysDeNodos = resultado.flat()

  return arraysDeNodos
}

const transformDataToEndpointBody = (
  data: TreeItem[],
  parentId: string | null = null,
  flattenedData: OrganizationHierarchyBody[] = [],
) => {
  data.forEach((item) => {
    if (item.type) {
      flattenedData.push({
        id: item.id ? parseInt(item.id) : null,
        parentId: parentId !== null ? parseInt(parentId) : null,
      })

      if (item?.children?.length) {
        transformDataToEndpointBody(item.children, item.id, flattenedData)
      }
    }
  })

  return flattenedData
}

export { transformarEstructura, transformResponseToOptionsMenu, transformDataToEndpointBody }
