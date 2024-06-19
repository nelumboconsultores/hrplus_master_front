import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AppContext, DescriptionStepper } from 'core'
import { useContext } from 'react'
import { WorkPositionsContext } from '../../context'

export const HeaderForm: React.FC = () => {
  const { modelState } = useContext(WorkPositionsContext)
  const { open } = useContext(AppContext)
  const { id } = useParams()
  const { t } = useTranslation()
  const steps = [
    t(`instancesWorkPositions.creation.stepper.generalInformation`),
    t(`instancesWorkPositions.creation.stepper.jobCategory`),
    t(`instancesWorkPositions.creation.stepper.tabulatorCompensation`),
    t(`instancesWorkPositions.creation.stepper.nominalStructure`),
    '',
  ]

  const title = !id ? 'newCostCenter' : 'editCostCenter'
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
          padding: { sm: '20px 0px', lg: '0px', alignContent: 'center' },
          maxWidth: { xl: open ? '595px' : '700px', lg: open ? '440px' : '500px' },
        }}
      >
        {(!modelState.formInformation?.title || modelState?.step === 0) && (
          <Typography variant="h1">
            {t(`instancesWorkPositions.creation.title.${title}`)}
          </Typography>
        )}
        {modelState.formInformation?.title && modelState?.step !== 0 && (
          <Box>
            <Typography variant="h1">
              {t('instancesWorkPositions.creation.title.position') +
                ': ' +
                modelState.formInformation?.title}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: '1.2rem' }}>
              {t('instancesWorkPositions.view.inputs.code') +
                ': ' +
                modelState.formInformation?.code}
            </Typography>
          </Box>
        )}
      </Grid>

      <Grid item sx={{ marginRight: { sm: '0px', lg: '-58px', xl: '-77px' } }}>
        <DescriptionStepper
          steps={steps}
          internalProperties={{ stepperProps: { activeStep: modelState?.step } }}
        />
      </Grid>
    </Grid>
  )
}
