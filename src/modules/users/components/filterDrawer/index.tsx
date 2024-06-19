import { Box, IconButton } from '@mui/material'
import { ScreenEnabledDrawer, icons } from 'core'
import { styles } from './styles'
import { useContext } from 'react'
import { UsersContext } from 'modules/users/context'
import { DayManagmentForm, ManagmentGroupsForm } from '..'
import { SelectedOptionEnum } from '../enum/selecteOptionEnum'
import { FiltersForm } from '../filtersForm'

export const FilterDrawer = () => {
  const { selectedOption, setSelectedOption, rowsError } = useContext(UsersContext)

  const handleClose = () => setSelectedOption(SelectedOptionEnum.None)

  return (
    <ScreenEnabledDrawer open={true} anchor="right" sx={styles.container} variant="permanent">
      <Box sx={styles.boxForm}>
        {selectedOption !== SelectedOptionEnum.None && rowsError.length === 0 && (
          <IconButton sx={styles.close} onClick={handleClose}>
            {icons.close}
          </IconButton>
        )}
        {selectedOption === SelectedOptionEnum.None && <FiltersForm />}
        {selectedOption === SelectedOptionEnum.ManageDays && <DayManagmentForm />}
        {selectedOption === SelectedOptionEnum.ManageGroups && <ManagmentGroupsForm />}
      </Box>
    </ScreenEnabledDrawer>
  )
}
