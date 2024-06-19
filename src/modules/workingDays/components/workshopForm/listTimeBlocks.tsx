import { TemplatePaper, WorkTurnsTypeGeneral } from 'core'
import { InitialView } from './changingParts/initialView'
import { Box } from '@mui/material'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { HourBlocks } from './changingParts/hourBlocks'

type ListTimeBlocksProps = {
  list: WorkTurnsTypeGeneral | undefined
  setBody: Dispatch<SetStateAction<WorkTurnsTypeGeneral | undefined>>
}
type HourRange = { start: string; end: string; days: number[] }
export const ListTimeBlocks: React.FC<ListTimeBlocksProps> = (props) => {
  // const { t } = useTranslation()
  //  const [message, setMessage] = useState<string>('')
  const { list, setBody } = props

  useEffect(
    () => {
      const ranges: HourRange[] =
        list?.map((item) => {
          const { dateFrom, dateTo } = item
          return { start: dateFrom, end: dateTo, days: item.dayOfWeek }
        }) ?? []

      for (let i = 0; i < ranges.length; i++) {
        //  const sameDays = ranges[i].days.filter((item)=>)
      }
      /*   for (let i = 0; i < ranges?.length - 1; i++) {
        const currentRange = ranges[i]
        const currentStart = dayjs(currentRange.start, 'HH:mm')
        const currentEnd = dayjs(currentRange.end, 'HH:mm')

       

        for (let j = i + 1; j < ranges.length; j++) {
          const nextRange = ranges[j]
          const nextStart = dayjs(nextRange.start, 'HH:mm')
          const nextEnd = dayjs(nextRange.end, 'HH:mm')
          if (
            (currentEnd.isAfter(nextStart) && currentStart.isBefore(nextStart)) ||
            (currentStart.isBefore(nextEnd) && currentEnd.isAfter(nextEnd))
          ) {
            setMessage(t('workingDays.error.repeated'))
            return
          }
        }
      }
 */
      // No hay choque entre los rangos
      //  setMessage('')
    },
    [list?.length], // eslint-disable-line
  )

  return (
    <TemplatePaper>
      {(!list || list.length === 0) && <InitialView />}
      {list && list?.length > 0 && (
        <Box sx={{ height: '60vh', overflow: 'auto' }}>
          {list?.map((item, index) => {
            return <HourBlocks block={item} setBody={setBody} key={index} />
          })}
        </Box>
      )}
      {/*  <ErrorMessage message={'message'} /> */}
    </TemplatePaper>
  )
}
