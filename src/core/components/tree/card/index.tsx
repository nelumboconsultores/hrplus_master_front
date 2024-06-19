import { Box, IconButton, Typography } from '@mui/material'
import { CardDetail, icons } from 'core'
import { useTreeCardStyles } from './treeCardStyles'
import { CardProps } from '../types'
import { useTranslation } from 'react-i18next'

const Card = (props: CardProps) => {
  const styles = useTreeCardStyles()
  const { t } = useTranslation()

  return (
    <Box
      sx={[
        styles.itemContainer(),
        styles.container({
          haveChildren: !!props.haveChildren,
          showBottomButton: props.showAddBottom && !!props.isOpen,
          lastLine: !props.isOpen || !!props.showLastLine,
          readonly: props.readonly,
        }),
      ]}
    >
      <CardDetail key={props.id} {...props.paperProps}>
        {props?.cardModel ? (
          props.cardModel(props)
        ) : (
          <Box className="card-item-tree-styles">
            <Box sx={styles.iconContainer}>
              {!!props.showAddHeaderIcon && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    if (props.add) {
                      props.add({ id: props?.id, index: props.index })
                    }
                  }}
                  color="primary"
                  children={icons.add}
                />
              )}

              {!!props.canDelete && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation()
                    if (props.delete) {
                      props.delete({ id: props.id, index: props.index })
                    }
                  }}
                  color="error"
                  children={icons.delete}
                />
              )}
            </Box>

            <Typography sx={styles.name}>
              {!props?.name
                ? t(
                    props.haveFather
                      ? 'operatingLevel.message.selectLevelMain'
                      : 'operatingLevel.message.selectLevel',
                  )
                : props?.name}
            </Typography>

            {!!props.showAddBottom && !!props.isOpen && (
              <IconButton
                sx={styles.addBottom}
                onClick={(e) => {
                  e.stopPropagation()
                  if (props.add) {
                    props.add({ id: props?.id, index: props.index })
                  }
                }}
                color="primary"
                children={icons.add}
              />
            )}
          </Box>
        )}
      </CardDetail>

      {!props.showLastLine && !!props.type && (
        <IconButton {...props.dropDownProps} sx={styles.dropDown({ isOpen: !!props.isOpen })}>
          {icons.arrowDown}
        </IconButton>
      )}
    </Box>
  )
}

export { Card }
