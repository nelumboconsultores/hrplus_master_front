import { useEffect, useState } from 'react'

export const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 19.4183512,
    lng: -99.1572547,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
      })
    } else setUserLocation({ lat: 19.4183512, lng: -99.1572547 })
  }, [setUserLocation])

  return userLocation
}
