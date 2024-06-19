import { Paper, PaperProps } from '@mui/material'
import { styles } from './styles'
type TemplateCardItemProps = { children?: React.ReactNode; hideShadow?: boolean } & PaperProps

export const TemplateCardItem: React.FC<TemplateCardItemProps> = (props) => {
  const { children, hideShadow } = props
  return (
    <Paper
      elevation={hideShadow ? 0 : 2}
      sx={{
        ...styles.CardItem,
        padding: hideShadow ? '32px 0px' : '32px 32px',
        ...(props.sx as object),
      }}
    >
      {children}
    </Paper>
  )
}
