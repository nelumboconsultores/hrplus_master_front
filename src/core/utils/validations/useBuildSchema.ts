import { ValidationsDynamicType, ValueEnum } from 'core'
import { useValidations } from '.'

export const useBuildSchema = () => {
  const { requiredNumber, requiredString, optionalString, optionalNumber, optionalArray } =
    useValidations()

  const buildSchema = <T>(json: Array<T>) => {
    const schemaObject: Record<string, any> = {}
    json.forEach((item: any) => (schemaObject[item.name] = getValidation(item?.validations)))
    return schemaObject
  }

  const buildDefaultValues = <T>(json: Array<T>) => {
    const defaultValue: Record<string, any> = {}
    json.forEach((item: any) => (defaultValue[item.name] = item?.defaultValue))
    return defaultValue
  }

  const getValidation = (validations: ValidationsDynamicType) => {
    switch (validations?.type) {
      case ValueEnum.numberRequired:
        return requiredNumber(validations.message)
      case ValueEnum.stringRequired:
        return requiredString(validations.message)
      case ValueEnum.stringOptional:
        return optionalString()
      case ValueEnum.numberOptional:
        return optionalNumber()
      case ValueEnum.arrayRequired:
        return optionalArray()
      case ValueEnum.optionalArray:
        return optionalArray()
      default:
        return requiredString(validations.message)
    }
  }

  return {
    buildSchema,
    buildDefaultValues,
  }
}
