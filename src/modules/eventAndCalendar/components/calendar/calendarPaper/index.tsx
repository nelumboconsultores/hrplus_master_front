import { Paper } from '@mui/material'

export const CalendarPaper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        boxSizing: 'border-box',
        padding: 4,
        position: 'relative',
      }}
    >
      {children}
    </Paper>
  )
}
