import { Box, Fade, BoxProps } from '@mui/material'

type AnimatedContainerProps = BoxProps & {
  show?: boolean
  timeout?: number
  unmountOnExit?: boolean
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  show = true,
  timeout = 500,
  unmountOnExit = true,
  ...boxProps
}) => (
  <Fade in={show} timeout={timeout} unmountOnExit={unmountOnExit}>
    <Box {...boxProps} />
  </Fade>
)
