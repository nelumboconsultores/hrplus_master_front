import { Box, Tooltip } from '@mui/material'
import { OverlayView } from '@react-google-maps/api'
import ChMarker from 'core/assets/chmarker'
import React from 'react'

export type CustomMarkerProps = {
  title: React.ReactNode
  center: google.maps.LatLngLiteral
}

export const CustomMarker: React.FC<CustomMarkerProps> = ({ center, title }) => {
  return (
    <OverlayView
      position={Object(center)}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -height })}
      bounds={new window.google.maps.LatLngBounds(center, center)}
    >
      <Tooltip
        title={title}
        placement="right"
        slotProps={{ tooltip: { sx: { backgroundColor: '#ffff' } } }}
      >
        <Box width="25px">
          <ChMarker height={32} />
        </Box>
      </Tooltip>
    </OverlayView>
  )
}
