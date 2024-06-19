import { Box, Collapse, Icon, ListItemButton, Typography } from '@mui/material'
import { AppContext, LightTooltip, MenuMainItemsType } from 'core'
import { useStyles } from '../useStyles'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Navigable: React.FC<MenuMainItemsType> = ({ url, name, icon }) => {
  const { pathname } = useLocation()
  const isSelect = pathname === url
  const { open } = useContext(AppContext)
  const { itemMenu, textItem, iconStyles, boxColor } = useStyles(open, isSelect)
  const navigation = useNavigate()
  return (
    <ListItemButton
      sx={itemMenu}
      onClick={() => {
        if (url) navigation(url)
      }}
    >
      <Box sx={boxColor} />
      <LightTooltip title={open ? '' : name} placement="right">
        <Icon sx={iconStyles}>{icon as JSX.Element}</Icon>
      </LightTooltip>
      <Collapse orientation="horizontal" in={open}>
        <Typography sx={textItem}>{name}</Typography>
      </Collapse>
    </ListItemButton>
  )
}
