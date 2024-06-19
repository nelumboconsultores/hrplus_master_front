import { icons } from 'core/utils'
import { Box, Icon } from '@mui/material'

export const SortIcon: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        '& .MuiIcon-root': {
          color: '#fff',
          height: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    >
      <Icon>{icons.arrowUp}</Icon>
      <Icon>{icons.arrowDown}</Icon>
    </Box>
  )
}
