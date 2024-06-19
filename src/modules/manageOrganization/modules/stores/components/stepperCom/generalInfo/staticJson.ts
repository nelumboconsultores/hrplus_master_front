import { FieldTypeEnumSelect } from 'core'
import { TypeJson } from 'core/components/returnInput/typeJson'

export const staticJson: TypeJson[] = [
  {
    type: FieldTypeEnumSelect.text,
    name: 'code',
    label: 'Centro',
    placeholder: 'Ingrese el código',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'denomination',
    label: 'Sucursal',
    placeholder: 'Ingrese denominación',
    validations: {
      required: true,
      max_chars: 150,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'statusId',
    label: 'Estatus',
    optionsOut: [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ],
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.number,
    name: 'zipcode',
    label: 'Código postal',
    placeholder: 'Ingrese el código postal',
    validations: {
      required: true,
      max_value: 999999,
    },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'countryId',
    label: 'País',
    optionsUrl: '/countries',
    validations: { required: true },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'stateId',
    label: 'Estado',
    parents: ['countryId'],
    optionsUrl: '/countries/{id}/states',
    validations: { required: true },
  },
  {
    type: FieldTypeEnumSelect.catalog,
    name: 'cityId',
    label: 'Municipio',
    parents: ['countryId', 'stateId'],
    optionsUrl: '/countries/{id}/states/{id}/cities',
    validations: { required: true },
  },
  {
    type: FieldTypeEnumSelect.number,
    name: 'georefDistance',
    label: 'Geocerca',
    placeholder: 'Indique la Geocerca (mts)',
    validations: {
      required: true,
      max_value: 99999,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'latitude',
    label: 'Latitud',
    placeholder: 'Indique la latitud',
    disabled: true,
    validations: {
      required: true,
    },
  },
  {
    type: FieldTypeEnumSelect.text,
    name: 'longitude',
    label: 'Longitud',
    placeholder: 'Indique la longitud',
    disabled: true,
    validations: {
      required: true,
    },
  },
]
