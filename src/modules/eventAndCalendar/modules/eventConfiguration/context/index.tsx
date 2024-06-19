import { createContext, useEffect, useMemo, useReducer, useState } from 'react'
import { EventReducer, cleanState, initialState } from '../reducers'
import { ActionType, EventReducerType } from '../types'
import { getEventDetails } from 'modules/eventAndCalendar/service'
import { ActionTypes } from '../enums/formReducer'
import dayjs from 'dayjs'

type EventConfigurationContextType = {
  eventCongReducer: EventReducerType
  eventCongDispatch: React.Dispatch<ActionType>
  openModal: { id: number; typeChange: boolean } | undefined
  routesValidations: {
    protectDateAndOccurrence: boolean
    protectGuests: boolean
  }
  setOpenModal: React.Dispatch<
    React.SetStateAction<{ id: number; typeChange: boolean } | undefined>
  >
}

export const EventConfigurationContext = createContext<EventConfigurationContextType>(Object({}))

export const EventConfigurationProvider = ({ children }: { children: React.ReactElement }) => {
  const locaState = localStorage.getItem('eventBody')
  const setInit = locaState ? initialState : cleanState
  const [eventCongReducer, eventCongDispatch] = useReducer(EventReducer, setInit)
  const [openModal, setOpenModal] = useState<{ id: number; typeChange: boolean }>()
  const { idEvent, dataSubmit } = eventCongReducer

  const routesValidations = useMemo(() => {
    const { eventData, eventTypeId } = dataSubmit || {}
    const { name, files } = eventData || {}
    const protectDateAndOccurrence = Boolean(eventTypeId && name && files?.length)
    const protectGuests = !(idEvent && !dataSubmit?.global)

    return { protectDateAndOccurrence: !protectDateAndOccurrence, protectGuests }
  }, [eventCongReducer.dataSubmit]) // eslint-disable-line

  const getData = async () => {
    if (!idEvent || dataSubmit) return

    const response = await getEventDetails(Number(idEvent))
    if (response.data) {
      const { data } = response.data
      eventCongDispatch({
        type: ActionTypes.SET_DATA_SUBMIT,
        payload: {
          dateFrom: data.startsAt,
          dateTo: data.endsAt,
          eventTypeId: data.eventType.id,
          eventData: {
            description: data.eventDetail.eventData.description,
            name: data.eventDetail.eventData.name,
            url: data.eventDetail.eventData.url,
            files: data.eventDetail.eventData.files.map((file) => ({
              name: file.name,
              description: file.description,
              url: file.url,
              id: file.id,
            })),
          },
          eventDatePeriods: [
            {
              daysOfWeek: [],
              startsAt: dayjs(data.startsAt).format('HH:mm'),
              endsAt: dayjs(data.endsAt).format('HH:mm'),
            },
          ],
          eventDetailTypeId: 2,
          global: data.global,
          minsReminder: data.minsReminder,
          periodicityId: 1,
        },
      })
    }
  }
  useEffect(() => {
    if (idEvent) getData()
  }, [idEvent]) // eslint-disable-line

  return (
    <EventConfigurationContext.Provider
      value={{
        eventCongReducer,
        eventCongDispatch,
        routesValidations,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </EventConfigurationContext.Provider>
  )
}
