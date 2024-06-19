import { ServicesKeys } from 'core/enum/routerEnum'

export type MenuMainItemsType = {
  url?: string
  name: string
  icon?: JSX.Element | { img: JSX.Element; color: string }
  list?: MenuMainItemsType[]
  permissions?: ServicesKeys[]
}
