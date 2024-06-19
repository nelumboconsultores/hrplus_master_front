import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  StepLabelProps,
  StepProps,
  Stepper,
  StepperProps,
} from '@mui/material'
import { ColorlibConnector, QontoStepIconRoot, styles } from './styles'

type DescriptionStepperProps = {
  steps: string[]
  internalProperties?: {
    stepperProps?: StepperProps
    StepProps?: StepProps
    StepLabelProps?: StepLabelProps
  }
}

export const DescriptionStepper: React.FC<DescriptionStepperProps> = ({
  steps,
  internalProperties,
}) => {
  return (
    <Stepper
      {...internalProperties?.stepperProps}
      alternativeLabel
      connector={<ColorlibConnector />}
      sx={styles.container}
    >
      {steps.map((label) => (
        <Step {...internalProperties?.StepProps} key={label}>
          <StepLabel {...internalProperties?.StepLabelProps} StepIconComponent={QontoStepIcon}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props
  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Box className="QontoStepIcon-completedIcon" />
      ) : (
        <Box className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  )
}
