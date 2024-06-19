import { Box, Grid, Typography } from '@mui/material'
import { MenuCard, icons } from 'core'
import Spinner from 'core/components/spinner'
import { ServicesKeys } from 'core/enum/routerEnum'
import { usePermissions } from 'core/hooks'
import { getOrganizationMacroStructure } from 'core/services/companyMacroStructure'
import {
  NamesEnum,
  NamesLocalStorage,
  StatusEnum,
} from 'modules/dataStructure/modules/companyStructure/enums'
import { MenuList } from 'modules/dataStructure/modules/companyStructure/types'
import { NavLinksEnum } from 'modules/manageOrganization/enum'
import { Permission } from 'modules/manageOrganization/modules/structure/enums/permission'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
export const CompanyStructureMenu = () => {
  const [ListMenu, setListMenu] = useState<MenuList>()
  const { canSeePage } = usePermissions()

  const { t } = useTranslation()
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrganizationMacroStructure()
      const withId = (id: number) => ([1, 2].includes(id) ? `/${id}` : '')
      if (response.data?.data.length === 0) return
      const sortedData = response?.data?.data.sort((a, b) => a.id - b.id)
      const newList = sortedData?.map((item) => ({
        id: item.id,
        url: NavLinksEnum[item.key as keyof typeof NavLinksEnum] + withId(item.id),
        status: item.status,
        name: NamesEnum[item.key],
        key: item.key,
        permission: Permission[item.key],
        disabled: validationAvailable(item.status, item.populateStatus) ? false : true,
        icon:
          item.populateStatus === StatusEnum.Done
            ? { img: icons.checkCircleOutline, color: '#31C462' }
            : { img: icons.accessTime, color: '#828282' },
        click: () => localStorage.removeItem(NamesLocalStorage[item.key]),
      }))

      setListMenu(newList)
    }

    fetchData()
  }, [])
  const validationAvailable = (status: string, populateStatus: string) => {
    if (
      status === StatusEnum.Done &&
      (populateStatus === StatusEnum.Available || populateStatus === StatusEnum.Done)
    )
      return true
    return false
  }
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
      <Typography sx={{ textAlign: 'center', my: '28px', fontWeight: 600, fontSize: '1rem' }}>
        {t('creationRecords.selectTheEntity')}
      </Typography>
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
