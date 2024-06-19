import { useContext, useEffect, useState } from 'react'
import { ModelContext } from '../../context'
import { KeyLabels } from '../../enums/keyLabels'
import { useTranslation } from 'react-i18next'
import { DynamicFormValuesType, MapGrid } from 'core'
import { formatArrayToDynamicFormValues, formatFieldsWithTheirType } from 'core/utils/textFormat'
type GenInfo = {
  title: string
  value: DynamicFormValuesType
}

export const GenInfoDetail = () => {
  const { modelState, modelLocale } = useContext(ModelContext)
  const [arrayGenInfo, setArrayGenInfo] = useState<GenInfo[]>([])
  const { t } = useTranslation()
  useEffect(() => {
    if (arrayGenInfo.length === 0) {
      const notShowKeys = ['denomination', 'code']
      const localFields = ['countryId', 'stateId', 'cityId', 'statusId']

      const formatFields = formatFieldsWithTheirType(
        modelState.typesInputs,
        modelState.formInformation,
      )
      const objFields = formatArrayToDynamicFormValues(formatFields)

      for (const [key, value] of Object.entries(objFields ?? {})) {
        let auxValue = value === null || value === undefined || value === '' ? '-' : value
        let auxKey = key
        if (typeof value === 'boolean') auxValue = validationsYesOrNot(value)
        if (key === 'statusId') auxValue = auxValue === 1 ? 'Activo' : 'Inactivo'
        if (localFields.includes(key)) auxKey = localLabels(key)
        if (Array.isArray(value))
          auxValue = value
            .map((v: number | { name: string }) => {
              if (typeof v === 'number') return v
              return v.name
            })
            .join(', ')
        if (notShowKeys.includes(key)) continue
        setArrayGenInfo((prev) => [...prev, { title: auxKey, value: auxValue ?? '-' }])
      }
    }
  }, [modelState.formInformation]) // eslint-disable-line

  const validationsYesOrNot = (value: boolean) => (value ? 'Si' : 'No')
  const localLabels = (key: string) => {
    switch (key) {
      case KeyLabels.country:
        return t(`${modelLocale}.creation.label.country`)
      case KeyLabels.state:
        return t(`${modelLocale}.creation.label.state`)
      case KeyLabels.city:
        return t(`${modelLocale}.creation.label.city`)
      case KeyLabels.status:
        return t(`${modelLocale}.creation.label.status`)
      default:
        return key
    }
  }
  return <MapGrid arrayInfo={arrayGenInfo} />
}
