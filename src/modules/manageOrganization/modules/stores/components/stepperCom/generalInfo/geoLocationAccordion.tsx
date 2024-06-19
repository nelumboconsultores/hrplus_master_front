import { Grid } from '@mui/material'
import { GeneralAccordion, ItemsSelectType, Map, ReturnInput, isEmpty, isStringEquals } from 'core'
import { TypeJson } from 'core/components/returnInput/typeJson'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { GeoAutocompleteSearch } from '../../../types'
import { useEffect, useMemo, useState } from 'react'
import { GoogleMapProps } from '@react-google-maps/api'
import { onSearchSelected } from '../../../utils/onSearchSelected'
import { useRefresh } from 'core/hooks'
import Spinner from 'core/components/spinner'

type GeoLocationAccordionProps = {
  fields: TypeJson[]
}

type HierarchiesOptions = {
  country: ItemsSelectType[]
  state: ItemsSelectType[]
  city: ItemsSelectType[]
}

export const GeoLocationAccordion: React.FC<GeoLocationAccordionProps> = ({ fields }) => {
  const { t } = useTranslation()
  const { setValue, watch, formState, clearErrors } = useFormContext()
  const [hierarchyOptions, setHierarchyOptions] = useState<HierarchiesOptions>(Object({}))
  const [searchData, setSearchData] = useState<GeoAutocompleteSearch>(Object({}))
  const [refreshFields, setRefreshFields] = useRefresh()

  const centerValues = watch(['latitude', 'longitude'])
  const center: GoogleMapProps['center'] = useMemo(() => {
    const latitude = centerValues[0] ?? 19.4183512
    const longitude = centerValues[1] ?? -99.1572547
    return { lat: latitude, lng: longitude }
  }, [centerValues])

  const obtainHierarchyOptions = (options: ItemsSelectType[], name: string) => {
    const names = { countryId: 'country', stateId: 'state', cityId: 'city' }
    setHierarchyOptions({ ...hierarchyOptions, [names[name as keyof typeof names]]: options })
  }

  const handleSearch = (search: google.maps.places.PlaceResult) => {
    const searchData = onSearchSelected(search)
    setSearchData(searchData)
    const { address, latitude, longitude, zipcode } = searchData

    setValue('address', address)
    setValue('latitude', latitude)
    setValue('longitude', longitude)
    setValue('zipcode', zipcode)
    setRefreshFields()
  }

  const getIdByName = (name: string, field: 'country' | 'state' | 'city') => {
    const options = hierarchyOptions[field]
    const option = options?.find((item) => isStringEquals(item.label as string, name))
    return option?.value
  }

  useEffect(() => {
    const setGeoLocation = async () => {
      if (isEmpty(searchData)) return

      const { country, state, city } = searchData
      setValue('countryId', getIdByName(country as string, 'country'))
      if (hierarchyOptions.state?.length) setValue('stateId', getIdByName(state as string, 'state'))
      if (hierarchyOptions.city?.length) setValue('cityId', getIdByName(city as string, 'city'))
    }
    setGeoLocation()
  }, [searchData, hierarchyOptions]) // eslint-disable-line

  useEffect(() => {
    if (formState.errors.address && watch('address')) clearErrors('address')
  }, [watch('address')]) // eslint-disable-line

  return (
    <GeneralAccordion
      title={t('instancesStores.creation.title.geolocation')}
      props={{ accordionProps: { defaultExpanded: true, sx: { width: '100%' } } }}
    >
      <Map
        center={center}
        mapContainerStyle={{ height: '400px', width: '100%', margin: '0 0 16px 0' }}
        zoom={18}
        autocompleteProps={{
          show: true,
          label: t('instancesStores.creation.label.address'),
          onPlaceChanged: handleSearch,
          defaultValue: watch('address'),
          onClean: () => setValue('address', ''),
          error: formState.errors.address?.message as string,
        }}
      />
      {!refreshFields && (
        <Grid container spacing={2}>
          {fields?.map((item, index) => (
            <ReturnInput field={item} obtainHierarchyOptions={obtainHierarchyOptions} key={index} />
          ))}
        </Grid>
      )}
      {refreshFields && <Spinner containerHeight={200} />}
    </GeneralAccordion>
  )
}
