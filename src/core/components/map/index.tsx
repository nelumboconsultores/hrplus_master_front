import { TextField } from '@mui/material'
import {
  GoogleMap,
  GoogleMapProps,
  useJsApiLoader,
  Marker,
  Libraries,
  Autocomplete,
  AutocompleteProps,
} from '@react-google-maps/api'
import { useRefresh } from 'core/hooks'
import { useEffect, useRef } from 'react'
import { CustomMarker, CustomMarkerProps } from './customMarker'
import { CapitalIconButton } from '../capitalIconButton'
import { useTranslation } from 'react-i18next'
import { icons } from 'core/utils'
const libraries: Libraries = ['places']

type MapProps = GoogleMapProps & {
  autocompleteProps?: {
    show: boolean
    label: string
    onPlaceChanged: (search: google.maps.places.PlaceResult) => void
    defaultValue?: string
    onClean?: () => void
    error?: string
  }
  points?: CustomMarkerProps[]
}
export const Map = ({ autocompleteProps, points, ...rest }: MapProps): JSX.Element => {
  const { t } = useTranslation()
  const { isLoaded } = useJsApiLoader({
    language: 'es',
    id: 'google-map-script',
    libraries: libraries,
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })
  const [refreshAutocomplete, setRefreshAutocomplete] = useRefresh()
  const ref = useRef<google.maps.places.Autocomplete>()

  const restrictOptions = {
    types: ['geocode', 'establishment'],
    fields: ['geometry', 'address_components', 'formatted_address'],
    componentRestrictions: { country: ['col', 'mx'] },
  }

  const onLoad: AutocompleteProps['onLoad'] = (autocomplete) => {
    ref.current = autocomplete
  }

  const handleSearch = () => {
    const place = ref.current?.getPlace()
    if (place) autocompleteProps?.onPlaceChanged(place)
  }

  const handleClean = () => {
    ref.current?.set('place', null)
    if (autocompleteProps?.onClean) autocompleteProps.onClean()
  }

  useEffect(() => {
    if (autocompleteProps?.show) setRefreshAutocomplete()
  }, [autocompleteProps?.defaultValue, autocompleteProps?.show, setRefreshAutocomplete])

  if (!isLoaded) return <></>
  return (
    <>
      <GoogleMap {...rest}>
        {rest.center && !points && <Marker position={Object(rest.center)} />}
        {points && points.map((point, index) => <CustomMarker key={index} {...point} />)}
      </GoogleMap>
      {autocompleteProps?.show && !refreshAutocomplete && (
        <Autocomplete onLoad={onLoad} onPlaceChanged={handleSearch} options={restrictOptions}>
          <TextField
            variant="outlined"
            fullWidth
            label={autocompleteProps.label}
            inputRef={ref}
            autoComplete="off"
            defaultValue={autocompleteProps.defaultValue}
            sx={{ mb: 2 }}
            error={!!autocompleteProps.error}
            helperText={autocompleteProps.error}
            InputProps={{
              endAdornment: (
                <CapitalIconButton title={t('general.toolTip.clean')} onClick={handleClean}>
                  {icons.close}
                </CapitalIconButton>
              ),
            }}
          />
        </Autocomplete>
      )}
    </>
  )
}
