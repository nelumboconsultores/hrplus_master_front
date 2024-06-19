import { Box, Typography } from '@mui/material'
import { AccordionDetails, DetailsModel, TemplateCardItem } from 'core'
import { ProfileDetailContext } from 'modules/contributors/context'
import { useContext } from 'react'
import { styles } from './styles'
import { useTranslation } from 'react-i18next'

export const WorkPositionAccordion: React.FC<{
  onEdit?: (value: { value: number; name: string }) => void
}> = ({ onEdit }) => {
  const { profile } = useContext(ProfileDetailContext)
  const { t } = useTranslation()

  const isCompleted = !!profile?.workPosition?.code
  const value = profile.workPosition?.id
    ? {
        value: profile?.workPosition?.id,
        name: `${profile?.workPosition?.code} - ${profile?.workPosition?.denomination}`,
      }
    : { value: 0, name: '' }
  return (
    <AccordionDetails
      title={'Informacion de Cargo'}
      complete={isCompleted}
      edit={() => onEdit && onEdit(value)}
    >
      {isCompleted ? (
        <>
          <TemplateCardItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={styles.detailCard}>
              <Box className="containerArrow">
                <Box>
                  <Typography className={'name'}>
                    {`${profile?.workPosition?.code ?? ''} - ${
                      profile?.workPosition?.denomination ?? ''
                    }`}
                  </Typography>
                  <Typography className={'type'}>{t('contributors.title.workPosition')}</Typography>
                </Box>
              </Box>
            </Box>
          </TemplateCardItem>
          <DetailsModel id={Number(profile.workPosition.id)} hiddenHeader />
        </>
      ) : (
        <Typography>{t('contributors.detail.noInfo')}</Typography>
      )}
    </AccordionDetails>
  )
}
