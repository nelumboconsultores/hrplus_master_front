import { Box, Button } from '@mui/material'
import { AppContext, GeneralAccordion, Variant, icons } from 'core'
import { useTranslation } from 'react-i18next'
import { DynamicSelectForm, GenInfoDetail } from '../..'
import { ActionTypes, TypeStructure } from '../../../enums'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ModelContext } from '../../../context'
import { styles } from './styles'
import { getDinamicDetailsPaths } from '../../../utils/getDinamicPaths'

export const GeoStructure = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { modelState, modelDispatch, getFields, modelLocale } = useContext(ModelContext)
  const { pathname } = useLocation()

  const { setActMessage } = useContext(AppContext)
  const navigate = useNavigate()
  const toForward = () => {
    if (modelState.organizationalElements.length > 0) {
      modelDispatch({ type: ActionTypes.SET_STEP, payload: (modelState?.step ?? 0) + 1 })
    } else {
      const message = id ? 'editSuccess' : 'createSuccess'
      setActMessage({
        message: t(`${modelLocale}.creation.notifications.${message}`),
        type: Variant.success,
      })
      navigate(getDinamicDetailsPaths(pathname) + `/${modelState?.id}`)
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.sectionsContainer}>
        <GeneralAccordion
          title={t(`${modelLocale}.creation.title.generalInformation`)}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <GenInfoDetail />
        </GeneralAccordion>
        {modelState['geographicalElements'].length > 0 && (
          <GeneralAccordion
            title={t(`${modelLocale}.creation.title.geographicalStructureLevel`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
              iconExtraProps: {
                color: 'secondary',
                onClick: (e) => {
                  getFields()
                  e.stopPropagation()
                },
              },
            }}
            iconExtra={icons.cached}
            iconTooltip={t('general.toolTip.update')}
          >
            <DynamicSelectForm type={TypeStructure.geo} />
          </GeneralAccordion>
        )}
      </Box>
      <Box sx={styles.footer}>
        <Button color="secondary" onClick={toForward}>
          Continuar
        </Button>
      </Box>
    </Box>
  )
}
