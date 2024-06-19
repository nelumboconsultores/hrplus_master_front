import { Box } from '@mui/material'
import { OpenWithUpdate } from 'core'
import { DetailCard } from '../../detailCard'
import { CardArrows } from 'modules/manageOrganization/types'

type ArrowBoxProps = {
  title: string
  arrayGenInfo: CardArrows[]
}

export const ArrowBox: React.FC<ArrowBoxProps> = ({ arrayGenInfo, title }) => {
  return (
    <OpenWithUpdate title={title} hiddenIcon>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {arrayGenInfo.map((str) => (
          <DetailCard key={str.id} structures={str} hideShadow />
        ))}
      </Box>
    </OpenWithUpdate>
  )
}
