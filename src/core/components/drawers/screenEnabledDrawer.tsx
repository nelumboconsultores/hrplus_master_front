import { Drawer, DrawerProps } from '@mui/material'

type WrapperDrawerProps = { children: React.ReactElement } & DrawerProps

export const ScreenEnabledDrawer: React.FC<WrapperDrawerProps> = ({ children, ...props }) => {
  return (
    <Drawer {...props} variant="persistent">
      {children}
    </Drawer>
  )
}
