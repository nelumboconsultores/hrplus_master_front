import { Box, Grid, Typography } from '@mui/material'
import { AppContext, MenuMainItemsType, MenuCard } from 'core'
import { usePermissions } from 'core/hooks'
import { ListMenu } from 'modules/home/enum'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

type Menu = MenuMainItemsType & { icon: { img: JSX.Element; color: string } }
export const Desktop = () => {
  const { open } = useContext(AppContext)
  const { t } = useTranslation()
  const { getMenuItems } = usePermissions()

  return (
    <Box>
      <Typography variant="h1" sx={{ marginBottom: '36px' }}>
        {t('home.generalSettings')}
      </Typography>
      <Grid container spacing={2}>
        {getMenuItems(ListMenu).map((item, index) => {
          if (item.icon)
            return (
              <Grid item xs={open ? 6 : 4} lg={4} key={index}>
                <MenuCard item={item as Menu} />
              </Grid>
            )
        })}
      </Grid>
    </Box>
  )
}
