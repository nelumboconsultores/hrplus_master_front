import { Box, Grid, Paper, Tooltip, Typography } from '@mui/material'
import { AppContext, CapitalIconButton } from 'core'
import { useCatchEllipsis } from 'core/hooks'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { Description, Download } from '@mui/icons-material'

type CardFilesProps = {
  file: { name: string; description: string; url: string; id: number }
}

export const CardFiles: React.FC<CardFilesProps> = ({ file }) => {
  const { open } = useContext(AppContext)
  const { description, name, url } = file
  const { t } = useTranslation()
  const { isOver, ref } = useCatchEllipsis()
  return (
    <Paper
      elevation={3}
      sx={{ padding: { xs: open ? '8px' : '8px 4px', lg: '12px' }, mx: 0.5, my: 1 }}
    >
      <Grid container spacing={1}>
        <Grid item xs={open ? 1 : 1.4} lg={1} sx={styles.gridFather}>
          <Box sx={styles.boxImg}>
            <Description fontSize="large" color="info" />
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
              title={t('general.toolTip.download')}
              component={'a'}
              href={url}
              target="_blank"
              disableRipple
            >
              <Download />
            </CapitalIconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
