import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IconButton, Tooltip, Typography, Box } from '@mui/material'
import { t } from 'i18next'

import { AppContext, GeneralAccordion, TitleNormal, Variant, icons } from 'core'
import Spinner from 'core/components/spinner'
import { ButtonBack } from 'modules/manageOrganization/components'
import { getModel } from '../../../services/model.services'
import { ActionTypes } from '../../../enums'
import { ModelContext } from '../../../context'
import { getDinamicEditPaths, getDinamicViewPaths } from '../../../utils/getDinamicPaths'
import { getDetailValues } from '../../../utils/getDinamicValues'
import { styles } from './styles'
import { dateToSpanish, formatFieldsWithTheirType } from 'core/utils/textFormat'

interface Details {
  mainTitles: string[]
  mainSubtitles: string[]
}
type ModelData = { code: string; denomination: string; createdAt: string | Date }

export const DetailsModel: React.FC = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { modelDispatch, modelLocale } = useContext(ModelContext)
  const { setActMessage } = useContext(AppContext)
  const [modelData, setModelData] = useState<ModelData>(Object({}))
  const [details, setDetails] = useState<Details | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDetails()
  }, []) //eslint-disable-line

  const getDetails = async () => {
    setLoading(true)
    const { data: resp, error } = await getModel(id ?? '')
    if (resp) {
      const { denomination, code, fieldValues, createdAt, fieldTypes } = resp.data
      setModelData({ code, denomination, createdAt })
      const { titles, values } = getDetailValues(pathname, resp)

      const mainTitles: string[] = titles
      const mainSubtitles: string[] = values

      const additionalFields = formatFieldsWithTheirType(fieldTypes, fieldValues)
      additionalFields.forEach((field) => {
        if (Array.isArray(field.value)) {
          const newChanges = field.value?.map((t) => {
            if (typeof t === 'number') return t
            return t.name
          })
          mainTitles.push(String(field.key))
          mainSubtitles.push(newChanges.join(', '))
          return
        }

        mainTitles.push(String(field.key))
        mainSubtitles.push(String(field.value || '-'))
      })

      setDetails({ mainTitles, mainSubtitles })
    } else if (error) {
      setActMessage({
        type: Variant.error,
        message: t('authentication.alertError'),
      })
    }
    setLoading(false)
  }
  const handleEdit = () => {
    modelDispatch({ type: ActionTypes.CLEAN })

    navigate(`${getDinamicEditPaths(pathname)}/${id}`)
  }

  if (loading) return <Spinner />

  const { code, denomination, createdAt } = modelData

  return (
    <Box sx={styles.root}>
      <Box sx={styles.infoContainer}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <ButtonBack
              click={() => navigate(`${getDinamicViewPaths(pathname)}`)}
              sx={styles.backButton}
            />
            <Typography sx={styles.titleDate}>
              Fecha de Registro {dateToSpanish(createdAt)}
              <Tooltip title={t('general.toolTip.edit')}>
                <IconButton sx={styles.icon} onClick={handleEdit}>
                  {icons.borderColorEdit}
                </IconButton>
              </Tooltip>
            </Typography>
          </Box>
          <Typography sx={styles.titleDenomination}>
            {t(`${modelLocale}.details.labels.denomination`)}: {denomination}
          </Typography>
          <Typography sx={styles.titleCode}>
            {t(`${modelLocale}.details.labels.code`)}: {code}
          </Typography>
        </Box>
        <Box>
          {!!details?.mainTitles?.length && (
            <GeneralAccordion
              title={t(`${modelLocale}.creation.title.generalInformation`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              <TitleNormal titles={details.mainTitles} subtitles={details.mainSubtitles} />
            </GeneralAccordion>
          )}
        </Box>
      </Box>
    </Box>
  )
}
