import { Box, Grid, Paper, Tooltip, Typography } from '@mui/material'
import { AppContext, CapitalIconButton, icons } from 'core'
import { useCatchEllipsis } from 'core/hooks'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { EventConfigurationContext } from '../../context'
import { styles } from './styles'
import { Description } from '@mui/icons-material'

type CardFilesProps = {
  description?: string
  url: string
  name: string
  deleteFile: (url: string, id: number) => void
  id: number
}

export const CardFiles: React.FC<CardFilesProps> = ({ description, name, id, url, deleteFile }) => {
  const { open } = useContext(AppContext)
  const { id: idParams } = useParams()
  const {
    eventCongReducer: { idEvent },
  } = useContext(EventConfigurationContext)
  const { t } = useTranslation()
  const { isOver, ref } = useCatchEllipsis()
  return (
    <Paper sx={{ padding: { xs: open ? '8px' : '8px 4px', lg: '12px' } }}>
      <Grid container>
        <Grid item xs={open ? 1 : 1.4} lg={1} sx={styles.gridFather}>
          <Box sx={styles.boxImg}>
            <Description sx={{ fontSize: '2.3rem' }} color="info" />
          </Box>
        </Grid>
        <Grid item xs={open ? 9.5 : 9.1} lg={10}>
          <Box sx={styles.boxTexts}>
            <Typography sx={styles.description}>{description}</Typography>
            <Tooltip title={isOver ? name : ''} placement="top">
              <Typography
                ref={ref}
                variant="grayText"
                sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem' }}
              >
                {name}
              </Typography>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={1.5} lg={1}>
          <Box sx={styles.deleteCart}>
            <CapitalIconButton
              disabled={!!(idEvent && !idParams)}
              title={t('general.toolTip.delete')}
              onClick={() => deleteFile(url, id)}
            >
              {icons.close}
            </CapitalIconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
