import { Box, Grid, Typography } from '@mui/material'
import { icons, MenuCard, PathName } from 'core'
import Spinner from 'core/components/spinner'
import { ServicesKeys } from 'core/enum/routerEnum'
import { usePermissions } from 'core/hooks'
import { getOrganizationMacroStructure } from 'core/services/companyMacroStructure'
import {
  NamesEnum,
  NavLinksEnum,
  Permission,
  StatusEnum,
} from 'modules/dataStructure/modules/companyStructure/enums'
import { MenuList } from 'modules/dataStructure/modules/companyStructure/types'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
const CompanyStructureMenu = () => {
  const [ListMenu, setListMenu] = useState<MenuList>()
  const { canSeePage } = usePermissions()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrganizationMacroStructure()
      if (response.data?.data.length === 0) return
      const sortedData = response?.data?.data.sort((a, b) => a.id - b.id)
      const newList = sortedData?.map((item) => ({
        id: item.id,
        url: `${NavLinksEnum[item.key]}/${item.id}`,
        status: item.status,
        name: NamesEnum[item.key],
        key: item.key,
        permission: Permission[item.key],
        disabled: item.status === StatusEnum.Unavailable ? true : false,
        icon:
          item.status === StatusEnum.Done
            ? { img: icons.checkCircleOutline, color: '#31C462' }
            : { img: icons.accessTime, color: '#828282' },
      }))

      setListMenu(newList)
    }

    fetchData()
  }, [])

  const returnHalfOfTheList = () => {
    if (ListMenu) {
      const half = Math.ceil(ListMenu.length / 2)
      const firstHalf = ListMenu.slice(0, half)
      const secondHalf = ListMenu.slice(half, ListMenu.length)
      return [firstHalf, secondHalf]
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '28px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            '&:hover': {
              color: 'primary.600',
              cursor: 'pointer',
            },
          }}
          onClick={() => navigate(PathName.dataStructureRelationshipConfiguration)}
        >
          {t('companyStructure.links.configRelationships')}
        </Typography>
      </Box>

      {ListMenu && ListMenu?.length > 0 ? (
        <>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <Grid container spacing={2} justifyContent={'center'} sx={{ maxWidth: '900px' }}>
              {returnHalfOfTheList()?.map((itemF, index) => (
                <Grid item xs={6} container spacing={2} key={index}>
                  {itemF.map((item) => {
                    if (canSeePage([item.permission as ServicesKeys])) {
                      return (
                        <Grid item xs={12} key={item.id}>
                          <MenuCard
                            item={item}
                            sx={{
                              ':hover': {
                                '& svg': { color: '#fff' },
                                '& p': { color: '#fff' },
                                cursor: 'pointer',
                                backgroundColor: '#24a9e2',
                              },
                            }}
                          />
                        </Grid>
                      )
                    } else {
                      return null
                    }
                  })}
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          <Spinner />
        </Box>
      )}
    </Box>
  )
}
export default CompanyStructureMenu
