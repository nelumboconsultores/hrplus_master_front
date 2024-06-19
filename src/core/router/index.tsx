import { useContext, useEffect, useMemo } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { AppContext, compareOnlyLetters, getLocalStorage } from 'core'
import { PathName } from 'core/enum'
import { PrivateRoute } from './privateRoute'
import { ServicesKeys } from 'core/enum/routerEnum'
import { usePermissions } from 'core/hooks'
import Spinner from 'core/components/spinner'
import { lazy, Suspense } from 'react'

export const RoutesProvider = () => {
  const { isAuthenticated, permissionsLoaded } = useContext(AppContext)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { canSeePage } = usePermissions()

  const modules = useMemo(
    () => ({
      LazyUsersModule: lazy(() => import('modules/users')),
      LazyIncidentsModule: lazy(() => import('modules/incidents')),
      LazyWorkingDaysModule: lazy(() => import('modules/workingDays')),
      LazyCatalogMotfsModule: lazy(() => import('modules/catalogMotifs')),
      LazyAuthenticationModule: lazy(() => import('modules/authentication')),
      LazyHomeModule: lazy(() => import('modules/home')),
      LazySetupModule: lazy(() => import('modules/setup')),
      LazyLocationModule: lazy(() => import('modules/location')),
      LazyScheduleHolidaysModule: lazy(() => import('modules/eventAndCalendar')),
      LazyUserStructureModule: lazy(() => import('modules/dataStructure')),
      LazyManageOrganizationModule: lazy(() => import('modules/manageOrganization')),
      LazyContributorsModule: lazy(() => import('modules/contributors')),
    }),
    [],
  )

  useEffect(() => {
    const userInfo = getLocalStorage()
    const isNotSetup = !userInfo?.isFinishedLocalization || !userInfo?.isAcceptedTerms
    if (userInfo?.canSetup && isNotSetup && isAuthenticated) {
      if (compareOnlyLetters(pathname, PathName.Setup)) return
      if (!compareOnlyLetters(pathname, PathName.TermsConditions) && !userInfo.isAcceptedTerms) {
        navigate(PathName.Setup + PathName.TermsConditions)
      } else if (
        !compareOnlyLetters(pathname, PathName.LocationModule) &&
        !userInfo.isFinishedLocalization &&
        userInfo.isAcceptedTerms
      ) {
        navigate(PathName.LocationView, { state: { stateData: 'stateData' } })
      }
    }
  }, [pathname, navigate, isAuthenticated])

  if (!permissionsLoaded && isAuthenticated) {
    return (
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner />
      </Box>
    )
  }

  return (
    <Routes>
      <Route
        path={PathName.UsersModule}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.UserGroups, ServicesKeys.Users])}
              element={<modules.LazyUsersModule />}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.IncidentsModule}
        element={
          <PrivateRoute
            validation={canSeePage([ServicesKeys.SolicitationCatalogs])}
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute
                  validation={canSeePage([ServicesKeys.SolicitationCatalogs])}
                  element={<modules.LazyIncidentsModule />}
                />
              </Suspense>
            }
          />
        }
      />
      <Route
        path={PathName.LocationModule}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute validation={isAuthenticated} element={<modules.LazyLocationModule />} />
          </Suspense>
        }
      />
      <Route
        path={PathName.WorkingDays + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.WorkPeriods])}
              element={<modules.LazyWorkingDaysModule />}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.EventsAndCalendarModule}
        element={
          <PrivateRoute
            validation={canSeePage([ServicesKeys.EventDate])}
            element={
              <Suspense fallback={<Spinner />}>
                <PrivateRoute
                  validation={canSeePage([ServicesKeys.EventDate])}
                  element={<modules.LazyScheduleHolidaysModule />}
                />
              </Suspense>
            }
          />
        }
      />
      <Route
        path={PathName.CatalogMotifsModule}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.Catalogs])}
              element={<modules.LazyCatalogMotfsModule />}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.CatalogOtherModule}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.Catalogs])}
              element={<modules.LazyCatalogMotfsModule />}
            />
          </Suspense>
        }
      />
      {/*    <Route
        path={PathName.CompanyStructure + '/*'}
        element={
          <PrivateRoute validation={isAuthenticated} element={<CompanyMacroStructureModule />} />
        }
      /> */}
      <Route
        path={PathName.Home + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute validation={isAuthenticated} element={<modules.LazyHomeModule />} />
          </Suspense>
        }
      />

      <Route
        path={PathName.Setup + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute validation={isAuthenticated} element={<modules.LazySetupModule />} />
          </Suspense>
        }
      />
      <Route
        path={PathName.UserStructure + '*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.OrgEntities])}
              element={<modules.LazyUserStructureModule />}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.organizationManagement + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={canSeePage([ServicesKeys.OrgEntitiesRelationships])}
              element={<modules.LazyManageOrganizationModule />}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.Authentication}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute
              validation={!isAuthenticated}
              element={<modules.LazyAuthenticationModule />}
              validationPath={PathName.Home}
            />
          </Suspense>
        }
      />
      <Route
        path={PathName.contributorsModule + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <PrivateRoute validation={true} element={<modules.LazyContributorsModule />} />
          </Suspense>
        }
      />
      <Route path="*" element={<Box>404</Box>} />
    </Routes>
  )
}
