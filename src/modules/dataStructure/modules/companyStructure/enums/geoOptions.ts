export enum geoOptionsEnum {
  country_state_municipality = 3,
  country_state = 2,
  country = 1,
}
export const options = [
  { value: geoOptionsEnum.country_state_municipality, label: 'País - Estado - Municipio' },
  { value: geoOptionsEnum.country_state, label: 'País - Estado' },
  { value: geoOptionsEnum.country, label: 'País' },
]

export const valueGeoOptions: { [key: string]: string } = {
  [geoOptionsEnum.country_state_municipality]: 'País - Estado - Municipio',
  [geoOptionsEnum.country_state]: 'País - Estado',
  [geoOptionsEnum.country]: 'País',
}
