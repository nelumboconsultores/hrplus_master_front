import { FieldTypeEnumSelect } from 'core'
import { TypeJson } from 'core/components/returnInput/typeJson'

export const workPositionsFields = (actDisabled?: number): TypeJson[] => [
  {
    type: FieldTypeEnumSelect.text,
    name: 'code',
    label: 'Código',
    placeholder: 'Ingrese el código del Cargo',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'denomination',
    label: 'Cargo',
    placeholder: 'Ingrese el cargo',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.number,
    name: 'template',
    label: 'Plantilla autorizada',
    placeholder: 'Indique plantilla autorizada',
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'statusId',
    label: 'Estatus',
    value: actDisabled ? undefined : 2,
    disabled: actDisabled ? false : true,
    optionsOut: [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ],
    validations: {
      required: true,
    },
  },
]
