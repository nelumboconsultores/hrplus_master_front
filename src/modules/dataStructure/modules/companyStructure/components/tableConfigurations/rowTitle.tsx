import { Typography } from '@mui/material'
import { CHECKS, NAME_MAIN } from '../../utils/orderData'

export type RowsType = {
  value: {
    row: {
      typeItem: string
      label: string
      name: string
    }
  }
}

export const RowTitle: React.FC<RowsType> = ({ value }) => {
  const { row } = value
  if (row.typeItem === NAME_MAIN || row.typeItem === CHECKS)
    return <Typography>{row.label}</Typography>

  return <Typography>{row.name}</Typography>
}
