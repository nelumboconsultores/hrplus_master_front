import { Box } from '@mui/system'
import { getModelDetail } from '../../../services/model.services'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {
  AppContext,
  GeneralAccordion,
  PathName,
  TitleNormal,
  TitleWithArrow,
  Variant,
  icons,
} from 'core'
import { t } from 'i18next'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'
import { ActionTypes, OrgEntityType } from '../../../enums'
import Spinner from 'core/components/spinner'
import { styles } from './styles'
import { ButtonBack } from 'modules/manageOrganization/components'
import { ModelContext } from '../../../context'
import { getDetailValues } from '../../../utils/getDinamicValues'
import { dateToSpanish, formatFieldsWithTheirType } from 'core/utils/textFormat'

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
  storesRelated: number
}
type ModelData = { code: string; denomination: string; createdAt: string | Date }

export const DetailsModelCostCenter: React.FC = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { modelDispatch, modelLocale } = useContext(ModelContext)
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

    if (resp) {
      const { costCenter, structuresByType } = resp.data
      const { fieldValues, code, createdAt, denomination, fieldTypes } = costCenter
      setModelData({ code, denomination, createdAt })
      const { titles, values } = getDetailValues(pathname, { data: costCenter })
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
        if (!structure.orgEntityType) return
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
        geoStructure: { titles: geoTitles, subtitles: geoSubtitles },
        orgStructure: { titles: orgTitles, subtitles: orgSubtitles },
        storesRelated: resp.data.storesRelated ?? 0,
      })
    } else if (error) {
      setActMessage({ type: Variant.error, message: t('authentication.alertError') })
    }

    setLoading(false)
  }
  const handleEdit = () => {
    modelDispatch({ type: ActionTypes.CLEAN })
    navigate(`${PathName.instanceCostCenterEdit}/${id}`)
  }
  if (loading) return <Spinner />
  return (
    <Box sx={styles.root}>
      <Box>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <ButtonBack
              click={() => navigate(`${PathName.instanceCostCenterView}`)}
              sx={{ position: 'inherit' }}
            />
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
            Denominación: {modelData.denomination}
          </Typography>
          <Typography sx={styles.titleCode}>Código: {modelData.code}</Typography>
        </Box>
        <Box sx={{ paddingTop: '30px' }}>
          {details && (
            <>
              {!!details.generalInfo.titles?.length && (
                <GeneralAccordion
                  title={t(`${modelLocale}.creation.title.generalInformation`)}
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
              {!!details.geoStructure.titles?.length && (
                <GeneralAccordion
                  title={t(`${modelLocale}.creation.title.geographicalStructureLevel`)}
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
              {!!details.orgStructure.titles?.length && (
                <GeneralAccordion
                  title={t(`${modelLocale}.creation.title.organizationalStructureLevel`)}
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
          {!!details?.storesRelated && (
            <Box sx={styles.container}>
              <Box sx={styles.box}>
                <Box>
                  <Typography sx={styles.titleSuc}>Sucursales Asociadas al Centro</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    sx={styles.titleNumSuc}
                  >{`${details?.storesRelated} Sucursales Asociadas`}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(PathName.instanceStoresView, {
                        state: { id, denomination: modelData.denomination, code: modelData.code },
                      })
                    }
                  >
                    Ver todo
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
