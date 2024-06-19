import { Box } from '@mui/material'
import { useStyles } from './useStyles'

const Spinner = (props: {
  topAndLeft?: number
  widthAndHeight?: number
  size?: number
  containerHeight?: number
}) => {
  const topAndLeft = `${props?.topAndLeft ?? 36}px`
  const widthAndHeight = `${props?.widthAndHeight ?? 72}px`
  const { container, body } = useStyles(
    props?.size ?? 0,
    topAndLeft,
    widthAndHeight,
    props?.containerHeight ?? 300,
  )
  return (
    <Box sx={container}>
      <Box sx={body}>
        <div></div>
        <div></div>
      </Box>
    </Box>
  )
}

export default Spinner
