import { DynamicFormValues } from 'core'
import { StructureByType, WorkPosition } from '../types'

type Structure = {
  name: string
  id: number
  children: Structure[]
}

const getDeepnessValue = (structures: Structure[], deepness: number, values: string[]) => {
  if (structures[0]?.children?.length) {
    values.push(structures[0].name)
    getDeepnessValue(structures[0].children, deepness + 1, values)
  } else values.push(structures[0]?.name)
}

const getStuctureValue = (structures: StructureByType[], type: 'org' | 'geo') => {
  const structType = type === 'org' ? 'Estructura organizacional' : 'Estructura operativa'
  const structure = structures.filter((structure) => structure.orgEntityType.name === structType)
  const orgFields: string[] = []
  getDeepnessValue(structure[0].details[0].structures as unknown as Structure[], 0, orgFields)
  return orgFields
}

export const addCustomFields = (
  fields: DynamicFormValues,
  workPosition: WorkPosition,
  isJobInfo: boolean,
) => {
  if (!workPosition.structuresByType?.length || !isJobInfo) return fields
  const orgFields = getStuctureValue(workPosition.structuresByType, 'org')
  const geoFields = getStuctureValue(workPosition.structuresByType, 'geo')

  return {
    ...fields,
    'Título del puesto': workPosition.denomination,
    Área: orgFields[0] ?? 'N/A',
    Subárea: orgFields[2] ?? 'N/A',
    Departamento: orgFields[1] ?? 'N/A',
    'Centro de costos': workPosition.costCenter.denomination,
    Región: geoFields[1] ?? 'N/A',
    División: geoFields[2] ?? 'N/A',
    Zona: geoFields[3] ?? 'N/A',
    Sucursal: workPosition.store.denomination,
    'Categoría de puesto': workPosition.compCategory.denomination,
  }
}
