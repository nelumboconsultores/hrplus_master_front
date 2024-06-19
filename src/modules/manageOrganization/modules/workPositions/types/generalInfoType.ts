import { CardArrows } from 'modules/manageOrganization/types'

export type GeneralInfoType = {
  main: {
    code: string
    name: string
    address: string
  }
  structureGeo: CardArrows
  structureOrg: CardArrows[]
}
