import { IconButtonProps, PaperProps, PopoverProps } from '@mui/material'

type TreeItemOptions = {
  id: string
  name: string
  type: string
}

type TreeItem = {
  id?: string
  type?: string
  name?: string
  addDelete?: boolean
  cannotAdd?: boolean
  children?: TreeItem[]
  customeValues?: CustomeValues
}

type TreeProps = {
  cardModel?: (payload: Omit<CardProps, 'cardModel'>) => JSX.Element
  delete?: DeleteItem
  add?: AddItem
  selectItem?: MenuSelectItem
  allOptionsWereUsed?: (value: boolean) => void
  nodesWereRemoved?: (payload: {
    item: TreeItem
    actionCompleted: (payload: { value: boolean }) => void
  }) => void
  readonly: boolean
  typeSelectedDefault?: string[]
  options?: TreeItemOptions[]
  children?: TreeItem[]
  type?: string
} & TreeItem

type TreeItemProps = {
  openNode: string[]
  children: TreeProps['children']
  readonly: boolean
  cardModel: TreeProps['cardModel']
  index?: number[]
  defaultShow?: boolean
}

type CardModelPayload = {
  id?: string
  type?: string
  name?: string
  haveChildren?: boolean
  cannotAdd?: boolean
  options?: TreeItemOptions[]
  index?: number[]
  customeValues?: CustomeValues
}

type CardProps = CardModelPayload & {
  delete?: DeleteItem
  add?: AddItem
  cardModel?: (payload: CardProps) => JSX.Element
  isOpen?: boolean
  readonly?: boolean
  canDelete?: boolean
  haveChildren?: boolean
  showAddBottom?: boolean
  showAddHeaderIcon?: boolean
  showLastLine?: boolean
  paperProps?: PaperProps
  dropDownProps?: IconButtonProps
  haveFather?: boolean
}

type CustomeValues = Record<string, string | number>
type MenuSelectItem = (payload: { item: TreeItemOptions }) => void

type MenuProps = {
  list: TreeItemOptions[]
  selectItem: MenuSelectItem
  bounding?: DOMRect
} & PopoverProps

type DeleteItem = (payload: { id?: string; index?: number[] }) => void
type AddItem = (payload: { id?: string; index?: number[] }) => void

type TreePropsRef = { getData: () => TreeItem }

type OptionMenuType = {
  id?: string
  type?: string
  name?: string
}

export type {
  TreeProps,
  TreeItem,
  CardModelPayload,
  DeleteItem,
  CardProps,
  TreeItemProps,
  TreeItemOptions,
  MenuProps,
  MenuSelectItem,
  AddItem,
  TreePropsRef,
  OptionMenuType,
}
