import Box from '@mui/material/Box'
import { useContext, useEffect } from 'react'
import { getModelNames } from '../../modules/dinamicModels/services/model.services'
import {
  CHECKS,
  NAME,
  NAME_MAIN,
  blocksReady,
  listBlocks,
  orderBlocks,
  orderTitles,
  specialModuleCable,
  strIds,
} from '../../utils/orderData'
import { getListOrganizations } from 'core/services'
import { TableMain } from './table'
import { ColumnsType, DynamicObject, RowsType, TableContext } from '../../context'
import { generateUniqueId } from 'core'
import { GetRelationshipsData, getRelationships } from '../../services/tableRelationships'
import Spinner from 'core/components/spinner'

export const TableConfigurations = () => {
  const { setColumns, setRows, reorderArray, rows, columns } = useContext(TableContext)

  const getMainsTitles = async () => {
    const res = await getModelNames()
    if (res.data) {
      const body = orderBlocks(listBlocks) //El cuerpo de la tabla
      const titles = orderTitles(res.data?.data, body) //La cabecera

      await getBodyAll(body, []) //lo ordena
      const titlesEdit = []
      for (const item of titles) {
        if (item.field === NAME) titlesEdit.push(item)
        else {
          const bodyId = await getRelationships(item.key ?? '')
          if (bodyId.data) {
            const checks = saveCheck(bodyId.data?.data, item)
            const sorted: Record<number | string, number[]> = {}
            Object.entries(checks.orgEntityId ?? {}).forEach(([key, value]) => {
              if (!value?.length) sorted[key] = value
              else sorted[key] = value.reverse()
            })
            checks.orgEntityId = sorted

            titlesEdit.push(checks)
          }
        }
      }

      setColumns(titlesEdit)
    }
  }
  const getBodyAll = async (body: blocksReady[], bodyComplete: RowsType[]) => {
    const strArray: DynamicObject = {}

    for (const item of body) {
      bodyComplete.push({
        str: item.id,
        id: generateUniqueId(),
        typeItem: NAME_MAIN,
        name: item.label,
      })
      const entities = await getListOrganizations('orgEntityTypeId=' + item.id)
      strArray[item.id] = []
      entities.data?.data.content.forEach((element) => {
        strArray[item.id].push(element.id)
      })
      if (entities.data) {
        const elementStr = reorderArray(entities.data.data.content, item.id)
        bodyComplete.push(...elementStr)
        bodyComplete.push({
          str: item.id,
          id: generateUniqueId(),
          typeItem: CHECKS,
          name: 'Permite agregar niveles múltiples',
        })
      }
    }
    setRows([...bodyComplete])
    return strArray
  }

  const saveCheck = (body: GetRelationshipsData[], itemTitle: ColumnsType) => {
    let newItem = { ...itemTitle }

    body.forEach((element) => {
      // Para saber el tipo de estructura debo consultar element.orgEntityTypeId
      newItem = {
        ...newItem,
        orgEntityId: {
          ...(newItem.orgEntityId ?? {}),
          [element?.orgEntityTypeId]: [
            ...(newItem?.orgEntityId?.[element?.orgEntityTypeId] ?? []),
            element.id,
          ],
        },
        hasMany: element.hasMany
          ? [...(newItem?.hasMany ?? []), element.orgEntityTypeId]
          : newItem.hasMany,
        disabledSwitch:
          newItem?.field === specialModuleCable.cost_centers ||
          (newItem?.field === specialModuleCable.stores &&
            element.orgEntityTypeId === strIds.strOrg)
            ? [...(newItem?.disabledSwitch ?? []), element.orgEntityTypeId]
            : newItem?.disabledSwitch,
        disabledColumn: element.used
          ? [...(newItem?.disabledColumn ?? []), element.orgEntityTypeId]
          : newItem?.disabledColumn,
      }
      if (element?.children?.length > 0) newItem = saveCheck(element?.children, newItem)
    })
    return newItem
  }

  useEffect(() => {
    if (columns.length === 0) getMainsTitles()
  }, []) // eslint-disable-line

  return (
    <Box
      sx={{
        my: '16px',
        width: '100%',
        '& .bold': {
          fontWeight: 600,
        },
      }}
    >
      {rows.length > 0 && columns.length > 0 ? <TableMain /> : <Spinner />}
    </Box>
  )
}
