export type DataUserTable = {
  id: number
  firstName: string
  lastName: string
  sex: string
  position: string
  rol: string
  email: string
  branch: string
  groups?: { name: string }[] | string
}
