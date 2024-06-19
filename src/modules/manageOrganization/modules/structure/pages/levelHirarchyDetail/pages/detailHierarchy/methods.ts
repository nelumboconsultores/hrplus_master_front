import { TreeItem } from 'core/components/tree/types'
import { NestedEntity } from 'core/services'

const transformResponseToTreeItem = ({ response }: { response: NestedEntity[] }): TreeItem[] => {
  return (
    response?.map((item) => ({
      id: item.id?.toString() ?? '',
      type: item?.id?.toString() ?? '',
      name: item.name ?? '',
      customeValues: {
        title: item?.name ?? '',
        description: item.orgEntity?.name ?? '',
        staff: 587,
        stores: 18,
      },
      children: item.childs ? transformResponseToTreeItem({ response: item.childs ?? [] }) : [],
    })) || []
  )
}

export { transformResponseToTreeItem }
