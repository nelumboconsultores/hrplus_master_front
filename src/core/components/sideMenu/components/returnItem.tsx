import { MenuMainItemsType } from 'core'
import { DropDown, Navigable } from '.'

export const ReturnItem: React.FC<MenuMainItemsType> = (props) => {
  if (props.url) return <Navigable {...props} />
  if (props.list) return <DropDown {...props} />
  return <></>
}
