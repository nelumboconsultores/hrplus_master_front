import { DetailsSectionData } from 'modules/contributors/types'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { OneForm } from './oneForm'
import { MultipleForms } from './multipleForms'
import Spinner from 'core/components/spinner'

type FieldValue = string | Array<{ id: number; name: string }> | number[] | undefined
type FieldsValues = {
  [key: string]: FieldValue
}

type UpdateSectionProps = {
  selectedSection: DetailsSectionData
  setSelectedSection: Dispatch<SetStateAction<DetailsSectionData | undefined>>
}

const formatValue = (value: string): string => {
  const hasDollarSign = value?.toString().includes('$')
  const removeAllComas = (value: string) => value.replace(/,/g, '')
  const mapedValue = hasDollarSign ? removeAllComas(value?.toString().replace('$', '')) : value
  return mapedValue
}
//currency includes $ and commas
const isCurrency = (value: string) => /^\$?[\d,]+(\.\d*)?$/.test(value)
export const UpdateSection: React.FC<UpdateSectionProps> = ({
  selectedSection,
  setSelectedSection,
}) => {
  const [isMaped, setIsMaped] = useState(false)

  useEffect(() => {
    if (selectedSection && selectedSection.fieldsValues) {
      // Map over fieldsValues array and update '-' to undefined
      const updatedFieldsValues = selectedSection.fieldsValues.map((fieldValueObj) => {
        const updatedFields: FieldsValues = Object.keys(fieldValueObj.fieldsValues).reduce(
          (acc, key) => {
            const value = fieldValueObj.fieldsValues[key]
            if (Array.isArray(value)) acc[key] = value
            else {
              if (isCurrency(value as string)) acc[key] = formatValue(value as string)
              else acc[key] = value === '-' ? undefined : (value as string)
            }

            return acc
          },
          {} as FieldsValues,
        )
        return { ...fieldValueObj, fieldsValues: updatedFields }
      })
      const updatedSection = { ...selectedSection, fieldsValues: updatedFieldsValues }
      setSelectedSection(updatedSection as DetailsSectionData)
    }
    setIsMaped(true)
  }, []) // eslint-disable-line

  if (!isMaped) return <Spinner />
  if (!selectedSection) return null
  if (selectedSection.profileSection.isMultiple) {
    return (
      <MultipleForms selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
    )
  }
  return <OneForm selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
}
