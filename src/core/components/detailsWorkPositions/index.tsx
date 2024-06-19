import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {
  AppContext,
  ButtonBack,
  GeneralAccordion,
  PathName,
  TitleNormal,
  TitleWithArrow,
  Variant,
  icons,
} from 'core'
import { t } from 'i18next'
import { IconButton, Tooltip, Typography } from '@mui/material'
import {
  ActionTypes,
  ModelStatus,
  OrgEntityType,
} from '../../../modules/manageOrganization/modules/workPositions/enums'
import Spinner from 'core/components/spinner'
import { styles } from './styles'
import { getDetailValues } from '../../../modules/manageOrganization/modules/workPositions/utils/getDinamicValues'
import { StoreInfo } from './components'
import { getModelDetail } from '../../../modules/manageOrganization/modules/workPositions/services/model.services'
import { WorkPositionsContext } from '../../../modules/manageOrganization/modules/workPositions/context'
import {
  CompCategoryInfoKeys,
  CompTabInfoKeys,
  HierarchyInfoKeys,
  StoreInfoKeys,
} from '../../../modules/manageOrganization/modules/workPositions/enums/infoData'
import { DetailCard } from '../../../modules/manageOrganization/modules/workPositions/components/dynamicSelectForm/detailCard'
import { dateToSpanish, formatCurrency, formatFieldsWithTheirType } from 'core/utils/textFormat'

interface Structure {
  id: number
  name: string
  orgEntity: { name: string }
  children?: Structure[]
}

interface Details {
  generalInfo: { titles: string[]; subtitles: string[] }
  geoStructure: { titles: string[][]; subtitles: string[][] }
  orgStructure: { titles: string[][]; subtitles: string[][] }
  storeInfo?: StoreInfoData
  workPositionCategoryInfo?: WorkPositionCategoryInfoData
  compCategoryInfo?: CompCategoryInfoData
  costCenterInfo?: CostCenterInfoData
  compTabInfo?: CompTabInfoData
  costOrgManagerInfo?: { id: number; code: string; denomination: string }
  costApprovalManagerrInfo?: { id: number; code: string; denomination: string }
}

interface StoreInfoData {
  code?: string
  denomination?: string
  status?: { id: number; name: string }
  address?: string
  zipcode?: string
  georefDistance?: number
  latitude?: number
  longitude?: number
  fieldValues?: Record<string, string | number | boolean>
}

interface WorkPositionCategoryInfoData {
  id: number
  code?: string
  status?: { id: number; name: string }
  denomination?: string
  fieldValues?: Record<string, string | number | boolean>
}

interface CompCategoryInfoData {
  code?: string
  status?: { id: number; name: string }
  denomination?: string
  fieldValues?: Record<string, string | number | boolean>
}

interface CostCenterInfoData {
  id: number
  denomination: string
  status?: { id: number; name: string }
  code?: string
  country?: { name: string }
  state?: { name: string }
  city?: { name: string }
  fieldValues?: Record<string, string | number | boolean>
}

interface CompTabInfoData {
  code?: string
  status?: { id: number; name: string }
  denomination?: string
  minAuthorizedSalary?: number
  maxAuthorizedSalary?: number
  minSalary?: number
  fieldValues?: Record<string, string | number | boolean | number[]>
}
type ModelData = { code: string; denomination: string; createdAt: string | Date }

export const DetailsModel: React.FC<{ id: number; hiddenHeader?: boolean }> = ({
  id,
  hiddenHeader = false,
}) => {
  const navigate = useNavigate()
  const { modelDispatch } = useContext(WorkPositionsContext)
  const { setActMessage } = useContext(AppContext)
  const [details, setDetails] = useState<Details | null>(null)
  const [modelData, setModelData] = useState<ModelData>(Object({}))
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getDetails()
  }, []) //eslint-disable-line

  const getDetails = async () => {
    setLoading(true)
    const { data: resp, error } = await getModelDetail(id ? id?.toString() : '')

    if (resp && resp.data && resp.data.workPosition) {
      const { workPosition, structuresByType } = resp.data
      const { fieldValues, code, createdAt, denomination, fieldTypes } = workPosition
      setModelData({ code, denomination, createdAt })
      const workPositionWithDefaults = {
        ...workPosition,
        minSalary: workPosition.minSalary || 0,
      }

      let { titles, values } = getDetailValues(PathName.jobTitles, {
        data: workPositionWithDefaults,
      })
      const indexPlantilla = titles.indexOf('Plantilla Autorizada')
      const indexEstatus = titles.indexOf('Estatus')

      const reorderedTitles = []
      const reorderedValues = []

      if (indexPlantilla !== -1) {
        reorderedTitles.push(titles[indexPlantilla])
        reorderedValues.push(values[indexPlantilla])
      }

      if (indexEstatus !== -1) {
        reorderedTitles.push(titles[indexEstatus])
        reorderedValues.push(values[indexEstatus])
      }

      titles.forEach((title, index) => {
        if (title !== 'Plantilla Autorizada' && title !== 'Estatus') {
          reorderedTitles.push(title)
          reorderedValues.push(values[index])
        }
      })

      titles = reorderedTitles
      values = reorderedValues

      const additionalFields = formatFieldsWithTheirType(fieldTypes, fieldValues)
      additionalFields.forEach((item) => {
        if (Array.isArray(item.value)) {
          const valueArray = item.value
            .map((val) => {
              if (typeof val === 'object' && val.name) return val.name
              return val
            })
            .join(', ')
          item.value = valueArray
        }

        titles.push(String(item.key))
        values.push(String(item.value) || '-')
      })

      const storeInfo = resp.data.workPosition.store
      const workPositionCategoryInfo = resp.data.workPosition.workPositionCategory
      const compTabInfo = {
        ...resp.data.workPosition.compTab,
        minSalary: workPositionWithDefaults.minSalary,
      }
      const compCategoryInfo = resp.data.workPosition.compCategory
      const costCenterInfo = resp.data.workPosition.costCenter
      const costOrgManagerInfo = resp.data.workPosition.orgManager
      const costApprovalManagerrInfo = resp.data.workPosition.approvalManager

      const geoTitles: string[][] = []
      const geoSubtitles: string[][] = []
      const orgTitles: string[][] = []
      const orgSubtitles: string[][] = []

      const processStructuresRecursively = (
        structures: Structure[],
        index: number,
        dataTitles: string[][],
        dataSubtitles: string[][],
      ): void => {
        structures.forEach((structure, i) => {
          if (!structure) return
          const { name, children, orgEntity } = structure
          const currentIndex = index * structures.length + i

          if (!dataTitles[currentIndex]) dataTitles[currentIndex] = []
          if (!dataSubtitles[currentIndex]) dataSubtitles[currentIndex] = []

          dataTitles[currentIndex].push(name)
          dataSubtitles[currentIndex].push(orgEntity.name)

          if (children && children.length > 0) {
            processStructuresRecursively(children, currentIndex, dataTitles, dataSubtitles)
          }
        })
      }

      structuresByType.forEach((structure) => {
        const {
          orgEntityType: { name },
          details,
        } = structure

        if (details) {
          const titlesArray = name === OrgEntityType.Operational ? geoTitles : orgTitles
          const subtitlesArray = name === OrgEntityType.Operational ? geoSubtitles : orgSubtitles

          details.forEach((detail, detailIndex: number) => {
            const { structures } = detail
            if (!titlesArray[detailIndex]) {
              titlesArray[detailIndex] = []
              subtitlesArray[detailIndex] = []
            }
            processStructuresRecursively(structures, detailIndex, titlesArray, subtitlesArray)
          })
        }
      })

      setDetails({
        generalInfo: { titles: titles, subtitles: values },
        geoStructure: { titles: geoTitles, subtitles: geoSubtitles },
        orgStructure: { titles: orgTitles, subtitles: orgSubtitles },
        storeInfo,
        workPositionCategoryInfo,
        compTabInfo,
        compCategoryInfo,
        costCenterInfo,
        costOrgManagerInfo,
        costApprovalManagerrInfo,
      })
    } else if (error) {
      setActMessage({ type: Variant.error, message: t('authentication.alertError') })
    }
    setLoading(false)
  }

  const handleEdit = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(`${PathName.instanceJobTitlesEdit}/${id}`)
  }
  if (loading) return <Spinner />
  return (
    <Box sx={styles.root}>
      <Box>
        {!hiddenHeader && (
          <Box>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <ButtonBack click={() => navigate(PathName.instanceJobTitlesView)} />
              <Typography sx={styles.titleDate}>
                {t('instancesWorkPositions.view.inputs.date')}: {dateToSpanish(modelData.createdAt)}
                <Tooltip title={t('general.toolTip.edit')}>
                  <IconButton sx={styles.icon} onClick={handleEdit}>
                    {icons.borderColorEdit}
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
            <Typography sx={styles.titleDenomination}>
              {t('instancesWorkPositions.view.inputs.carg')}: {modelData.denomination}
            </Typography>
            <Typography sx={styles.titleCode}>
              {t('instancesWorkPositions.view.inputs.code')}: {modelData.code}
            </Typography>
          </Box>
        )}
        <Box sx={{ paddingTop: '30px' }}>
          {details && details.generalInfo.titles?.length && (
            <GeneralAccordion
              title={t(`instancesWorkPositions.creation.title.generalInformation`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              <TitleNormal
                titles={details.generalInfo.titles}
                subtitles={details.generalInfo.subtitles}
              />
            </GeneralAccordion>
          )}
          {details && details.storeInfo && (
            <>
              <StoreInfo
                accordionTitle={t('instancesWorkPositions.view.inputs.branch')}
                titles={[
                  StoreInfoKeys.code,
                  StoreInfoKeys.denomination,
                  StoreInfoKeys.status,

                  ...Object.keys(details.storeInfo.fieldValues || {}),
                ]}
                values={[
                  details.storeInfo?.code ?? '-',
                  details.storeInfo?.denomination ?? '-',
                  details.storeInfo?.status?.id !== undefined
                    ? details.storeInfo.status.id !== ModelStatus.Active
                      ? 'Inactivo'
                      : 'Activo'
                    : '-',

                  ...(Object.values(details.storeInfo.fieldValues || {}) as string[]),
                ]}
              />
            </>
          )}
          {details && details.workPositionCategoryInfo && (
            <GeneralAccordion
              title={t(`instancesWorkPositions.view.inputs.position`)}
              props={{ accordionProps: { defaultExpanded: true } }}
            >
              <DetailCard
                structures={{
                  id: details.workPositionCategoryInfo.id,
                  data: [
                    {
                      name: `${details.workPositionCategoryInfo.code} - ${details.workPositionCategoryInfo.denomination}`,
                      type: 'Código - Denominación',
                    },
                  ],
                }}
                isDetail
              />
            </GeneralAccordion>
          )}

          {details && details.geoStructure.titles?.length && (
            <GeneralAccordion
              title={t(`instancesWorkPositions.creation.title.geographicalStructureLevel`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              {details.geoStructure.titles.map((titles: string[], index: number) => (
                <TitleWithArrow
                  key={index}
                  titles={titles}
                  subtitles={details.geoStructure.subtitles[index]}
                />
              ))}
            </GeneralAccordion>
          )}
          {details && details.orgStructure.titles?.length && (
            <GeneralAccordion
              title={t(`instancesWorkPositions.creation.title.organizationalStructureLevel`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              {details.orgStructure.titles.map((titles: string[], index: number) => (
                <TitleWithArrow
                  key={index}
                  titles={titles}
                  subtitles={details.orgStructure.subtitles[index]}
                />
              ))}
            </GeneralAccordion>
          )}
          {details && details.costCenterInfo && (
            <GeneralAccordion
              title={t(`instancesWorkPositions.view.inputs.costCenters`)}
              props={{ accordionProps: { defaultExpanded: true } }}
            >
              <DetailCard
                structures={{
                  id: details.costCenterInfo.id,
                  data: [
                    {
                      name: `${details.costCenterInfo.code} - ${details.costCenterInfo.denomination}`,
                      type: 'Código - Denominación',
                    },
                  ],
                }}
                isDetail
              />
            </GeneralAccordion>
          )}

          {details && details.compCategoryInfo && (
            <>
              <StoreInfo
                accordionTitle={t('instancesWorkPositions.view.inputs.catPositions')}
                titles={[
                  CompCategoryInfoKeys.status,
                  ...Object.keys(details.compCategoryInfo.fieldValues || {}),
                ]}
                values={[
                  details.compCategoryInfo?.status?.id !== undefined
                    ? details.compCategoryInfo.status.id !== ModelStatus.Active
                      ? 'Inactivo'
                      : 'Activo'
                    : '-',
                  ...(Object.values(details.compCategoryInfo.fieldValues || {}) as string[]),
                ]}
                titleSegundary={`Denominación: ${details.compCategoryInfo?.denomination}` ?? '-'}
                subtitile={`Código: ${details.compCategoryInfo?.code}` ?? '-'}
              />
            </>
          )}
          {details && details.compTabInfo && (
            <>
              <StoreInfo
                accordionTitle={t('instancesWorkPositions.view.inputs.tab')}
                titles={[
                  CompTabInfoKeys.status,
                  CompTabInfoKeys.minAuthorizedSalary,
                  CompTabInfoKeys.maxAuthorizedSalary,
                  CompTabInfoKeys.minSalary,
                  ...Object.keys(details.compTabInfo.fieldValues || {}),
                ]}
                values={[
                  details.compTabInfo?.status?.id !== undefined
                    ? details.compTabInfo.status.id !== ModelStatus.Active
                      ? 'Inactivo'
                      : 'Activo'
                    : '-',
                  formatCurrency(Number(details.compTabInfo.minAuthorizedSalary)) ?? '-',
                  formatCurrency(Number(details.compTabInfo.maxAuthorizedSalary)) ?? '-',
                  formatCurrency(Number(details.compTabInfo.minSalary)) ?? '-',
                  ...(Object.values(details.compTabInfo.fieldValues || {}) as string[]),
                ]}
                titleSegundary={`Posición: ${details.compTabInfo?.denomination}` ?? '-'}
                subtitile={`Nivel Macropay: ${details.compTabInfo?.code}` ?? '-'}
              />
            </>
          )}
          {details && details.costOrgManagerInfo && details.costApprovalManagerrInfo && (
            <>
              <StoreInfo
                accordionTitle={t('instancesWorkPositions.view.inputs.hierarchicalStructureLevel')}
                titles={[HierarchyInfoKeys.orgManager, HierarchyInfoKeys.approvalManager]}
                values={[
                  details.costOrgManagerInfo.denomination ?? '-',
                  details.costApprovalManagerrInfo.denomination ?? '-',
                ]}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
