import { Box, /* Icon, */ Typography } from '@mui/material'
// import { icons } from 'core'
import { TreeItem } from 'core/components/tree/types'
import { useDetailNestedCard } from './detailNestedCardStyles'
// import { IconValue } from 'mmodules/userStructure/modules/dataStructure/modules/structure/components'

const DetailNestedDetail = (props: TreeItem) => {
  const styles = useDetailNestedCard()
  return (
    <Box className="card-item-tree-styles">
      <Box sx={styles.container}>
        <Box sx={styles.containerInformation}>
          <Typography sx={styles.name}>{props.customeValues?.title}</Typography>

          <Typography sx={styles.description}>{props.customeValues?.description}</Typography>
        </Box>

        {/*   <Box sx={styles.containerIcons}>
          <IconValue>
            <Icon>{icons.peopleAlt}</Icon>

            <Typography className="secondary">{props.customeValues?.staff}</Typography>
          </IconValue>

          <IconValue>
            <Icon>{icons.home}</Icon>

            <Typography className="primary">{props.customeValues?.stores}</Typography>
          </IconValue>
        </Box> */}
      </Box>
    </Box>
  )
}

export { DetailNestedDetail }
