import { Box, Button, Typography } from '@mui/material'
import { BreadCrumbsList, PathName } from 'core'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TableContext } from '../../context'

export const ConfigurationHeader = () => {
  const { t } = useTranslation()
  const linksBReadCrumbs = [PathName.DataStructure, PathName.dataStructureRelationshipConfiguration]
  const { onSubmit, disabled } = useContext(TableContext)
  return (
    <Box>
      <BreadCrumbsList list={linksBReadCrumbs} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        <Box>
          <Typography variant="h1">
            {t('companyStructure.title.configRelationshipsBetweenStructures')}
          </Typography>
          <Typography variant="grayText">
            {t('companyStructure.title.configRelationshipsBetweenStructures')}
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={onSubmit} disabled={disabled}>
            {t('companyStructure.button.save')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
