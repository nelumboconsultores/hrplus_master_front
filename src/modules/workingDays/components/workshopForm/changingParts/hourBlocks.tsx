import { Box, Divider, IconButton, Typography } from '@mui/material'
import { styles } from '../styles'
import { ConfirmationModal } from '../../../../../core/components/modals'
import { WorkTurnsItemType, WorkTurnsTypeGeneral, icons, labelDays } from 'core'
import { durationList, typesOfShifts } from 'modules/workingDays/enums'
import { Dispatch, SetStateAction, useState } from 'react'

type HourBlocksProps = {
  block: WorkTurnsItemType
  setBody: Dispatch<SetStateAction<WorkTurnsTypeGeneral | undefined>>
}

export const HourBlocks: React.FC<HourBlocksProps> = (props) => {
  const { block, setBody } = props
  const returnDate = (
    durationId: number,
    workTurnTypeId: number,
    dateTo: string,
    dateFrom: string,
  ): string => {
    if (durationId) return durationList[durationId] + ' / ' + typesOfShifts[workTurnTypeId]
    else return dateFrom + ' - ' + dateTo + ' / ' + typesOfShifts[workTurnTypeId]
  }
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const removeItem = (id: string) => {
    setBody((prev) => {
      return prev?.filter((item) => item.id !== id)
    })
    setOpenConfirmation(false)
  }
  const returnLabelDays = (item: Array<number>) => {
    const listDays = item?.map((item) => {
      return labelDays[item]
    })

    return listDays?.join(', ')
  }
  return (
    <Box sx={{ marginBottom: '8px' }}>
      <Box sx={styles.information}>
        <Box>
          <Typography color={'grey'} sx={styles.textDays}>
            {returnLabelDays(block.dayOfWeek)}
          </Typography>
          <Typography variant="grayText" sx={styles.textHours}>
            {returnDate(block.durationId, block.workTurnTypeId, block.dateTo, block.dateFrom)}
          </Typography>
        </Box>
        <IconButton sx={styles.delete} onClick={() => setOpenConfirmation(true)}>
          {icons.delete}
        </IconButton>
      </Box>
      <Divider sx={styles.divider} />
      <ConfirmationModal
        open={openConfirmation}
        onClose={() => setOpenConfirmation(false)}
        title="Eliminar bloque"
        description="Está a punto de eliminar un bloque. ¿Desea continuar?"
        onConfirm={() => removeItem(block?.id ?? '0')}
      />
    </Box>
  )
}
