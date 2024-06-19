import { Box, Button } from '@mui/material'
import { AppContext, GeneralAccordion, Variant, icons } from 'core'
import { DynamicSelectForm, GenInfoDetail } from '../..'
import { TypeStructure } from '../../../enums'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ModelContext } from '../../../context'
import { DetailCard } from '../../dynamicSelectForm/detailCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { styles } from '../geoStructure/styles'
import { getDinamicDetailsPaths } from '../../../utils/getDinamicPaths'

type StructureProps = {
  typeStructure: TypeStructure
}
export const OrgStructure: React.FC<StructureProps> = ({ typeStructure }) => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { modelState, modelLocale, getFields } = useContext(ModelContext)
  const { pathname } = useLocation()
  const { setActMessage } = useContext(AppContext)
  const navigate = useNavigate()

  const isGeo = modelState?.geographicalFields ?? []

  const toForward = async () => {
    const message = id ? 'editSuccess' : 'createSuccess'
    setActMessage({
      message: t(`${modelLocale}.creation.notifications.${message}`),
      type: Variant.success,
    })
    navigate(getDinamicDetailsPaths(pathname) + `/${modelState?.id}`)
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

        {isGeo.length > 0 && (
          <GeneralAccordion
            title={t(`${modelLocale}.creation.title.geographicalStructureLevel`)}
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
          title={t(`${modelLocale}.creation.title.organizationalStructureLevel`)}
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
          <DynamicSelectForm type={typeStructure} />
        </GeneralAccordion>
      </Box>
      <Box sx={styles.footer}>
        <Button color="secondary" onClick={toForward}>
          Guardar
        </Button>
      </Box>
    </Box>
  )
}
