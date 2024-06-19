import { Box, Button, Grid, Typography } from '@mui/material'
import {
  AppContext,
  ConfirmationModal,
  GeneralAccordion,
  InputAutoSearch,
  ItemsSelectType,
  MapGrid,
  OpenWithUpdate,
  PathName,
  Variant,
} from 'core'
import { GridBox } from 'modules/manageOrganization/components'
import { ArrowBox } from 'modules/manageOrganization/components/infoBox/arrowBox'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { getListWorkPositions, updateWorksPositions } from '../../../services/model.services'
import { useNavigate, useParams } from 'react-router-dom'
import { WorkPositionsContext } from '../../../context'
import { styles } from './styles'
import { DetailCard } from '../../dynamicSelectForm/detailCard'

export const LevelGeoStr = () => {
  const { loadData, modelState, formatArrayToDynamic } = useContext(WorkPositionsContext)
  const { setActMessage } = useContext(AppContext)
  const { t } = useTranslation()
  const { id } = useParams()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      orgManagerId: modelState.formInformation?.levelGeoStr?.orgManager,
      approvalManagerId: modelState.formInformation?.levelGeoStr?.approvalManager,
    },
  })

  const [openModal, setOpenModal] = useState(false)
  const [options, setOptions] = useState<ItemsSelectType[]>([])
  const refillDetails = modelState.formInformation?.generalInfo
  const navigate = useNavigate()
  const onSubmit = () => {
    if (!id) setOpenModal(true)
    else finish()
  }

  const finish = async (active?: boolean) => {
    setOpenModal(false)
    let updateData: Record<string, string | number | boolean | undefined> = {}

    const orgManagerId = getValues('orgManagerId')
    updateData.orgManagerId = orgManagerId ?? 0

    const approvalManagerId = getValues('approvalManagerId')
    updateData.approvalManagerId = approvalManagerId ?? 0

    if (active !== undefined) {
      updateData = { ...updateData, statusId: active === false ? 2 : 1 }
    }
    const { data, error } = await updateWorksPositions(modelState.id?.toString() ?? '0', updateData)
    if (data) {
      loadData({ newData: data, step: 3 })
      navigate(PathName.instanceJobTitlesDetail + '/' + data.data.workPosition.id)
    }
    if (error) {
      setActMessage({
        message: t(`instancesWorkPositions.creation.notifications.error`),
        type: Variant.error,
      })
    }
  }

  useEffect(() => {
    loadOptions()
  }, []) // eslint-disable-line

  const loadOptions = async () => {
    getListWorkPositions().then((response) => {
      if (response.data) {
        setOptions(
          response.data.data.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          })),
        )
      }

      if (response.error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    })
  }

  const valueOrgManager = useMemo(
    () => options.find((v) => v.value === watch('orgManagerId')),
    [options, watch('orgManagerId')], // eslint-disable-line
  )
  const valueApprovalManager = useMemo(
    () => options.find((v) => v.value === watch('approvalManagerId')),
    [options, watch('approvalManagerId')], // eslint-disable-line
  )
  return (
    <Box>
      {refillDetails?.main && (
        <GridBox
          title={t(`instancesWorkPositions.creation.title.generalInformation`)}
          arrayGenInfo={formatArrayToDynamic(
            refillDetails?.main,
            modelState.formInformation?.typesInputs.generalInfo.main,
          )}
        />
      )}
      {refillDetails?.stores && (
        <GridBox
          title={t('instancesWorkPositions.view.inputs.branch')}
          arrayGenInfo={formatArrayToDynamic(
            refillDetails?.stores,
            modelState.formInformation?.typesInputs.generalInfo.dataStores,
          )}
        />
      )}
      {refillDetails?.positions && (
        <GridBox
          title={t('instancesWorkPositions.view.inputs.post')}
          arrayGenInfo={refillDetails?.positions ?? []}
        />
      )}
      {refillDetails?.geo && (
        <ArrowBox
          title={t('instancesWorkPositions.creation.title.geographicalStructureLevel')}
          arrayGenInfo={refillDetails?.geo ?? []}
        />
      )}
      {refillDetails?.org && (
        <ArrowBox
          title={t('instancesWorkPositions.creation.title.organizationalStructureLevel')}
          arrayGenInfo={refillDetails?.org ?? []}
        />
      )}
      {refillDetails?.costCenter && (
        <GeneralAccordion
          title={t('instancesWorkPositions.view.inputs.costCenter')}
          props={{
            accordionProps: {
              defaultExpanded: true,
            },
          }}
        >
          <DetailCard
            structures={{
              id: refillDetails.cost_centerId,
              data: [
                {
                  name: `${refillDetails.costCenter[0].value} - ${refillDetails.costCenter[1].value}`,
                  type: 'Código - Denominación',
                },
              ],
            }}
            isDetail
          />
        </GeneralAccordion>
      )}
      <OpenWithUpdate title={t('instancesWorkPositions.creation.stepper.jobCategory')} hiddenIcon>
        <Typography variant="h1" sx={{ fontSize: '1.1rem' }}>
          Denominacion: {modelState.formInformation?.jobConfig?.description.denomination}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: '1rem' }}>
          Código: {modelState.formInformation?.jobConfig?.description.code}
        </Typography>
        <Box sx={{ my: '16px' }}></Box>
        <MapGrid
          arrayInfo={formatArrayToDynamic(
            modelState.formInformation?.jobConfig?.fields ?? [],
            modelState?.formInformation?.typesInputs?.tab,
          )}
        />
      </OpenWithUpdate>

      <OpenWithUpdate title={t('instancesWorkPositions.creation.stepper.tab')} hiddenIcon>
        <Typography variant="h1" sx={{ fontSize: '1.1rem' }}>
          Posición: {modelState.formInformation?.tab?.title}
        </Typography>
        <Typography variant="h1" sx={{ marginBottom: '16px', fontSize: '1rem' }}>
          Nivel Macropay: {modelState.formInformation?.tab?.code}
        </Typography>
        <MapGrid arrayInfo={modelState.formInformation?.tab?.fields ?? []} />
      </OpenWithUpdate>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form as object}>
        <OpenWithUpdate
          onRefresh={loadOptions}
          title={t('instancesWorkPositions.creation.title.levelGeographicalStructure')}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputAutoSearch
                control={control}
                options={options}
                value={valueOrgManager ?? ''}
                propsInput={{
                  label: t('instancesWorkPositions.input.seniorPositionOrg'),
                  placeholder: t('instancesWorkPositions.placeHolder.indicateSeniorPos'),
                  name: 'orgManagerId',
                  error: !!errors.orgManagerId,
                  helperText: errors.orgManagerId?.message as string,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <InputAutoSearch
                control={control}
                options={options}
                value={valueApprovalManager ?? ''}
                propsInput={{
                  label: t('instancesWorkPositions.input.seniorPositionIncidents'),
                  placeholder: t('instancesWorkPositions.placeHolder.seniorPositionIncidents'),
                  name: 'approvalManagerId',
                  error: !!errors.approvalManagerId,
                  helperText: errors.approvalManagerId?.message as string,
                }}
              />
            </Grid>
          </Grid>
        </OpenWithUpdate>
        <Box justifyContent="flex-end" display="flex" width="100%">
          <Button variant="contained" color="secondary" type="submit">
            {t('general.button.save')}
          </Button>
        </Box>
      </form>
      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => finish(true)}
        description={t('instancesWorkPositions.modal.youWantActivate')}
        title={t('instancesWorkPositions.modal.activateCharge')}
        confirmText={t('instancesWorkPositions.modal.yes')}
        cancelText={t('instancesWorkPositions.modal.no')}
        onCancel={() => finish(false)}
      />
    </Box>
  )
}
