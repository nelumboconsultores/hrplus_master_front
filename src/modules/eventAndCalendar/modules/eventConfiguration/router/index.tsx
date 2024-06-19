import { Route, Routes } from 'react-router-dom'
import { DateAndOccurrence, Description, Guests } from '../pages'
import { PathName, getPath } from 'core'
import { useContext } from 'react'
import { EventConfigurationContext } from '../context'
import { PrivateRoute } from 'core/router/privateRoute'

export const RouterProvider: React.FC = () => {
  const { routesValidations, eventCongReducer } = useContext(EventConfigurationContext)
  const id = eventCongReducer.idEvent

  console.log(id)

  return (
    <Routes>
      <Route path={getPath(PathName.eventDescription)} element={<Description />} />
      <Route path={getPath(PathName.eventDescription) + '/:id'} element={<Description />} />
      <Route
        path={getPath(PathName.eventDateAndOccurrence)}
        element={
          <PrivateRoute
            validation={!routesValidations.protectDateAndOccurrence}
            validationPath={PathName.eventDescription}
            element={<DateAndOccurrence />}
          />
        }
      />
      <Route
        path={getPath(PathName.eventDateAndOccurrence) + '/:id'}
        element={
          <PrivateRoute
            validation={!routesValidations.protectDateAndOccurrence}
            validationPath={PathName.eventDescription + (id ? `/${id}` : '')}
            element={<DateAndOccurrence />}
          />
        }
      />
      <Route
        path={getPath(PathName.eventGuests)}
        element={
          <PrivateRoute
            validation={!routesValidations.protectGuests}
            validationPath={PathName.eventDescription}
            element={<Guests />}
          />
        }
      />
      <Route
        path={getPath(PathName.eventGuests) + '/:id'}
        element={
          <PrivateRoute
            validation={!routesValidations.protectGuests}
            validationPath={PathName.eventDescription + (id ? `/${id}` : '')}
            element={<Guests />}
          />
        }
      />
    </Routes>
  )
}
