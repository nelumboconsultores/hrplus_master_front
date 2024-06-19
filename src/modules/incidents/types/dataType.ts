export type Data = {
  id: number

  isActive: boolean
  name: string
  acronym: string
  namePublic: string
  description: string
  policyFile: string
  date: string
  registerTime: boolean
  required_date_range: boolean
  folioNumber: string
  insuranceType: {
    id: number
    name: string
  }
  incapacityType: {
    id: number
    name: string
  }
  occupationalRiskType: {
    id: number
    name: string
  }
  st2File: boolean
  st7File: boolean
  justificationCatalog: {
    id: number
    name: string
    isActive: boolean
    createdAt: string
  }
  maxTimeJustification: {
    id: number
    name: string
  }
  activateTimeOmission: {
    id: number
    name: string
  }
  omissionCatalog: {
    id: number
    name: string
    isActive: boolean
    createdAt: string
  }
  requestDate: boolean
  dateStart: string
  dateEnd: string
  calculateDateEnd: boolean
  requestEffectiveDate: boolean
  comments: boolean
  helpFile: string
  configEvidences: ConfigEvidencesType[]
  delegate: boolean
  effectSalaryType: {
    id: number
    name: string
  }
  manageActions: [
    {
      id: number
      actionType: {
        id: number
        name: string
        type: number
      }
      description: string
      position: number
      solicitationActionType: {
        id: number
        name: string
        type: number
      }
    },
  ]
}

export type DataCard = {
  id: number
  label: string
  switchIsRequired: boolean
  isRequired: boolean
  sizes: number
  amounts: number
  lists?: { label: string; value: number; id: string }[]
  checkboxes?: { name: string; checked: boolean }[]
  textHelp: string
  evidenceType: number
  solicitationCatalogId: number
}

export type ConfigEvidencesType = {
  textHelp: string
  id: number
  required: boolean
  evidenceType: {
    id: number
    description: string
    key: string
  }
  config: {
    sizes: number
    amounts: number

    textHelp: string
    types: string[]
  }
}
