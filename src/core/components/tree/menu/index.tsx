import { Box, List, ListItemButton, Popover, Typography } from '@mui/material'
import { MenuProps } from '../types'
import { useTreeMenuStyles } from './treeMenuStyles'

const Menu = ({ list, selectItem, bounding, ...props }: MenuProps) => {
  const position = {
    right: bounding?.right ? bounding.right + 20 : 0,
    top: (bounding?.top ?? 0) + 50,
  }
  const styles = useTreeMenuStyles()

  return (
    <Popover {...props} sx={styles.container({ position })}>
      <>
        <Box className="container-before" />

        <List>
          {list?.map((item) => (
            <ListItemButton
              key={item.id}
              sx={styles.itemMenu}
              onClick={() => {
                selectItem({ item })
              }}
            >
              <Box sx={styles.items}>
                <Typography>{item.name}</Typography>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </>
    </Popover>
  )
}

export { Menu }
