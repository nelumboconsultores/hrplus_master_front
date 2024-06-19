import { Box, Typography } from '@mui/material'
import { AppContext, ConfirmationModal, ModalStart, PathName, Tree, Variant } from 'core'
import Spinner from 'core/components/spinner'
import { TreeItem, TreeItemOptions, TreePropsRef } from 'core/components/tree/types'
import {
  createOrUpdateOrganizationHierarchy,
  finallyOrganizationHierarchy,
  getHerarchyLevels,
} from 'core/services'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useGenerateHierarcgyStyles } from './generateHierarchyStyles'
import {
  transformDataToEndpointBody,
  transformResponseToOptionsMenu,
  transformarEstructura,
} from './methods'
import { GrayFooter } from '../../../../components'
import {
  returnFishHierarchy,
  returnModalTextTree,
} from 'modules/dataStructure/modules/companyStructure/modules/structure/utils'

const ViewTypeEnum = {
  GEOGRAPHICAL: 1,
  ORGANIZATIONAL: 2,
}
const GenerateHerarchy = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setActMessage } = useContext(AppContext)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const styles = useGenerateHierarcgyStyles()
  const ref = React.createRef<TreePropsRef>()
  const [loading, setLoading] = React.useState({ main: false, save: false, finally: false })
  const [selectedTypesDefault, setSelectedTypesDefault] = React.useState<string[] | undefined>()
  const [tree, setTree] = React.useState<TreeItem>()
  const [options, setOptions] = React.useState<TreeItemOptions[]>([])
  const [disabled, setDisabled] = React.useState({
    finally: true,
  })
  const [modal, setModal] = React.useState<{
    title?: string
    description?: string
    onClick?: () => void
    open: boolean
    openConfirmModal: boolean
  }>({ open: false, openConfirmModal: false })

  const getData = React.useCallback(async () => {
    if (id) {
      setLoading((prev) => ({ ...prev, main: true }))
      const response = await getHerarchyLevels({ id })
      const data = response.data?.data

      if (!response.error && data?.length) {
        const children = transformarEstructura(data)
        const options = transformResponseToOptionsMenu(data)
        const findFather = children.find((item) => !!item.children?.length)
        const typesWithOutChildren = data
          .filter((item) => !item.children?.length && !!item?.id)
          .map((item) => item.id?.toString() as string)
        const optionsAlreadySelected = options
          .filter((item) => !typesWithOutChildren.includes(item.id))
          .map((item) => item.id?.toString() as string)

        setTree((prev) => ({ ...prev, ...findFather, children: findFather?.children }))
        setIsCompleted(!!data[0]?.completed)
        setDisabled((prev) => ({
          ...prev,
          finally: optionsAlreadySelected?.length != options?.length,
        }))
        setSelectedTypesDefault(optionsAlreadySelected)
        setOptions(options)
      }
      setLoading((prev) => ({ ...prev, main: false }))
    }
  }, [id])

  React.useLayoutEffect(() => {
    getData()
  }, [getData])

  const confirmationSaveHierarchy = async (data?: TreeItem, saveFromFinally?: boolean) => {
    setLoading((prev) => ({ ...prev, save: true }))
    if (data) {
      let actMessage: { type: Variant; message: string } = { type: Variant.success, message: '' }
      const body = transformDataToEndpointBody([data])

      if (body?.length > 1) {
        const response = await createOrUpdateOrganizationHierarchy(body ?? [])
        if (response.data?.data?.success) {
          if (saveFromFinally) {
            /**
             * @description: this is executed when the user gave finalize and had no hierarchy configured, if saved successfully, the finalize configuration function will be executed.
             */
            confirmFinallyHierarchy(data, saveFromFinally)
          }
          actMessage = {
            type: Variant.success,
            message: t('operatingLevel.message.successSaveHierarchy'),
          }
        } else {
          actMessage = {
            type: Variant.error,
            message: !saveFromFinally
              ? t(`errorCodes.${response.error?.errors.code}`)
              : t('operatingLevel.message.couldNotBeFinalized'),
          }
        }
        if (!saveFromFinally || !!response.error) {
          setActMessage(actMessage)
        }

        setLoading((prev) => ({ ...prev, save: false }))
        return response.data?.data?.success
      } else {
        actMessage = { type: Variant.error, message: t(`operatingLevel.message.noHierarchy`) }
        setActMessage(actMessage)
      }
    }
    setLoading((prev) => ({ ...prev, save: false }))
  }

  const confirmFinallyHierarchy = async (data?: TreeItem, finallyFromSave?: boolean) => {
    setLoading((prev) => ({ ...prev, finally: true }))
    if (data && id) {
      const payload = {
        id,
        body: { orgMacroStructureId: id },
      }
      let actMessage: { type: Variant; message: string } = { type: Variant.success, message: '' }
      const response = await finallyOrganizationHierarchy(payload)
      if (!response.error) {
        actMessage = {
          type: Variant.success,
          message:
            Number(id) === ViewTypeEnum.GEOGRAPHICAL
              ? t('operatingLevel.message.successFinaledHierarchy')
              : t('operatingLevel.message.successFinaledHierarchyOrganizational'),
        }
        navigate(PathName.DataStructure)
      } else {
        actMessage = {
          type: Variant.error,
          message: t(`errorCodes.${response.error?.errors.code}`),
        }
      }
      if (response.error?.errors.code == 'C01ORGE07' && !finallyFromSave) {
        /**
         * @description: if the user finishes but had no hierarchy saved, it will make a chain and save and then finalize it.
         */
        confirmationSaveHierarchy(data, true)
      } else {
        setActMessage(actMessage)
      }
      closeModal()
    }
    setLoading((prev) => ({ ...prev, finally: false }))
  }

  const closeModal = () => {
    setModal({ open: false, openConfirmModal: false })
  }
  const saveHierarchy = () => {
    setLoading((prev) => ({ ...prev }))
    const data = ref.current?.getData ? ref.current?.getData() : undefined
    confirmationSaveHierarchy(data)
  }

  const finallyHierarchy = () => {
    const data = ref.current?.getData ? ref.current?.getData() : undefined
    setModal((prev) => ({
      ...prev,
      open: true,
      title: t(returnFishHierarchy(id ?? '1')),
      description: t(returnModalTextTree(id ?? '1')),
      onClick: () => {
        confirmFinallyHierarchy(data)
      },
    }))
  }

  const allOptionsWereUsed = (value: boolean) => {
    setDisabled((prev) => ({ ...prev, finally: !value }))
  }

  if (loading.main) return <Spinner />
  else if (!options?.length)
    return (
      <Box sx={styles.noData}>
        <Typography variant="h1" align="center">
          {t('operatingLevel.message.thereAreNotStructureData')}
        </Typography>
      </Box>
    )
  return (
    <Box sx={styles.container(isCompleted)}>
      <Tree
        {...tree}
        nodesWereRemoved={async ({ item, actionCompleted }) => {
          if (item.children?.length) {
            const response = await confirmationSaveHierarchy(item)
            actionCompleted({ value: !!response })
          } else {
            setActMessage({ type: Variant.error, message: t(`operatingLevel.message.noHierarchy`) })
          }
        }}
        readonly={isCompleted}
        allOptionsWereUsed={allOptionsWereUsed}
        typeSelectedDefault={selectedTypesDefault}
        ref={ref}
        options={options}
      />

      {!isCompleted && (
        <GrayFooter
          buttonOne={{ onClick: saveHierarchy }}
          buttonTwo={{ onClick: finallyHierarchy, disabled: disabled.finally }}
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
        buttonOneProps={{
          loading: loading.finally,
        }}
      />

      <ConfirmationModal
        open={modal.openConfirmModal}
        title={modal.title}
        description={modal.description ?? ''}
        confirmText={t('operatingLevel.button.continue')}
        onConfirm={modal?.onClick ?? closeModal}
      />
    </Box>
  )
}

export { GenerateHerarchy }
