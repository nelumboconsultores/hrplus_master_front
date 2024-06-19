import { Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AppContext, DescriptionStepper, FontName } from 'core'
import { useContext, useMemo } from 'react'
import { ModelContext } from '../../context'

export const HeaderForm: React.FC = () => {
  const { modelState, modelLocale } = useContext(ModelContext)
  const { open } = useContext(AppContext)
  const { id } = useParams()
  const { t } = useTranslation()
  const steps = useMemo(() => {
    const ArraySteps = [t(`${modelLocale}.creation.title.generalInformation`)]
    if (modelState?.geographicalElements?.length)
      ArraySteps.push(t(`${modelLocale}.creation.title.geographicalStructure`))
    if (modelState?.organizationalElements?.length)
      ArraySteps.push(t(`${modelLocale}.creation.title.organizationalStructure`))
    ArraySteps.push('')
    return ArraySteps
  }, [modelState.geographicalElements.length, modelState.organizationalElements.length]) // eslint-disable-line

  const showTitle = modelState && modelState.step < 1
  const title = !id ? 'newCostCenter' : 'editCostCenter'

  return (
    <Grid
      container
      justifyContent={'space-between'}
      sx={{
        flexDirection: { sm: 'column-reverse', lg: 'row' },
        flexWrap: { sm: 'wrap', lg: 'nowrap' },
      }}
    >
      <Grid
        item
        sx={{
          padding: { sm: '20px 0px', lg: '0px', alignContent: 'center' },
          maxWidth:
            steps.length > 2
              ? { xl: open ? '605px' : '700px', lg: open ? '450px' : '550px' }
              : undefined,
        }}
      >
        {showTitle ? (
          <Typography variant="h1">{t(`${modelLocale}.creation.title.${title}`)}</Typography>
        ) : (
          <>
            <Typography variant="h1" sx={{ fontFamily: FontName.RobotoMedium, fontSize: '1.3rem' }}>
              {t(`${modelLocale}.details.labels.denomination`)}:{' '}
              {modelState.formInformation?.denomination?.toString()}
            </Typography>
            <Typography variant="h1" sx={{ fontFamily: FontName.RobotoMedium, fontSize: '1.2rem' }}>
              {t(`${modelLocale}.details.labels.code`)}:{' '}
              {modelState.formInformation?.code?.toString()}
            </Typography>
          </>
        )}
      </Grid>
      {steps.length > 2 ? (
        <Grid sx={{ marginRight: { sm: '0px', lg: '-58px', xl: '-77px' } }}>
          <DescriptionStepper
            steps={steps}
            internalProperties={{ stepperProps: { activeStep: modelState?.step } }}
          />
        </Grid>
      ) : (
        <Box sx={{ height: '50px', backgroundColor: 'transparent' }}></Box>
      )}
    </Grid>
  )
}
