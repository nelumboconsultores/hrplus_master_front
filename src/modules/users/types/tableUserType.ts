export type ContentDataUser = {
  id: number
  profileStatus: { id: number | number[] }
  usernameCode: string
  fullName: string
  firstName: string
  middleName?: string
  userPhone?: string
  maidenName?: string
  lastName: string
  position: string
  rol: string
  email: string
  branch: string
  gender: string
  hiredDate: string
  orgProfileAccess: {
    id: number
    organigrama: {
      id: number
      name: string
      description: string
    }
  }
  workPeriod: Array<{
    id: number
    name: string
  }>
  workPosition: {
    code: string
    denomination: string
    costCenter: {
      code: string
      denomination: string
    }
    minSalary: number
  }
  groups: { name: string }[]
}
export type DataUserTable = {
  id: number
  name: string
  sex: string
  position: string
  /*   journey: {id: number} */
  groups: { name: string }[] | string
}

export type ErrorTableType = {
  id: number
  name: string
  sex: string
  position: string
  conflict_detected: string
}[]
