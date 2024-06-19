interface StatusInfo {
  name: string
  color: string
}

export enum StatusUsers {
  active = 1,
  draft = 2,
  fired = 3,
}

export const getStatusInfo = (id: number): StatusInfo | undefined => {
  switch (id) {
    case StatusUsers.active:
      return { name: 'ACTIVO', color: '#31c462' }
    case StatusUsers.fired:
      return { name: 'SUSPENDIDO', color: '#fc4f1f' }
    case StatusUsers.draft:
      return { name: 'BORRADOR', color: '#c9c9c9' }
    default:
      return undefined
  }
}
