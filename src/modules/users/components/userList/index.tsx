import { Box, CssBaseline } from '@mui/material'
import { FilterDrawer } from '..'
import { styled } from '@mui/material/styles'
import { useContext, useMemo, useState } from 'react'
import { UsersContext } from 'modules/users/context'
import { WrapperSelect } from 'core/components/popovers'
import { SelectedOptionEnum } from '../enum/selecteOptionEnum'
import { SuperiorOptions } from '../superiorOptions'
import { UserListBasic } from '../userListBasic'
import { UserListError } from '../userListError'
import { usePermissions } from 'core/hooks'
import { ServicesKeys } from 'core/enum/routerEnum'

const Main = styled('main')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    width: `calc(100% - 369px)`,
    position: 'relative',
  }
})

export const UserList = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { setSelectedOption, rowsError } = useContext(UsersContext)
  const { hasAssignWorkPeriodPermission } = usePermissions()

  const { assignWorkPeriod } = useMemo(
    () => ({
      assignWorkPeriod: hasAssignWorkPeriodPermission(ServicesKeys.Users),
    }),
    [], // eslint-disable-line
  )

  const listProfile = [
    {
      name: 'Gestionar Jornadas',
      function: () => handleOptionSelect(SelectedOptionEnum.ManageDays),
      permission: assignWorkPeriod,
    },
    {
      name: 'Gestionar Grupos',
      function: () => handleOptionSelect(SelectedOptionEnum.ManageGroups),
      permission: assignWorkPeriod,
    },
  ]

  const filteredListProfile = listProfile.filter((option) => option.permission === true)
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Main>
        <SuperiorOptions setAnchorEl={setAnchorEl} />
        {rowsError.length === 0 && <UserListBasic />} {rowsError.length > 0 && <UserListError />}
      </Main>
      <WrapperSelect
        list={filteredListProfile}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      />
      <FilterDrawer />
    </Box>
  )
}
