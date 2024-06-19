import { Box, Typography } from '@mui/material'
import { AccordionDetails } from 'core'
import { ProfileDetailContext } from 'modules/contributors/context'
import { useContext } from 'react'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'
import { workPerioType } from 'modules/workingDays/enums/workPerioType'

const Item = ({ title, value }: { title: string; value: string }) => (
  <Box>
    <Typography className={'name'}>{value}</Typography>
    <Typography className={'type'}>{title}</Typography>
  </Box>
)

export const WorkPeriodAccordion: React.FC<{
  onEdit?: (value: { value: number; name: string }) => void
}> = ({ onEdit }) => {
  const { workPeriod } = useContext(ProfileDetailContext)
  const { t } = useTranslation()

  const isCompleted = !!workPeriod

  const handleEdit = () => {
    if (!onEdit) return
    let workPeriodValue = { value: 0, name: '' }
    if (workPeriod) workPeriodValue = { value: workPeriod.id, name: workPeriod.name }
    onEdit(workPeriodValue)
  }

  return (
    <AccordionDetails title={'Jornada'} complete={isCompleted} edit={handleEdit}>
      {isCompleted ? (
        <>
          <Box sx={styles.detailCard}>
            <Box className="containerArrow">
              <Item
                title={workPerioType[workPeriod.workPeriodType.name as keyof typeof workPerioType]}
                value={workPeriod?.name}
              />
            </Box>
          </Box>
        </>
      ) : (
        <Typography>{t('contributors.detail.noInfo')}</Typography>
      )}
    </AccordionDetails>
  )
}
