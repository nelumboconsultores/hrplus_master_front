import { Box, Button } from '@mui/material'
import { AppContext, GeneralAccordion, Variant, icons } from 'core'
import { DynamicSelectForm, GenInfoDetail } from '../..'
import { ActionTypes, TypeStructure } from '../../../enums'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ModelContext } from '../../../context'
import { DetailCard } from '../../dynamicSelectForm/detailCard'
import { styles } from '../geoStructure/styles'
import { WorkPeriodsList } from '../../workPeriodsList'

type StructureProps = {
  typeStructure: TypeStructure
}
export const OrgStructure: React.FC<StructureProps> = ({ typeStructure }) => {
  const { t } = useTranslation()
  const { setActMessage } = useContext(AppContext)
  const { modelDispatch, modelState, getFields } = useContext(ModelContext)

  const isGeo = modelState?.geographicalFields ?? []

  const toForward = async () => {
    if (!modelState.organizationalFields?.length) {
      setActMessage({
        type: Variant.error,
        message: t('instancesStores.creation.notifications.requiredOrganizationalStructure'),
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

        {isGeo.length > 0 && (
          <GeneralAccordion
            title={t(`instancesStores.creation.title.geographicalStructureLevel`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '12px' }}>
              {isGeo.map((structure) => (
                <DetailCard key={structure?.id} structures={structure} />
              ))}
            </Box>{' '}
          </GeneralAccordion>
        )}

        <GeneralAccordion
          title={t(`instancesStores.creation.title.organizationalStructureLevel`)}
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
          iconTooltip={t('general.button.update')}
        >
          <DynamicSelectForm type={typeStructure} />
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
