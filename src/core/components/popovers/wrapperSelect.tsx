import { List, ListItemButton, ListItemText, Popover, PopoverProps } from '@mui/material'
type WrapperBasicProps = {
  list: Array<{ name: string; function: (id?: number | string) => void; id?: number | string }>
} & Omit<PopoverProps, 'open'>

export const WrapperSelect: React.FC<WrapperBasicProps> = (props) => {
  const { list, anchorEl } = props
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Popover
      {...props}
      anchorOrigin={
        props.anchorOrigin ?? {
          vertical: 'bottom',
          horizontal: 'left',
        }
      }
      id={id}
      open={open}
      anchorEl={anchorEl}
    >
      <List>
        {list.map((item, index) => (
          <ListItemButton key={index} onClick={() => item.function(item.id)}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
    </Popover>
  )
}
