import { GeoAutocompleteSearch } from '../types'

export function onSearchSelected(place: google.maps.places.PlaceResult) {
  const { address_components, formatted_address } = place
  const searchByType = (type: string) => {
    return address_components?.find((component) => component.types.includes(type))
  }

  const fields: GeoAutocompleteSearch = {
    address: formatted_address,
    latitude: place.geometry?.location?.lat(),
    longitude: place.geometry?.location?.lng(),
    country: searchByType('country')?.long_name,
    state: searchByType('administrative_area_level_1')?.long_name,
    city: searchByType('locality')?.long_name,
    zipcode: searchByType('postal_code')?.long_name,
  }
  return fields
}
