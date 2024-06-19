import { useState } from 'react'
import { MoreHoriz } from '@mui/icons-material'
import { CapitalIconButton, CorePopover } from 'core'
import { MenuItem, MenuList } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const DetailHeaderActions: React.FC = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <CapitalIconButton title={'Acciones'} onClick={handleClick}>
        <MoreHoriz fontSize="large" />
      </CapitalIconButton>
      <CorePopover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList>
          <MenuItem>{t('contributors.detail.holidays')}</MenuItem>
          <MenuItem>{t('contributors.detail.folder')}</MenuItem>
        </MenuList>
      </CorePopover>
    </>
  )
}
