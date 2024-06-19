import { PathName } from 'core'
import { ServicesKeys } from 'core/enum/routerEnum'

export type SideBarItem = {
  icon: JSX.Element
  name: string
  url: PathName
  permissions?: ServicesKeys[]
}

export type MenuItems = Record<string, SideBarItem>
