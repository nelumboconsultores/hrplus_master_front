import { Box } from '@mui/system'
import { getModelDetail, getWorkPeriods } from '../../services/model.services'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { ActionTypes, OrgEntityType } from '../../enums'
import Spinner from 'core/components/spinner'
import { styles } from './styles'
import { ModelContext } from '../../context'
import { getDetailValues } from '../../utils/getDinamicValues'
import { CostCenterDetails } from '../../types/getCostCenterDetails'
import { DetailCard } from '../dynamicSelectForm/detailCard'
import { workPerioType } from 'modules/workingDays/enums/workPerioType'
import { dateToSpanish, formatFieldsWithTheirType } from 'core/utils/textFormat'

interface Structure {
  id: number
  name: string
  orgEntity: { name: string }
  children?: Structure[]
}

interface Details {
  generalInfo: {
    titles: string[]
    subtitles: Array<
      | string
      | number
      | boolean
      | number[]
      | {
          name: string
          id: number
        }[]
    >
  }
  geolocation: {
    titles: string[]
    subtitles: Array<
      | string
      | number
      | boolean
      | number[]
      | {
          name: string
          id: number
        }[]
    >
  }
  geoStructure: { titles: string[][]; subtitles: string[][] }
  orgStructure: { titles: string[][]; subtitles: string[][] }
  costCenter: CostCenterDetails
  workPeriods?: { id: number; name: string; type: string }[]
}
type ModelData = { code: string; denomination: string; createdAt: string | Date }

export const DetailsModel: React.FC = () => {
  const { id } = useParams()
  const { pathname, state } = useLocation()
  const navigate = useNavigate()
  const { modelDispatch } = useContext(ModelContext)
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
    const { data: workPeriodsResponse } = await getWorkPeriods(id ?? '')
    const workPeriods = workPeriodsResponse?.data.workPeriods.map((period) => ({
      id: period.id,
      name: period.workPeriod.workPeriod.name,
      type: workPerioType[
        period.workPeriod.workPeriod.workPeriodType.name as keyof typeof workPerioType
      ],
    }))

    if (resp) {
      const { structuresByType, store } = resp.data
      const { fieldValues, code, createdAt, denomination, costCenter, fieldTypes } = store
      setModelData({ code, denomination, createdAt })
      const { titles, values } = getDetailValues(pathname, { data: store })
      const { titles: geolactionTitles, values: geolocationValues } = getDetailValues(
        PathName.taxesCategories,
        { data: store },
      )

      const additionalFields = formatFieldsWithTheirType(fieldTypes, fieldValues)
      additionalFields.forEach((item) => {
        titles.push(String(item.key))
        values.push(item.value || '-')
      })

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
        if (!structure?.orgEntityType?.name) return
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
        generalInfo: { titles, subtitles: values },
        geolocation: { titles: geolactionTitles, subtitles: geolocationValues },
        geoStructure: { titles: geoTitles, subtitles: geoSubtitles },
        orgStructure: { titles: orgTitles, subtitles: orgSubtitles },
        costCenter,
        workPeriods,
      })
    } else if (error) {
      setActMessage({ type: Variant.error, message: t('authentication.alertError') })
    }
    setLoading(false)
  }
  const handleEdit = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(`${PathName.instanceStoresEdit}/${id}`, { state })
  }
  if (loading) return <Spinner />
  return (
    <Box sx={styles.root}>
      <Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <ButtonBack click={() => navigate(PathName.instanceStoresView, { state })} />
            <Typography sx={styles.titleDate}>
              Fecha de Registro {dateToSpanish(modelData.createdAt)}
              <Tooltip title={t('general.toolTip.edit')}>
                <IconButton sx={styles.icon} onClick={handleEdit}>
                  {icons.borderColorEdit}
                </IconButton>
              </Tooltip>
            </Typography>
          </Box>
          <Typography sx={styles.titleDenomination}>
            {t('instancesStores.view.inputs.denomination')}: {modelData.denomination}
          </Typography>
          <Typography sx={styles.titleCode}>
            {t('instancesStores.view.inputs.code')}: {modelData.code}
          </Typography>
        </Box>
        <Box sx={{ paddingTop: '30px' }}>
          {details && (
            <>
              {!!details.generalInfo.titles?.length && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.generalInformation`)}
                  props={{ accordionProps: { defaultExpanded: true } }}
                >
                  <TitleNormal
                    titles={details.generalInfo.titles}
                    subtitles={details.generalInfo.subtitles}
                  />
                </GeneralAccordion>
              )}
              {!!details.costCenter && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.costCenter`)}
                  props={{ accordionProps: { defaultExpanded: true } }}
                >
                  <DetailCard
                    structures={{
                      id: details.costCenter.id,
                      data: [
                        {
                          name: `${details.costCenter.code} - ${details.costCenter.denomination}`,
                          type: 'Código - Denominación',
                        },
                      ],
                    }}
                    isDetail
                  />
                </GeneralAccordion>
              )}
              {!!details.geolocation.titles?.length && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.geolocation`)}
                  props={{ accordionProps: { defaultExpanded: true } }}
                >
                  <TitleNormal
                    titles={details.geolocation.titles}
                    subtitles={details.geolocation.subtitles}
                  />
                </GeneralAccordion>
              )}
              {!!details.workPeriods?.length && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.workPositions`)}
                  props={{ accordionProps: { defaultExpanded: true } }}
                >
                  <Grid container spacing={2}>
                    {details.workPeriods?.map?.((workPeriod) => (
                      <Grid item xs={12} key={workPeriod.id}>
                        <DetailCard
                          structures={{
                            id: workPeriod.id,
                            data: [{ name: workPeriod.name, type: workPeriod.type }],
                          }}
                          isDetail
                        />
                      </Grid>
                    ))}
                  </Grid>
                </GeneralAccordion>
              )}
              {!!details.geoStructure.titles?.length && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.geographicalStructureLevel`)}
                  props={{ accordionProps: { defaultExpanded: true } }}
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
              {!!details.orgStructure.titles?.length && (
                <GeneralAccordion
                  title={t(`instancesStores.creation.title.organizationalStructureLevel`)}
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}
