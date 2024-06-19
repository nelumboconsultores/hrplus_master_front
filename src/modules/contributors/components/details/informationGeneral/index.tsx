import { Box, Typography } from '@mui/material'
import {
  AccordionDetails,
  DynamicFormValues,
  ProfileModulesIds,
  TemplateCardItem,
  TitleNormal,
} from 'core'
import { useContext, useState } from 'react'
import { ProfileDetailContext } from 'modules/contributors/context'
import { NamesEnum } from 'modules/dataStructure/modules/employeeStructure/enum'
import { DetailsSectionData } from 'modules/contributors/types'
import { t } from 'i18next'
// import { WorkPositionAccordion } from '../workpositionAccordion'
import { UpdateWorkPosition } from '../updateWorkPosition'
import { UpdateSection } from '../updateSection'
import { ModelFields } from 'core/types/modelFields'
import {
  formatArrayToDynamicFormValues,
  formatFieldsWithTheirType,
  formatValueWithType,
} from 'core/utils/textFormat'
import { WorkPeriodAccordion } from '../workperiodAccordion'
import { UpdateWorkPeriod } from '../updateWorkPeriod'
import { addCustomFields } from 'modules/contributors/utils/addCustomFields'

export const InformationGeneral: React.FC = () => {
  const { listSections, sections, profile } = useContext(ProfileDetailContext)
  const [sectionSelected, setSectionSelected] = useState<DetailsSectionData>()
  const [workPosition, setWorkPosition] = useState<{ value: number; name: string }>()
  const [workPeriod, setWorkPeriod] = useState<{ value: number; name: string }>()

  // const handleWorkPosition = (value: { value: number; name: string }) => setWorkPosition(value)
  const handleWorkPeriod = (value: { value: number; name: string }) => setWorkPeriod(value)

  if (workPeriod) {
    return <UpdateWorkPeriod setWorkPeriod={setWorkPeriod} />
  }

  if (workPosition != undefined) {
    return <UpdateWorkPosition workPosition={workPosition} setWorkPosition={setWorkPosition} />
  }

  if (sectionSelected) {
    return (
      <UpdateSection selectedSection={sectionSelected} setSelectedSection={setSectionSelected} />
    )
  }

  const sortedFieldsValues = (config: ModelFields[], data: DynamicFormValues) => {
    return config
      .filter((field) => Object.prototype.hasOwnProperty.call(data, field.label))
      .sort((a, b) => a.position - b.position)
      .reduce((acc, field) => {
        acc[field.label] = data[field.label]
        return acc
      }, {} as DynamicFormValues)
  }

  return (
    <Box>
      {listSections.map((sectionInfo) => {
        const filteredSections = sections.filter(
          (s) => s.profileSection.keyword === sectionInfo.profileSection.keyword,
        )
        const noHasJobInfo = !sections.some(
          ({ profileSection }) => profileSection.id === ProfileModulesIds.JobInformation,
        )
        if (sectionInfo.id === ProfileModulesIds.JobInformation && noHasJobInfo) {
          filteredSections.push(
            Object({
              fieldsValues: {},
              id: ProfileModulesIds.JobInformation,
              profileSection: { id: ProfileModulesIds.JobInformation },
            }),
          )
        }
        const section = filteredSections.map((s) => {
          const fieldValues = formatValueWithType(s?.fieldTypes ?? {}, s?.fieldsValues)
          const objFields = formatArrayToDynamicFormValues(fieldValues)
          const formatedValues = formatFieldsWithTheirType(s?.fieldTypes ?? {}, s?.fieldsValues)
          const objFormated = formatArrayToDynamicFormValues(formatedValues)
          return {
            formatedValues: sortedFieldsValues(
              sectionInfo?.profileSection?.modelFields,
              objFormated,
            ),
            fieldsValues: sortedFieldsValues(sectionInfo?.profileSection?.modelFields, objFields),
            id: s.id,
          }
        })
        return (
          <AccordionDetails
            key={sectionInfo.profileSection.id}
            title={NamesEnum[sectionInfo?.profileSection?.keyword ?? '']}
            complete={filteredSections.some((s) => s.isCompleted)}
            edit={() =>
              setSectionSelected({
                profileSection: sectionInfo.profileSection,
                keyword: sectionInfo?.profileSection.keyword,
                isCompleted: sectionInfo.isCompleted,
                percentage: sectionInfo.percentage,
                id: sectionInfo.id,
                fieldsValues: section,
              })
            }
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {section && section.length > 0 ? (
                section.map((sectionItem) => {
                  const isJobInfo = sectionInfo.id === ProfileModulesIds.JobInformation
                  const fieldsValues = addCustomFields(
                    sectionItem.formatedValues,
                    profile.workPosition,
                    isJobInfo,
                  )

                  return section.length > 1 ? (
                    <TemplateCardItem>
                      <TitleNormal
                        key={sectionItem.id}
                        titles={Object.keys(fieldsValues)}
                        subtitles={Object.values(fieldsValues).map((value) => {
                          if (typeof value === 'boolean') {
                            return value ? 'Si' : 'No'
                          } else if (Array.isArray(value)) {
                            return value
                              .map((val) => {
                                if (typeof val === 'object') {
                                  return String((val as { name: string }).name)
                                }
                                return String(val)
                              })
                              .join(', ')
                          }
                          return String(value)
                        })}
                      />
                    </TemplateCardItem>
                  ) : (
                    <TitleNormal
                      key={sectionItem.id}
                      titles={Object.keys(fieldsValues)}
                      subtitles={Object.values(fieldsValues).map((value) => {
                        if (!value) return 'N/A'
                        if (typeof value === 'boolean') {
                          return value ? 'Si' : 'No'
                        } else if (Array.isArray(value)) {
                          return value
                            .map((val) => {
                              if (typeof val === 'object') {
                                return String((val as { name: string }).name)
                              }
                              return String(val)
                            })
                            .join(', ')
                        }
                        return String(value)
                      })}
                    />
                  )
                })
              ) : (
                <Typography>{t('contributors.detail.noInfo')}</Typography>
              )}
            </Box>
          </AccordionDetails>
        )
      })}
      <WorkPeriodAccordion onEdit={handleWorkPeriod} />
      {/* <WorkPositionAccordion onEdit={handleWorkPosition} /> */}
    </Box>
  )
}
