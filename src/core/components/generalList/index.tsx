import { Box } from '@mui/material'
import { BreadCrumbsList, TableBase } from '..'
import { HeaderList } from './headerList'
import { HeaderListProps, TableBaseProps } from 'core'
import { FilterZone } from './filterZone'
import Spinner from '../spinner'

type GeneralListProps = {
  tableProps: TableBaseProps
  filters?: React.ReactElement
  routeBreadCrumbs?: boolean
  secondView?: { show: boolean; component: React.ReactElement }
} & HeaderListProps

export const GeneralList: React.FC<GeneralListProps> = ({
  children,
  filters,
  tableProps,
  routeBreadCrumbs = true,
  secondView,
  ...rest
}) => {
  return (
    <Box>
      {routeBreadCrumbs && <BreadCrumbsList />}
      <HeaderList {...rest}>{children ?? <></>}</HeaderList>
      {secondView?.show && secondView?.component}
      {filters && !secondView?.show && <FilterZone>{filters}</FilterZone>}

      <RenderView tableProps={tableProps} secondView={secondView} />
    </Box>
  )
}

type RenderViewProps = {
  secondView?: { show: boolean; component: React.ReactElement }
  tableProps: TableBaseProps
}
function RenderView({ tableProps, secondView }: RenderViewProps) {
  const hasData = tableProps?.rows?.length > 0
  const hasSecondView = secondView?.show

  if (!hasData && !tableProps.rows && !hasSecondView) {
    return <Spinner />
  }

  if (hasData && !hasSecondView) {
    return <TableBase {...tableProps} pagination paginationMode="server" />
  }
}
