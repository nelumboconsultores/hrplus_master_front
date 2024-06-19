type EventModal = {
  open: boolean
  date?: Date
  data?: {
    id: number
    description: string
    dates: {
      start: Date
      end: Date
    }
    eventsDetail: {
      id: number
      data: {
        name: string
      }
    }[]
  }[]
}

type Loadings = {
  main: boolean
}

export type { EventModal, Loadings }
