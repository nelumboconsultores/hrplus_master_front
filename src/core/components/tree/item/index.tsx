import { TreeNode } from 'react-organizational-chart'
import { TreeItemProps } from '../types'
import { Fragment } from 'react'

const ThreeItem = (props: TreeItemProps) => {
  return props?.children?.map((item, index) => {
    const indexList = [...(props?.index ?? []), index]
    if (!item?.id) return <Fragment key={index}></Fragment>
    return (
      <TreeNode
        key={item?.id}
        label={
          props.cardModel
            ? props.cardModel({
                ...item,
                isOpen: !!props?.openNode?.includes(item?.id),
                id: item?.id,
                type: item?.type,
                name: item?.name,
                haveChildren: !!item?.children?.length,
                index: indexList,
              })
            : ''
        }
      >
        {!!item?.children && !!props?.openNode?.includes(item?.id) && (
          <ThreeItem
            openNode={props.openNode}
            readonly={props.readonly}
            index={indexList}
            cardModel={props?.cardModel}
            children={item?.children}
          />
        )}
      </TreeNode>
    )
  })
}

export { ThreeItem }
