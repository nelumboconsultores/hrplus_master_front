import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { BaseModal, PathName, PercentageCard, icons } from 'core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getModels } from '../../services/model.services'
import { NamesEnum, NavLinksEnum } from '../../enum'
import { styles } from './styles'
import { t } from 'i18next'
type MenuList = {
  id: number
  name: string
  isComplete?: boolean
  isMultiple?: boolean
  keyword?: string
  weight?: number
  position?: number
}[]
const EmployeeMenu = () => {
  const navigate = useNavigate()
  const [listMenu, setListMenu] = useState<MenuList>()
  const [open, setOpen] = useState(false)
  const handleUpdate = () => {
    setOpen(false)
  }

  const isMobile = useMediaQuery('(max-width:1535.5px)')

  const getChunkSize = () => {
    return isMobile ? 2 : 3
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getModels()
      if (response && response.data && Array.isArray(response.data.data)) {
        const newList = response.data.data.map((item) => ({
          id: item.id,
          keyword: item.keyword,
          name: NamesEnum[item.keyword],
          weight: item.weight,
          position: item.position,
          url: `${NavLinksEnum[item.name as keyof typeof NavLinksEnum]}/${item.id}`,
          icon: item.isComplete
            ? { img: icons.checkCircleOutline, color: '#31C462' }
            : { img: icons.accessTime, color: '#828282' },
        }))

        setListMenu(newList as MenuList)

        const allWeightsZero = newList.every((item) => item.weight === 0)
        setOpen(allWeightsZero)
      }
    }

    fetchData()
  }, [])

  const chunkArrayVertically = (arr: MenuList, chunkSize: number) => {
    const result = []
    for (let i = 0; i < chunkSize; i++) {
      const chunk = []
      for (let j = i; j < arr.length; j += chunkSize) {
        chunk.push(arr[j])
      }
      result.push(chunk)
    }
    return result
  }
  return (
    <Box>
      <Box sx={styles.container}>
        <Typography
          component="span"
          sx={styles.typography}
          onClick={() => {
            navigate(PathName.employeeStructureWeighting)
          }}
        >
          Ponderar Secciones
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={11}>
          {listMenu &&
            listMenu.length &&
            chunkArrayVertically(listMenu, Math.ceil(listMenu?.length / getChunkSize())).map(
              (item, index) => (
                <Grid container item spacing={2} key={index}>
                  {item.map((items) => (
                    <Grid item md={6} lg={6} xl={4} key={items.id} paddingBottom={'20px'}>
                      <PercentageCard
                        item={items}
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
                  ))}
                </Grid>
              ),
            )}
        </Grid>
      </Grid>
      <BaseModal
        open={open}
        onClose={() => {
          handleUpdate()
        }}
        width={500}
      >
        <Box sx={styles.paddingModal}>
          <Typography sx={styles.titleModal}>{t('employee.modal.title')}</Typography>
          <Typography sx={styles.subtitleModal}>{t('employee.modal.subtitle')}</Typography>
          <Box sx={{ paddingTop: '16px' }}>
            <Button
              variant={'contained'}
              color={'secondary'}
              sx={{ marginBottom: '8px' }}
              onClick={() => {
                navigate(PathName.employeeStructureWeighting)
              }}
            >
              {t('employee.modal.confi')}
            </Button>
          </Box>
          <Box sx={{ paddingTop: '20px' }}>
            <Button
              variant={'text'}
              color="primary"
              sx={{ textTransform: 'none' }}
              onClick={handleUpdate}
            >
              {t('employee.modal.later')}
            </Button>
          </Box>
        </Box>
      </BaseModal>
    </Box>
  )
}
export default EmployeeMenu
