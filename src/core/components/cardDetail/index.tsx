import { Paper, PaperProps } from '@mui/material'

export const CardDetail: React.FC<PaperProps> = (props) => {
  return (
    <Paper
      elevation={props?.elevation ?? 3}
      sx={{ padding: '20px 28px', borderRadius: '8px' }}
      className="cardPaper"
      {...(props ?? {})}
    />
  )
}
