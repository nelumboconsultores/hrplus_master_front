export type StructureByType = {
  orgEntityType: {
    id: number
    name: string
    complete: boolean
  }
  details: {
    id: number
    structures: {
      id: number
      name: string
      orgEntity: {
        id: number
        name: string
        createdAt: string
        isCompleted: boolean
      }
      associatedRecords: boolean
      children: {
        id: number
        name: string
        orgEntity: {
          id: number
          name: string
          parentId: {
            id: number
            name: string
          }
          createdAt: string
          isCompleted: boolean
        }
        parentId: number
        associatedRecords: boolean
      }[]
    }[]
  }[]
}

export type WorkPosition = {
  id: number
  createdAt: Date
  code: string
  denomination: string
  fieldValues: Record<string, string | number | boolean | number[]>
  status: {
    id: number
    name: string
  }
  authorizedStaff: number
  workPositionCategory: {
    id: number
    createdAt: Date
    code: string
    denomination: string
    fieldValues: Record<string, string | number | boolean | number[]>
    status: {
      id: number
      name: string
    }
  }
  compTab: {
    id: number
    createdAt: Date
    code: string
    denomination: string
    fieldValues: Record<string, string | number | boolean | number[]>
    status: {
      id: number
      name: string
    }
    minAuthorizedSalary: number
    maxAuthorizedSalary: number
  }
  compCategory: {
    id: number
    createdAt: Date
    code: string
    denomination: string
    fieldValues: Record<string, string | number | boolean | number[]>
    status: {
      id: number
      name: string
    }
  }
  costCenter: {
    id: number
    createdAt: Date
    code: string
    denomination: string
    country: {
      id: number
      name: string
    }
    state: {
      id: number
      name: string
      countryId: number
    }
    city: {
      id: number
      name: string
      stateId: number
    }
    fieldValues: Record<string, string | number | boolean | number[]>
    status: {
      id: number
      name: string
    }
  }
  store: {
    id: number
    createdAt: Date
    code: string
    denomination: string
    fieldValues: Record<string, string | number | boolean | number[]>
    status: {
      id: number
      name: string
    }
    address: string
    zipcode: string
    georefDistance: number
    latitude: number
    longitude: number
    country: {
      id: number
      name: string
    }
    state: {
      id: number
      name: string
      countryId: number
    }
    city: {
      id: number
      name: string
      stateId: number
    }
    costCenter: {
      id: number
      createdAt: Date
      code: string
      denomination: string
      country: {
        id: number
        name: string
      }
      state: {
        id: number
        name: string
        countryId: number
      }
      city: {
        id: number
        name: string
        stateId: number
      }
      fieldValues: Record<string, string | number | boolean | number[]>
      status: {
        id: number
        name: string
      }
    }
  }
  minSalary: number
  orgManager: {
    id: number
    code: string
    denomination: string
  }
  approvalManager: {
    id: number
    code: string
    denomination: string
  }
  structuresByType: StructureByType[]
}
export type ProfileDetails = {
  id: number
  fullName: string
  firstName: string
  middleName: string
  lastName: string
  maidenName: string
  imageUrl: string
  hiredDate: Date
  orgProfileAccess: {
    id: number
    organigrama: {
      id: number
      name: string
      description: string
      parentId: number
    }
  }
  workPeriod: [
    {
      id: number
      name: string
    },
  ]
  groups: [
    {
      name: string
    },
  ]
  workPosition: WorkPosition
  compTab: {
    id: number
    code: string
    denomination: string
  }
  compCategory: {
    id: number
    code: string
    denomination: string
  }
  profileStatus: {
    id: number
    name: string
    hibernateLazyInitializer: Record<string, unknown>
  }
  usernameCode: string
}
