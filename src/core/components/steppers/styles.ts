import { StepConnector, stepConnectorClasses, styled } from '@mui/material'
import { SxStyles } from 'core'

export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
      backgroundColor: theme.palette.primary.main,
      zIndex: 1,
      width: '16px',
      height: '16px',
      borderRadius: '50%',
    },
    '& .QontoStepIcon-circle': {
      width: '12px',
      zIndex: 1,
      height: '12px',
      borderRadius: '50%',
      backgroundColor: theme.palette.grey[400],
      ...(ownerState.active && {
        backgroundColor: '#fff',
        width: '16px',
        height: '16px',
        border: `1px solid ${theme.palette.primary.main}`,
        zIndex: 1,
      }),
    },
  }),
)

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: '9px',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[800],
    borderRadius: 1,
  },
}))

export const styles: SxStyles<'container'> = {
  container: {
    '& .MuiStepLabel-alternativeLabel': {
      marginTop: '0px',
      textAlign: 'start',
    },
    '& .MuiStepLabel-label': {
      lineHeight: 1,
    },
    '& .MuiStepLabel-root': {
      alignItems: 'flex-start',
    },
    '& .MuiStepConnector-root': {
      left: ' calc(-100% + 20px)',
      right: 'calc(77% + 20px)',
    },
    '& .MuiStepLabel-label.MuiStepLabel-alternativeLabel': {
      marginTop: '0px',
    },
  },
}
