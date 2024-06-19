import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { CapitalIconButton, FontName } from 'core'
import { styles } from './styles'
import { useContext, useMemo } from 'react'
import { EventsAndCalendarContext } from 'modules/eventAndCalendar/context'
import { getByCalendarType } from 'modules/eventAndCalendar/utils/dateSelectorUtils'

type DateSelectorProps = {
  onBackward: () => void
  onForward: () => void
  date?: string
}
export const DateSelector: React.FC<DateSelectorProps> = (props) => {
  const { currentDateSelector, calendarMode } = useContext(EventsAndCalendarContext)

  const formatedDate = useMemo(
    () => getByCalendarType(calendarMode, currentDateSelector),
    [currentDateSelector, calendarMode],
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.dateSelector}>
        <CapitalIconButton sx={styles.buttons} title="Anterior" onClick={props.onBackward}>
          <ArrowBack fontSize="small" />
        </CapitalIconButton>
        <Typography fontFamily={FontName.RobotoBold} color="white">
          {props.date ?? formatedDate}
        </Typography>
        <CapitalIconButton sx={styles.buttons} title="Siguiente" onClick={props.onForward}>
          <ArrowForward fontSize="small" />
        </CapitalIconButton>
      </Box>
    </Box>
  )
}
