import { Box, Typography } from '@mui/material'
import { BCDynamic } from '..'
import { RouteRoad } from '../../types'

export const HeaderTitle = ({ title, routeRoad }: { title: string; routeRoad: RouteRoad[] }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography lineHeight={1} variant="h1">
        {title}
      </Typography>
      <BCDynamic list={routeRoad} />
    </Box>
  )
}
