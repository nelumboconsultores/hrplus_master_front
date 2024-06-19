import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { FontName, GeneralTitle } from 'core'
import { styles } from './visualizeCatalogStyles'
import { DataCatalog } from 'modules/catalogMotifs/types'
import { useTranslation } from 'react-i18next'
import { CatalogType } from 'core/enum/catalogTypes'

type TemplateNewCatalog = {
  dataCatalog: DataCatalog
  type: number
  onEdit: (dataCatalog: DataCatalog) => void
}

export const VisualizeCatalog: React.FC<TemplateNewCatalog> = ({ dataCatalog, type, onEdit }) => {
  const { t } = useTranslation()

  const handleButtonClick = () => {
    onEdit(dataCatalog)
  }

  return (
    <Box>
      <Box>
        <GeneralTitle sx={styles.container}>
          {type === CatalogType.Catalog ? t('catalogMotifs.detail') : t('catalogMotifs.detailList')}
        </GeneralTitle>
        <Box>
          <Typography lineHeight={1.3} sx={styles.text}>
            {type === CatalogType.Catalog
              ? t('catalogMotifs.nameCatalog')
              : t('catalogMotifs.nameList')}
          </Typography>
          <Typography lineHeight={1.3} sx={styles.subtext}>
            {dataCatalog.name}
          </Typography>
        </Box>

        <Box>
          <Typography lineHeight={1.3} sx={styles.text}>
            {t('catalogMotifs.relations')}
          </Typography>

          <Typography lineHeight={1.3} sx={styles.subtext}>
            {dataCatalog.relationship.length > 0
              ? dataCatalog.relationship[0]
              : 'No tiene relaciones'}
          </Typography>
        </Box>
      </Box>

      <Box sx={styles.container}>
        <Typography lineHeight={1.3} sx={styles.textValue}>
          {t('catalogMotifs.catalogValueMin')}
        </Typography>

        <Box sx={styles.heightChip}>
          <List
            sx={{
              '.css-10hburv-MuiTypography-root': {
                fontFamily: FontName.RobotoRegular,
                fontSize: ' 0.875rem',
              },
              paddingTop: '0px',
            }}
          >
            {dataCatalog.subcategories.map((field, index) => (
              <div key={index}>
                <ListItem>
                  <Typography variant="h6" lineHeight={1.2} sx={{ marginRight: '8px' }}>
                    <span style={{ color: '#24a9e2' }}>•</span>
                  </Typography>
                  <ListItemText primary={field} />
                </ListItem>
                {index !== dataCatalog?.subcategories.length - 1 && <Divider />}{' '}
              </div>
            ))}
          </List>
        </Box>
      </Box>

      <Tooltip
        title={dataCatalog?.subcategories.length < 1 ? t('catalogMotifs.catalogLenght') : ''}
      >
        <Box sx={styles.btnAling}>
          <Button type="submit" color="secondary" sx={styles.btn} onClick={handleButtonClick}>
            Editar
          </Button>
        </Box>
      </Tooltip>
    </Box>
  )
}
