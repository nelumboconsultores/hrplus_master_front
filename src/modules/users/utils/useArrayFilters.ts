import { DynamicFormType, InputsEnum, ItemsSelectType, ValueEnum } from 'core'

export const useArrayFilters = (listGroup: ItemsSelectType[]) => {
  const arrayFilters: DynamicFormType = [
    {
      label: 'Región',
      type: InputsEnum.Select,
      placeHolder: `Enter Región`,
      name: 'región',
      disabled: true,
      options: [
        { label: 'Región 1', value: 1 },
        { label: 'Región 2', value: 2 },
      ],
      validations: {
        type: ValueEnum.numberOptional,
        required: false,
        message: 'La región es requerida',
      },
    },
    {
      label: 'División',
      type: InputsEnum.Select,
      placeHolder: `Enter División`,
      name: 'división',
      disabled: true,
      options: [],
      fathers: ['región'],
      url: 'https://jsonplaceholder.typicode.com/users/{región}',
      validations: {
        type: ValueEnum.numberOptional,
        required: true,
        message: 'La región es requerida',
      },
    },
    {
      label: 'Zona',
      type: InputsEnum.Select,
      placeHolder: `Enter Zona`,
      name: 'zona',
      options: [],
      fathers: ['división'],
      disabled: true,
      url: 'https://jsonplaceholder.typicode.com/users/{división}',
      validations: {
        type: ValueEnum.numberOptional,
        required: true,
        message: 'La región es requerida',
      },
    },
    {
      label: 'Centro',
      type: InputsEnum.Select,
      placeHolder: `Enter Centro`,
      name: 'centro',
      options: [],
      fathers: ['zona'],
      disabled: true,
      url: 'https://jsonplaceholder.typicode.com/users/{zona}',
      validations: {
        type: ValueEnum.numberOptional,
        required: true,
        message: 'La región es requerida',
      },
    },

    {
      type: InputsEnum.MultiSelect,
      name: 'groupIds',
      label: 'Grupo',
      placeHolder: 'Nombre de ejemplo del grupo',
      options: listGroup,
      validations: {
        type: ValueEnum.optionalArray,
        required: false,
        message: 'La región es requerida',
      },
    },
    {
      type: InputsEnum.Select,
      name: 'role',
      label: 'Rol de usuario*',
      placeHolder: 'Nombre de ejemplo de rol',
      disabled: true,
      options: [
        { value: 1, label: 'Unidad 1' },
        { value: 2, label: 'Unidad 2' },
      ],
      validations: {
        type: ValueEnum.stringOptional,
        required: false,
        message: 'La región es requerida',
      },
    },
    {
      type: InputsEnum.Search,
      name: 'search',
      label: 'Buscar',
      placeHolder: 'Ingrese el valor de búsqueda',
      validations: {
        type: ValueEnum.stringOptional,
        required: false,
        message: 'La región es requerida',
      },
    },
  ]
  return arrayFilters
}
