import { IconButton } from '@mui/material'
import { icons } from 'core'
import { styles } from './styles'

export const SuperiorOptions = ({
  setAnchorEl,
}: {
  setAnchorEl: (e: HTMLButtonElement | null) => void
}) => {
  return (
    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={styles.icon}>
      {icons.more}
    </IconButton>
  )
}
