import { Box, IconButton } from '@mui/material'
import { DynamicFormValues, ScreenEnabledDrawer, icons } from 'core'
import { styles } from './styles'
import { FiltersForm } from '../filtersForm'
import { FilterType } from 'modules/contributors/types/filterType'

type FilterDrawerProps = {
  open: boolean
  onClose: () => void
  getDataTable: () => void
  initVal: DynamicFormValues
  seeCollaborators: boolean
  status: number | undefined
  setInitVal: React.Dispatch<React.SetStateAction<DynamicFormValues>>
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  getDataTable,
  initVal,
  status,
  seeCollaborators,
  setInitVal,
  setFilters,
}) => {
  return (
    <ScreenEnabledDrawer open={open} anchor="right" sx={styles.container}>
      <Box sx={styles.boxForm}>
        <IconButton sx={styles.close} onClick={onClose}>
          {icons.close}
        </IconButton>
        <FiltersForm
          seeCollaborators={seeCollaborators}
          status={status}
          getDataTable={getDataTable}
          initVal={initVal}
          setInitVal={setInitVal}
          setFilters={setFilters}
        />
      </Box>
    </ScreenEnabledDrawer>
  )
}
