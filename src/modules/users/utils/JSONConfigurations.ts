import { DynamicFormType, InputsEnum, ValueEnum } from 'core'

export const JSONConfigurations: DynamicFormType = [
  {
    label: 'Región',
    type: InputsEnum.Select,
    placeHolder: `Enter Región`,
    name: 'región',
    options: [],
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
    url: 'https://jsonplaceholder.typicode.com/users/{zona}',
    validations: {
      type: ValueEnum.numberOptional,
      required: true,
      message: 'La región es requerida',
    },
  },
]
