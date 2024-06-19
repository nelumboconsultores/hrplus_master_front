import { useCallback, useContext, useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import {
  AppContext,
  GeneralAccordion,
  ItemsSelectType,
  InputAutoSearchButton,
  Variant,
  generateQueryParams,
  PathName,
  ConfirmationModal,
  OpenWithUpdate,
} from 'core'
import { errorCodes } from 'core/locale/es/errorCodes'

import { ActionTypes, ModelStatus } from '../../../enums'
import { ModelContext } from '../../../context'
import {
  getCostCenterNames,
  setCostCenter,
  updateStatusModel,
} from '../../../services/model.services'
import { styles } from './styles'
import { WorkPeriodsList } from '../../workPeriodsList'
import { DetailCard } from '../../dynamicSelectForm/detailCard'
import { GenInfoDetail } from '../../genInfoDetail'
import { CostCenterList } from '../../costCenterList'

export const CostCenter = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { id } = useParams()
  const { modelState, modelDispatch } = useContext(ModelContext)
  const [search, setSearch] = useState<string>('')
  const [constCenterOptions, setCostCenterOptions] = useState<
    { label: string; value: string | number }[]
  >([])
  const [showActivateModal, setShowActivateModal] = useState(false)
  const { control, setValue, clearErrors, setError, formState } = useForm<{
    costCenterId?: number
  }>({})

  const { setActMessage } = useContext(AppContext)
  const navigate = useNavigate()

  const toForward = async () => {
    const message = id ? 'editSuccess' : 'createSuccess'
    setActMessage({
      message: t(`instancesStores.creation.notifications.${message}`),
      type: Variant.success,
    })
    navigate(`${PathName.instanceStoresDetail}/${modelState?.id}`, { state: location.state })
  }

  const handleChange = (
    value: NonNullable<string | ItemsSelectType> | (string | ItemsSelectType)[] | null,
  ) => {
    if (!value) return
    const costCenterId = (value as ItemsSelectType).value
    const fetchWorkPeriods = async () => {
      const { data, error } = await setCostCenter(modelState.id ?? id ?? '', { costCenterId })
      if (data) {
        modelDispatch({
          type: ActionTypes.SET_COST_CENTER,
          payload: data.data.costCenter ?? modelState.costCenter,
        })
        setValue('costCenterId', undefined)
      } else {
        const codeError = error?.errors?.code

        const message = errorCodes[codeError as keyof typeof errorCodes]
        setActMessage({
          type: Variant.error,
          message: message ?? t('instancesStores.creation.notifications.constCenterAssignError'),
        })
      }
    }

    fetchWorkPeriods()
  }

  const handleDelete = async () => {
    await setCostCenter(modelState.id ?? id ?? '', { deletedCostCenter: true })
    modelDispatch({
      type: ActionTypes.SET_COST_CENTER,
      payload: { id: 0, code: '', denomination: '' },
    })
  }

  const handleFinish = () => {
    const isInactive = modelState.formInformation.statusId === 'Inactive'
    const isFinished = modelState.costCenter.id !== 0

    if (isInactive && isFinished && !id) setShowActivateModal(true)
    else toForward()
  }
  const fetchCostcenters = useCallback(
    async (search?: string) => {
      const trimmedValue = search?.toString().trim()
      if (!trimmedValue || trimmedValue.length < 3) {
        return setError('costCenterId', {
          type: 'manual',
          message: t('instancesStores.creation.notifications.minConstcenterSearch'),
        })
      }

      setSearch(trimmedValue)

      const geographyStructIds = modelState.geographicalFields.map((geo) => geo.id)
      const organizativeStructIds = modelState.organizationalFields.map((org) => org.id)
      const params = generateQueryParams({ search, geographyStructIds, organizativeStructIds })
      const { data } = await getCostCenterNames(params)
      if (data && data.data?.length) {
        const options = data.data.map((item) => ({
          label: `${item.code} - ${item.denomination}`,
          value: item.id,
        }))

        setCostCenterOptions(options)
      } else {
        setActMessage({
          type: Variant.info,
          message: t('instancesStores.creation.notifications.constCenterNotFound'),
        })
      }
    },
    [modelState.geographicalFields, modelState.organizationalFields, setActMessage, t, setError],
  )

  const handleCancel = () => {
    setShowActivateModal(false)
    toForward()
  }

  async function handleStatusChange(modelId: string | number) {
    const { data: resp, error } = await updateStatusModel(modelId)
    if (resp) {
      const { data } = resp
      const newStatus = data.status.id !== ModelStatus.Active ? 'Desactivado' : 'Activado'
      setActMessage({
        type: Variant.success,
        message: t(`instancesStores.view.notifications.changeStatus`, { status: newStatus }),
      })
    } else {
      setActMessage({
        type: Variant.error,
        message: error?.errors?.code ?? t(`instancesStores.view.notifications.changeStatusError`),
      })
    }
  }
  const handleConfirm = async () => {
    setShowActivateModal(false)
    await handleStatusChange(modelState.id ?? id ?? '')
    toForward()
  }
  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.sectionsContainer}>
          <GeneralAccordion
            title={t(`instancesStores.creation.title.generalInformation`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <GenInfoDetail />
          </GeneralAccordion>

          <GeneralAccordion
            title={t(`instancesStores.creation.title.geolocation`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <GenInfoDetail isGeo showDinamics={false} />
          </GeneralAccordion>

          <GeneralAccordion
            title={t(`instancesStores.creation.title.workPositions`)}
            props={{
              accordionProps: {
                defaultExpanded: true,
              },
            }}
          >
            <WorkPeriodsList />
          </GeneralAccordion>

          {modelState.geographicalFields.length > 0 && (
            <GeneralAccordion
              title={t(`instancesStores.creation.title.geographicalStructureLevel`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '12px' }}>
                {modelState.geographicalFields.map((structure) => (
                  <DetailCard key={structure?.id} structures={structure} />
                ))}
              </Box>{' '}
            </GeneralAccordion>
          )}

          {modelState.organizationalFields.length > 0 && (
            <GeneralAccordion
              title={t(`instancesStores.creation.title.organizationalStructureLevel`)}
              props={{
                accordionProps: {
                  defaultExpanded: true,
                },
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: '12px' }}>
                {modelState.organizationalFields.map((structure) => (
                  <DetailCard key={structure?.id} structures={structure} />
                ))}
              </Box>{' '}
            </GeneralAccordion>
          )}

          <OpenWithUpdate
            title={t(`instancesStores.creation.title.costCenter`)}
            onRefresh={() => fetchCostcenters(search)}
            hiddenIcon={modelState.costCenter.id === 0 ? false : true}
          >
            {modelState.costCenter.id === 0 && (
              <Grid container spacing={2} mb={2}>
                <Grid item xs={4}>
                  <InputAutoSearchButton
                    control={control}
                    onSearch={fetchCostcenters}
                    propsInput={{
                      name: 'costCenterId',
                      label: t('instancesStores.creation.label.codeOrDenomi'),
                      onChange: () => clearErrors('costCenterId'),
                      error: !!formState.errors.costCenterId,
                      helperText: formState.errors.costCenterId?.message,
                    }}
                    options={constCenterOptions}
                    onChange={(_, value) => handleChange(value)}
                  />
                </Grid>
              </Grid>
            )}
            <CostCenterList handleDelete={handleDelete} />
          </OpenWithUpdate>
        </Box>
        <Box sx={styles.footer}>
          <Button color="secondary" onClick={handleFinish}>
            Guardar
          </Button>
        </Box>
      </Box>

      <ConfirmationModal
        open={showActivateModal}
        title={t('instancesStores.creation.notifications.inactiveModalTitle')}
        description={t('instancesStores.creation.notifications.inactiveModalMessage')}
        onCancel={handleCancel}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        cancelText="No"
        confirmText="Sí"
      />
    </>
  )
}
