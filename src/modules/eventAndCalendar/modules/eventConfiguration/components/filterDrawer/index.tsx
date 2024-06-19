import { Box, IconButton } from '@mui/material'
import { DynamicFormValues, ScreenEnabledDrawer, icons } from 'core'
import { styles } from './styles'
import { FiltersForm } from '../filtersForm'

type FilterDrawerProps = {
  open: boolean
  onClose: () => void
  getDataTable: () => void
  initVal: DynamicFormValues
  setInitVal: React.Dispatch<React.SetStateAction<DynamicFormValues>>
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  open,
  onClose,
  getDataTable,
  initVal,
  setInitVal,
}) => {
  return (
    <ScreenEnabledDrawer open={open} anchor="right" sx={styles.container}>
      <Box sx={styles.boxForm}>
        <IconButton sx={styles.close} onClick={onClose}>
          {icons.close}
        </IconButton>
        <FiltersForm getDataTable={getDataTable} initVal={initVal} setInitVal={setInitVal} />
      </Box>
    </ScreenEnabledDrawer>
  )
}
