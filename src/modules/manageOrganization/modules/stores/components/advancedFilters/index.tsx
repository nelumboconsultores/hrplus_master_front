import { Box } from '@mui/material'
import { FontName, GeneralAccordion, icons } from 'core'
import { TypeStructure } from '../../enums'
import { DynamicSelectForm } from './dynamicSelectForm'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ModelContext } from '../../context'
import { LoadingButton } from '@mui/lab'

export const AdvancedFilters: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { t } = useTranslation()
  const { getFields } = useContext(ModelContext)

  return (
    <Box mt={3}>
      <GeneralAccordion
        title={t(`instancesStores.view.inputs.geographicalStructure`)}
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
      <GeneralAccordion
        title={t(`instancesStores.view.inputs.organizationalStructure`)}
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
        <DynamicSelectForm type={TypeStructure.org} />
      </GeneralAccordion>

      <Box width="100%" display="flex" justifyContent="flex-end">
        <LoadingButton
          color="secondary"
          loading={loading ?? false}
          type="submit"
          variant="contained"
          sx={{
            fontFamily: FontName.RobotoMedium,
            fontSize: '0.9rem',
          }}
        >
          {t('instancesStores.view.actions.btn')}
        </LoadingButton>
      </Box>
    </Box>
  )
}
