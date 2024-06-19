import { Box, Button } from '@mui/material'
import { AppContext, GeneralAccordion, Variant, icons } from 'core'
import { useTranslation } from 'react-i18next'
import { DynamicSelectForm, GenInfoDetail } from '../..'
import { ActionTypes, TypeStructure } from '../../../enums'
import { useContext } from 'react'
import { ModelContext } from '../../../context'
import { styles } from './styles'
import { WorkPeriodsList } from '../../workPeriodsList'

export const GeoStructure = () => {
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const { modelState, modelDispatch, getFields } = useContext(ModelContext)
  const toForward = () => {
    if (!modelState.geographicalFields?.length) {
      setActMessage({
        type: Variant.error,
        message: t('instancesStores.creation.notifications.requiredGeographicalStructure'),
      })
      return
    }
    modelDispatch({ type: ActionTypes.SET_STEP, payload: modelState?.step + 1 })
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.sectionsContainer}>
        <GeneralAccordion
          title={t(`instancesStores.creation.title.generalInformation`)}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <GenInfoDetail />
        </GeneralAccordion>
        <GeneralAccordion
          title={t(`instancesStores.creation.title.geolocation`)}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <GenInfoDetail isGeo showDinamics={false} />
        </GeneralAccordion>
        <GeneralAccordion
          title={t(`instancesStores.creation.title.workPositions`)}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <WorkPeriodsList />
        </GeneralAccordion>
        <GeneralAccordion
          title={t(`instancesStores.creation.title.geographicalStructureLevel`)}
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
          iconTooltip={t('general.button.update')}
          iconExtra={icons.cached}
        >
          <DynamicSelectForm type={TypeStructure.geo} />
        </GeneralAccordion>
      </Box>
      <Box sx={styles.footer}>
        <Button color="secondary" onClick={toForward}>
          Continuar
        </Button>
      </Box>
    </Box>
  )
}
