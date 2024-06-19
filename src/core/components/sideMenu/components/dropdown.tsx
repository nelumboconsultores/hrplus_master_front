import { Box, Collapse, Icon, List, ListItemButton, Typography } from '@mui/material'
import { AppContext, LightTooltip, MenuMainItemsType, icons } from 'core'
import { useContext, useEffect, useState } from 'react'
import { useStyles } from '../useStyles'
import { useNavigate } from 'react-router-dom'

export const DropDown: React.FC<MenuMainItemsType> = ({ name, icon, list }) => {
  const { open, setOpen } = useContext(AppContext)
  const navigation = useNavigate()
  const { textItem, boxInner } = useStyles(open)
  const [expand, setExpand] = useState(false)
  const handleClick = () => {
    if (!open) {
      setOpen(true)
      setExpand(true)
    } else setExpand(!expand)
  }
  useEffect(() => {
    if (!open) setExpand(false)
  }, [open])
  return (
    <Box>
      <ListItemButton onClick={handleClick} sx={boxInner}>
        <LightTooltip title={open ? '' : name} placement="right">
          <Icon sx={{ transform: 'translateX(1%)' }}>{icon as JSX.Element}</Icon>
        </LightTooltip>
        <Collapse orientation="horizontal" in={open}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={textItem}>{name}</Typography>
            {expand ? icons.arrowUp : icons.arrowDown}
          </Box>
        </Collapse>
      </ListItemButton>
      <Collapse in={expand} timeout={300}>
        {list?.map((item, index) => (
          <List disablePadding key={index}>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                if (item.url) navigation(item.url)
              }}
            >
              <Icon sx={{ transform: 'translateX(1%)' }}>{icons.hr}</Icon>
              <Typography sx={textItem}>{item.name}</Typography>
            </ListItemButton>
          </List>
        ))}
      </Collapse>
    </Box>
  )
}
