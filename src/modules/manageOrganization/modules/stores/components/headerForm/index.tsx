import { Grid, Typography, Tooltip, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AppContext, DescriptionStepper, FontName } from 'core'
import { useContext, useMemo } from 'react'
import { ModelContext } from '../../context'

export const HeaderForm: React.FC = () => {
  const { modelState } = useContext(ModelContext)
  const { open } = useContext(AppContext)
  const { id } = useParams()
  const { t } = useTranslation()
  const steps = useMemo(() => {
    const ArraySteps = [
      t(`instancesStores.creation.title.generalInformation`),
      t(`instancesStores.creation.title.workPositions`),
    ]
    if (modelState?.geographicalElements?.length)
      ArraySteps.push(t(`instancesStores.creation.title.geographicalStructure`))
    if (modelState?.organizationalElements?.length)
      ArraySteps.push(t(`instancesStores.creation.title.organizationalStructure`))
    ArraySteps.push(t(`instancesStores.creation.title.costCenter`))
    ArraySteps.push('')
    return ArraySteps
  }, [modelState.geographicalElements.length, modelState.organizationalElements.length]) // eslint-disable-line

  const showTitle = modelState && modelState.step < 1
  const title = !id ? 'newCostCenter' : 'editCostCenter'

  const formattedDenomination =
    typeof modelState.formInformation?.denomination === 'string'
      ? modelState.formInformation?.denomination
      : ''
  const formattedCode =
    typeof modelState.formInformation?.code === 'string'
      ? modelState.formInformation?.code.slice(0, 50) +
        (modelState.formInformation?.code.length > 50 ? '...' : '')
      : ''

  return (
    <Grid
      container
      justifyContent={'space-between'}
      sx={{
        alignItems: 'flex-start',
        flexDirection: { sm: 'column-reverse', lg: 'row' },
        flexWrap: { sm: 'wrap', lg: 'nowrap' },
        marginBottom: '16px',
      }}
    >
      <Grid
        item
        sx={{
          padding: { sm: '20px 0px', lg: '0px' /* alignContent: 'center' */ },
          maxWidth: { xl: open ? '550px' : '700px', lg: open ? '350px' : '480px' },
        }}
      >
        {showTitle ? (
          <Typography variant="h1">{t(`instancesStores.creation.title.${title}`)}</Typography>
        ) : (
          <Box>
            <Typography variant="h1" sx={{ fontFamily: FontName.RobotoMedium }}>
              {t(`instancesStores.details.labels.denomination`)}:{' '}
              <Tooltip title={modelState.formInformation?.denomination}>
                <span>{formattedDenomination}</span>
              </Tooltip>
            </Typography>
            <Typography variant="h1" sx={{ fontSize: '1.2rem', fontFamily: FontName.RobotoMedium }}>
              {t(`instancesStores.details.labels.code`)}:{' '}
              <Tooltip title={modelState.formInformation?.code}>
                <span>{formattedCode}</span>
              </Tooltip>
            </Typography>
          </Box>
        )}
      </Grid>
      {steps.length > 2 && (
        <Grid item sx={{ marginRight: { sm: '0px', lg: '-58px', xl: '-77px' } }}>
          <DescriptionStepper
            steps={steps}
            internalProperties={{ stepperProps: { activeStep: modelState?.step } }}
          />
        </Grid>
      )}
    </Grid>
  )
}
