import { useContext, useEffect, useState } from 'react'
import { ModelContext } from '../../context'
import { KeyLabels } from '../../enums/keyLabels'
import { useTranslation } from 'react-i18next'
import { geoLocalFields, geoNotShowKeys, regularLocalFields, regularNotShowKeys } from './infoEnums'
import { formatArrayToDynamicFormValues, formatFieldsWithTheirType } from 'core/utils/textFormat'
import { DynamicFormValuesType, MapGrid } from 'core'
type GenInfo = {
  title: string
  value: DynamicFormValuesType
}

type GenInfoDetailProps = {
  isGeo?: boolean
  showDinamics?: boolean
}

export const GenInfoDetail: React.FC<GenInfoDetailProps> = ({
  isGeo = false,
  showDinamics = true,
}) => {
  const { modelState } = useContext(ModelContext)
  const [arrayGenInfo, setArrayGenInfo] = useState<GenInfo[]>([])
  const { t } = useTranslation()
  useEffect(() => {
    if (arrayGenInfo.length === 0) {
      const notShowKeys = isGeo ? geoNotShowKeys : regularNotShowKeys
      const localFields = isGeo ? geoLocalFields : regularLocalFields

      const formatFields = formatFieldsWithTheirType(
        modelState.typesInputs,
        modelState.formInformation,
      )
      const objFields = formatArrayToDynamicFormValues(formatFields)
      for (const [key, value] of Object.entries(objFields ?? {})) {
        let auxValue = value === null || value === undefined || value === '' ? '-' : value
        let auxKey = key
        if (typeof value === 'boolean') auxValue = validationsYesOrNot(value)
        if (key === 'statusId') auxValue = value === 'Active' ? 'Activo' : 'Inactivo'
        if (key === 'georefDistance') auxValue = !value || value === 0 ? '-' : value + ' m'
        if (localFields.includes(key)) auxKey = localLabels(key)
        if (notShowKeys.includes(key) || (!showDinamics && !localFields.includes(key))) continue
        if (typeof auxValue === 'object')
          auxValue = auxValue
            .map((item: number | { name: string }) => {
              if (typeof item === 'number') return item
              return item.name
            })
            .join(', ')
        setArrayGenInfo((prev) => [...prev, { title: auxKey, value: auxValue ?? '-' }])
      }
    }
  }, [modelState.formInformation]) // eslint-disable-line

  const validationsYesOrNot = (value: boolean) => (value ? 'Si' : 'No')
  const localLabels = (key: string) => {
    switch (key) {
      case KeyLabels.country:
        return t(`instancesStores.creation.label.country`)
      case KeyLabels.state:
        return t(`instancesStores.creation.label.state`)
      case KeyLabels.city:
        return t(`instancesStores.creation.label.city`)
      case KeyLabels.status:
        return t(`instancesStores.creation.label.status`)
      case KeyLabels.address:
        return t(`instancesStores.creation.label.address`)
      case KeyLabels.zipcode:
        return t(`instancesStores.creation.label.zipcode`)
      case KeyLabels.georefDistance:
        return t(`instancesStores.creation.label.georefDistance`)
      case KeyLabels.latitude:
        return t(`instancesStores.creation.label.latitude`)
      case KeyLabels.longitude:
        return t(`instancesStores.creation.label.longitude`)
      default:
        return key
    }
  }

  return <MapGrid arrayInfo={arrayGenInfo} />
}
