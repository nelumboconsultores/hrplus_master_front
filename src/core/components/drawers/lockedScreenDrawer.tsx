import { Drawer, DrawerProps } from '@mui/material'
type WrapperDrawerProps = { children: React.ReactElement } & DrawerProps

export const LockedScreenDrawer: React.FC<WrapperDrawerProps> = ({ children, ...props }) => {
  return <Drawer {...props}>{children}</Drawer>
}
