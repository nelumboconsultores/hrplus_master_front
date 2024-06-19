import { Box, IconButton, Tooltip } from '@mui/material'
import { icons } from 'core'
import { useNavigate, useParams } from 'react-router-dom'
import { returnPathTree } from 'modules/manageOrganization/utils'
import { t } from 'i18next'

export const DefineStructButton = () => {
  const { id } = useParams()
  const navigation = useNavigate()
  const handleClick = () => {
    navigation(returnPathTree(id ?? '1') + `/${id}`)
  }
  return (
    <Box>
      {id === '1' && (
        <Tooltip title={t('creationRecords.seeOrganizational')}>
          <IconButton sx={{ color: 'primary.main' }} onClick={handleClick}>
            {icons.accountTreeOutlined}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}
