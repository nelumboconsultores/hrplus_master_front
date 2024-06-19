import { Map } from 'core'
import { useUserLocation } from '../../hooks'
import { useEffect, useMemo, useState } from 'react'
import { StoreLocation, getLocations } from '../../services/model.services'
import { Box, Typography } from '@mui/material'
import { CustomMarkerProps } from 'core/components/map/customMarker'
import { styles } from './styles'

const RenderInformation = ({ data }: { data: StoreLocation }) => {
  return (
    <Box padding={1}>
      <Typography sx={styles.title}>{`${data.code} - ${data.denomination}`}</Typography>
      <Typography sx={styles.address}>{data.address}</Typography>
    </Box>
  )
}
export const StoresMap: React.FC = () => {
  const center = useUserLocation()
  const [locations, setLocations] = useState<StoreLocation[]>([])

  const Points: CustomMarkerProps[] = useMemo(
    () =>
      locations.map((location) => ({
        title: <RenderInformation data={location} />,
        center: Object({ lat: location.latitude, lng: location.longitude }),
      })),
    [locations],
  )

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getLocations()
      if (data) setLocations(data.data)
    }
    fetchData()
  }, [])

  return (
    <Map
      mapContainerStyle={{ height: 'calc(100vh - 321.9px)', width: '100%', margin: '0 0 16px 0' }}
      points={Points}
      zoom={18}
      center={center}
    />
  )
}
