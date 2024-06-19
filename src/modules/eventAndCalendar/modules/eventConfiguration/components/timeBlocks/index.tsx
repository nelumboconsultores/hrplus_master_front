import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { periodicityEnum } from '../../enums'
import { EventSchedule } from './eventSchedule'
import { DaysWeek } from './daysWeek'

export const TimeBlocks: React.FC = () => {
  const { watch } = useFormContext()
  return (
    <Box>
      {watch('periodicity') === periodicityEnum.single && <EventSchedule />}
      {watch('periodicity') === periodicityEnum.repetitive && <DaysWeek />}
    </Box>
  )
}
