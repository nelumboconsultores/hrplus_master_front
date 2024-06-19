import { DynamicFormValuesType, MapGrid, OpenWithUpdate, StatusId } from 'core'
import { useTranslation } from 'react-i18next'

type GridBoxProps = {
  title: string
  arrayGenInfo: arrayGenInfoType[]
}
export type arrayGenInfoType = {
  title: string
  value: DynamicFormValuesType
}

export const GridBox: React.FC<GridBoxProps> = ({ title, arrayGenInfo }) => {
  const { t } = useTranslation()
  const mapArrayInfo = (): arrayGenInfoType[] => {
    const titles: { [key: string]: string } = {
      statusId: t('instancesWorkPositions.view.inputs.statusId'),
    }
    /*    */

    const newData = arrayGenInfo.map((item) => {
      if (Array.isArray(item.value)) {
        const newValue = item.value.map((value) => {
          if (typeof value === 'number') return value
          return value.name
        })
        return {
          title: item.title,
          value: newValue.join(', '),
        }
      }
      if (item.title === 'statusId' && typeof item.value === 'number')
        return {
          title: titles[item.title] ?? item.title,
          value: StatusId[item.value as keyof typeof StatusId],
        }

      const title = titles[item.title] ?? item.title

      return {
        title,
        value: item.value,
      }
    })

    return newData ?? []
  }

  return (
    <OpenWithUpdate title={title} hiddenIcon>
      <MapGrid arrayInfo={mapArrayInfo()} />
    </OpenWithUpdate>
  )
}
