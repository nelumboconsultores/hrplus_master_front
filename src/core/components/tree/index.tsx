import { Tree as ExternalThree } from 'react-organizational-chart'
import {
  AddItem,
  CardModelPayload,
  DeleteItem,
  MenuSelectItem,
  TreeItem,
  TreeItemOptions,
  TreeProps,
  TreePropsRef,
} from './types'
import { ThreeItem } from './item'
import { Card } from './card'
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import { Box } from '@mui/material'
import { Menu } from './menu'
import {
  addNewNode,
  modifyCardValue,
  getListStringOfTypes,
  removeItem,
  removeEmptyNodes,
  updateFatherValue,
  temporalValueWhileAnItemIsSelected,
} from './methods'
import { ModalStart } from '..'
import { useTranslation } from 'react-i18next'
import { useTreeStyles } from './treeStyles'

const Tree = forwardRef((props: TreeProps, ref: React.Ref<TreePropsRef>) => {
  const styles = useTreeStyles()
  const { t } = useTranslation()
  const [modal, setModal] = React.useState<{
    title?: string
    description?: string
    onClick?: () => void
    open: boolean
  }>({ open: false })
  const [showChildren, setShowChildren] = React.useState(true)
  const [openNode, setOpenNode] = React.useState<string[]>(props?.typeSelectedDefault ?? [])
  const [anchorEl, setAnchorEl] = React.useState<{
    anchror: Element | null
    options?: TreeItemOptions[]
    index: number[] | null
    id?: string | number
    type?: string
  }>({ anchror: null, index: null })
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(
    props?.typeSelectedDefault ?? [],
  )
  const [father, setFather] = React.useState(props)
  const [childrens, setChildrens] = React.useState(father.children)
  const thereAreSomeOption = useMemo(
    () => selectedTypes?.length < (props.options?.length ?? 0),
    [selectedTypes, props.options],
  )

  const displayOptionMenu = ({
    e,
    payload,
    isFather,
  }: {
    payload?: CardModelPayload
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
    isFather?: boolean
  }) => {
    e.stopPropagation()
    const isChildren = !!isFather && (!childrens?.length || !payload?.type)
    if (thereAreSomeOption && (!isFather || isChildren)) {
      setAnchorEl({
        anchror: e.currentTarget,
        options: props?.options?.filter((item) => !selectedTypes.includes(item.type)),
        index: payload?.index ?? null,
        type: payload?.type,
        id: payload?.id,
      })
    }
  }

  const closeMenu = () => {
    setAnchorEl((prev) => ({ ...prev, anchror: null, index: null, options: [], id: '', type: '' }))
  }

  const closeModal = () => {
    setModal({ open: false })
  }

  const addOrRemoveTypeOfTypeSelectedsState = (type: string) => {
    let copyTypeSelectecs = selectedTypes
    if (anchorEl.type) {
      copyTypeSelectecs = [...copyTypeSelectecs.filter((type) => type != anchorEl.type), type]
    } else {
      copyTypeSelectecs.push(type)
    }

    setSelectedTypes(() => [...copyTypeSelectecs])

    return copyTypeSelectecs
  }

  const optionMenuItemSelected: MenuSelectItem = (payload) => {
    if (anchorEl.index && childrens) {
      const newChildrens = modifyCardValue({
        array: childrens,
        indices: anchorEl.index,
        nuevoValor: { ...payload?.item, children: [] },
        id: anchorEl.id,
      })
      setChildrens(newChildrens)
      const typeSelecteds = addOrRemoveTypeOfTypeSelectedsState(payload.item.type)
      const allOptionsWereAdded = typeSelecteds?.length == props.options?.length
      /**
       * @descriptionwhen the last option in the menu was selected removed the nodes without data
       */
      if (typeSelecteds?.length == props.options?.length) {
        setChildrens(() => [...(removeEmptyNodes(newChildrens) ?? [])])
      }
      /**
       * @description: when the last option in the menu was selected send a notification to father
       */
      if (props?.allOptionsWereUsed) {
        props.allOptionsWereUsed(allOptionsWereAdded)
      }
      /**
       * @description: when select an option this is added to the list to show the card
       */
      setOpenNode(typeSelecteds)
    } else {
      const newFather = updateFatherValue({ item: payload?.item, children: father })
      setFather((prev) => ({ ...prev, ...newFather }))
      addOrRemoveTypeOfTypeSelectedsState(payload.item.type)
    }
    closeMenu()
  }

  const addNode: AddItem = ({ index: listOfIndex }) => {
    /**
     * @description if the list of index doesn`t existed is the parent and added the item in the first level
     */
    if (!listOfIndex) {
      setChildrens((prev) => [...(prev ?? []), temporalValueWhileAnItemIsSelected()])
    } else {
      const newChildren = addNewNode(
        childrens as TreeItem[],
        listOfIndex,
        temporalValueWhileAnItemIsSelected(),
      )
      setChildrens(() => [...newChildren])
    }
  }

  const remvoeNode: DeleteItem = async ({ id, index: listOfIndex }) => {
    const copyFather = JSON.parse(JSON.stringify(father))
    const treeDataCopy = {
      id: copyFather.id,
      type: copyFather.type,
      name: copyFather.name,
      children: JSON.parse(JSON.stringify(childrens)),
    }

    if (props?.allOptionsWereUsed) {
      props.allOptionsWereUsed(false)
    }
    if (!listOfIndex) {
      if (props.nodesWereRemoved) {
        props.nodesWereRemoved({
          item: {},
          actionCompleted: ({ value }) => {
            if (value) {
              setFather((prev) => ({ ...prev, ...temporalValueWhileAnItemIsSelected() }))
              setSelectedTypes(() => [])
              setChildrens(() => [])
              setOpenNode(() => [])
            }
          },
        })
      }
    } else {
      const types = await getListStringOfTypes({
        data: JSON.parse(JSON.stringify(childrens)),
        idAEliminar: id as string,
        indices: listOfIndex as number[],
      })

      const newArray = await removeItem({
        indices: listOfIndex as number[],
        array: JSON.parse(JSON.stringify(childrens)),
        id: id,
      })
      if (props.nodesWereRemoved) {
        props.nodesWereRemoved({
          item: { ...treeDataCopy, children: newArray },
          actionCompleted: ({ value }) => {
            if (value) {
              setOpenNode((prev) => prev.filter((item) => !types.tiposResultantes.includes(item)))
              setSelectedTypes((prev) =>
                prev.filter((type) => !types.tiposResultantes.includes(type)),
              )
              setChildrens(() => [...(newArray ?? [])])
            }
          },
        })
      }
    }
  }

  const askToRemoveTheNode: DeleteItem = (payload) => {
    setModal((prev) => ({
      ...prev,
      open: true,
      title: t('operatingLevel.modals.removeTitle'),
      description: t('operatingLevel.modals.removeDescription'),
      onClick: () => {
        remvoeNode(payload)
        closeModal()
      },
    }))
  }

  const showOrHideNodes = async ({ id, listOfIndex }: { id?: string; listOfIndex?: number[] }) => {
    if (id) {
      if (listOfIndex) {
        if (openNode.includes(id)) {
          const types = await getListStringOfTypes({
            data: JSON.parse(JSON.stringify(childrens)),
            idAEliminar: id as string,
            indices: listOfIndex as number[],
          })

          setOpenNode((prev) => prev.filter((item) => !types.tiposResultantes.includes(item)))
        } else {
          setOpenNode((prev) => [...prev, id])
        }
      }
    } else {
      setShowChildren(!showChildren)
      if (showChildren) {
        setOpenNode(() => [])
      }
    }
  }

  const getTreeData = () => {
    const copyFather = { ...father }
    return {
      id: copyFather.id,
      type: copyFather.type,
      name: copyFather.name,
      children: childrens,
    }
  }

  useImperativeHandle(ref, () => ({
    getData: getTreeData,
  }))

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        minHeight: '200px',
        paddingBottom: !props.readonly ? '35px' : '0px',
        paddingTop: '8px',
      }}
    >
      <ExternalThree
        lineWidth={'2px'}
        lineColor={props.readonly ? '#828282' : '#24A9E2'}
        lineBorderRadius={'10px'}
        lineStyle={props.readonly ? 'dotted' : 'solid'}
        lineHeight="30px"
        label={
          <Card
            {...father}
            isOpen={showChildren}
            cardModel={props.cardModel}
            add={addNode}
            canDelete={!!childrens?.length && !props.readonly}
            delete={askToRemoveTheNode}
            haveFather={true}
            haveChildren={!!father?.type}
            showAddHeaderIcon={!!thereAreSomeOption && !!father?.type && !!childrens?.length}
            showAddBottom={!childrens?.length && !!father?.type && !!thereAreSomeOption}
            paperProps={{
              onClick: (e) => {
                displayOptionMenu({ payload: father, e, isFather: true })
              },
            }}
            dropDownProps={{
              onClick: () => {
                showOrHideNodes({})
              },
            }}
          />
        }
      >
        {!!childrens?.length && showChildren && (
          <ThreeItem
            openNode={openNode}
            readonly={props.readonly}
            cardModel={(payload) => (
              <Card
                {...payload}
                readonly={props.readonly}
                cardModel={props.cardModel}
                paperProps={{
                  onClick: (e) => {
                    displayOptionMenu({ payload, e })
                  },
                }}
                canDelete={!props.readonly}
                haveChildren={!!payload?.type}
                showLastLine={!thereAreSomeOption && !payload.haveChildren}
                showAddHeaderIcon={
                  !!thereAreSomeOption && !!payload?.type && !!payload.haveChildren
                }
                showAddBottom={!payload.haveChildren && !!payload?.type && !!thereAreSomeOption}
                delete={askToRemoveTheNode}
                dropDownProps={{
                  onClick: () => {
                    showOrHideNodes({ listOfIndex: payload.index, id: payload.id })
                  },
                }}
                add={addNode}
              />
            )}
            children={childrens}
          />
        )}
      </ExternalThree>

      {!!anchorEl.options?.length && (
        <Menu
          open={!!anchorEl.anchror}
          anchorEl={anchorEl.anchror}
          bounding={anchorEl.anchror?.getBoundingClientRect()}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          onClose={closeMenu}
          list={anchorEl.options ?? []}
          selectItem={optionMenuItemSelected}
        />
      )}

      <ModalStart
        sx={styles.modal}
        open={modal.open}
        onClose={closeModal}
        title={modal.title ?? ''}
        description={modal?.description}
        clickButton={modal.onClick}
        textButton={t('operatingLevel.button.confirm')}
      />
    </Box>
  )
})

export { Tree }
