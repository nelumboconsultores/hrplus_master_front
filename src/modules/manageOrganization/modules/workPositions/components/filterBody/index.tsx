import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import {
  InputAutocomplete,
  getAutocompleteValue,
  InputRoot,
  icons,
  GeneralAccordion,
  FontName,
  InputAutoSearchButton,
  ItemsSelectType,
  AppContext,
  Variant,
  OpenWithUpdate,
  ItemCard,
} from 'core'
import { TypeStructure, statusOptions } from '../../enums'
import { getAllStores } from 'modules/manageOrganization/modules/stores/services/model.services'
import { getListWorkPositionsSearch } from '../../services/model.services'
import { DynamicSelectForm } from '../dynamicSelectForm'
import { WorkPositionsContext } from '../../context'

type FilterBodyProps = {
  getDataFilter: () => void
  loading: boolean
}

export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const { t } = useTranslation()
  const [optBranch, setOptBranch] = useState<ItemsSelectType[]>([])
  const [optSeniorPosition, setSeniorPosition] = useState<ItemsSelectType[]>([])
  const [optSeniorPositionIncidents, setSeniorPositionIncidents] = useState<ItemsSelectType[]>([])
  const { register, control, watch, formState, setError, clearErrors } = useFormContext()
  const { setActMessage } = useContext(AppContext)
  const { getFields } = useContext(WorkPositionsContext)
  const [infoCard, setInfoCard] = useState<ItemsSelectType>()
  const [expanded, setExpanded] = useState(false)
  const getBranch = async (value?: string | number | readonly string[]) => {
    let trimmedValue
    if (value) {
      trimmedValue = value?.toString().trim()
    } else {
      trimmedValue = selectedValuesStore?.label?.toString().trim()
    }
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getAllStores(`search=${trimmedValue as string}`)

      if (data) {
        if (data) {
          const newOPtions = data.data.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          }))

          setOptBranch(newOPtions)
          if (newOPtions.length === 0)
            setActMessage({
              message: t(`general.notifications.noResults`),
              type: Variant.info,
            })
        }
        if (error) {
          setActMessage({
            message: t(`instancesWorkPositions.creation.notifications.error`),
            type: Variant.error,
          })
        }
      }
      if (error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    } else {
      setError('storeIds', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const getSeniorPosition = async (value?: string | number | readonly string[]) => {
    let trimmedValue
    if (value) {
      trimmedValue = value?.toString().trim()
    } else {
      trimmedValue = selectedValuesSeniorPosition?.label?.toString().trim()
    }

    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getListWorkPositionsSearch(`${trimmedValue as string}`)

      if (data) {
        if (data) {
          const newOPtions = data.data.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          }))

          setSeniorPosition(newOPtions)
          if (newOPtions.length === 0)
            setActMessage({
              message: t(`general.notifications.noResults`),
              type: Variant.info,
            })
        }
        if (error) {
          setActMessage({
            message: t(`instancesWorkPositions.creation.notifications.error`),
            type: Variant.error,
          })
        }
      }
      if (error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    } else {
      setError('orgManagerId', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const getSeniorPositionIncidents = async (value?: string | number | readonly string[]) => {
    let trimmedValues
    if (value) {
      trimmedValues = value?.toString().trim()
    } else {
      trimmedValues = selectedValuesSeniorPositionIncidents?.label?.toString().trim()
    }
    if (trimmedValues && trimmedValues.toString().length > 2) {
      const { data, error } = await getListWorkPositionsSearch(`${trimmedValues as string}`)

      if (data) {
        if (data) {
          const newOPtions = data.data.map((item) => ({
            label: `${item.code} - ${item.denomination}`,
            value: item.id,
          }))

          setSeniorPositionIncidents(newOPtions)
          if (newOPtions.length === 0)
            setActMessage({
              message: t(`general.notifications.noResults`),
              type: Variant.info,
            })
        }
        if (error) {
          setActMessage({
            message: t(`instancesWorkPositions.creation.notifications.error`),
            type: Variant.error,
          })
        }
      }
      if (error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    } else {
      setError('approvalManagerId', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }

  const handleRefresh = async () => {
    await getSeniorPosition()
    await getSeniorPositionIncidents()
  }

  useEffect(() => {
    if (watch('storeIds')) {
      const element = optBranch.find((item) => item.value === watch('storeIds'))
      if (element) setInfoCard(element)
    }
  }, [watch('storeIds')]) // eslint-disable-line

  const clearPost = () => {
    setInfoCard(undefined)
    setOptBranch([])
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const selectedValuesSeniorPosition = useMemo(
    () => optSeniorPosition.find((v) => v.value === watch('orgManagerId')),
    [watch('orgManagerId')], //eslint-disable-line
  )
  const selectedValuesSeniorPositionIncidents = useMemo(
    () => optSeniorPosition.find((v) => v.value === watch('approvalManagerId')),
    [watch('approvalManagerId')], //eslint-disable-line
  )
  const selectedValuesStore = useMemo(
    () => optBranch.find((v) => v.value === watch('storeIds')),
    [watch('storeIds')], //eslint-disable-line
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid item md={2.5} lg={3}>
          <InputRoot
            {...register('code')}
            label={t(`instancesWorkPositions.view.inputs.code`)}
            placeholder={t(`instancesWorkPositions.placeHolder.searchCode`)}
            value={watch('code')}
            sx={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item md={3.5} lg={3.5}>
          <InputRoot
            {...register('denomination')}
            label={t(`instancesWorkPositions.view.inputs.carg`)}
            placeholder={t(`instancesWorkPositions.placeHolder.searchCarg`)}
            value={watch('denomination')}
            sx={{ marginBottom: '16px' }}
          />
        </Grid>
        <Grid item md={2.5} lg={2}>
          <InputAutocomplete
            options={statusOptions}
            control={control}
            label={t(`instancesWorkPositions.view.inputs.costCenterStatusId`)}
            name="statusId"
            value={getAutocompleteValue(watch('statusId'), statusOptions)}
            sx={{ marginBottom: '16px' }}
            disableClearable
          />
        </Grid>
        {!expanded && (
          <Grid item xs={1.5} sx={{ textAlign: 'center', marginBottom: '16px' }}>
            <LoadingButton
              loading={props.loading}
              variant="contained"
              color="primary"
              type="submit"
              sx={{ height: '44px' }}
            >
              {t(`instancesWorkPositions.view.inputs.search`)}
            </LoadingButton>
          </Grid>
        )}
        <Grid item xs={expanded ? 3.5 : 2} sx={{ textAlign: 'end' }}>
          <Tooltip title={expanded ? 'Minimizar' : 'Desplegar'}>
            <IconButton onClick={toggleExpanded}>
              {expanded ? icons.doubleArrowUp : icons.doubleArrowDown}
            </IconButton>
          </Tooltip>
        </Grid>
        {expanded && (
          <>
            <Grid item xs={12}>
              <OpenWithUpdate
                title={t(`instancesWorkPositions.view.inputs.hierarchicalStructureLevel`)}
                onRefresh={handleRefresh}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <InputAutoSearchButton
                      value={selectedValuesSeniorPosition ?? ''}
                      options={optSeniorPosition}
                      sx={{ width: '340px' }}
                      control={control}
                      propsInput={{
                        name: 'orgManagerId',
                        label: t('instancesWorkPositions.input.seniorPositionOrg'),
                        placeholder: t('instancesWorkPositions.placeHolder.indicateSeniorPos'),
                        error: !!formState.errors.orgManagerId,
                        helperText: formState.errors.orgManagerId?.message as string,
                        onChange: () => clearErrors('orgManagerId'),
                      }}
                      onSearch={getSeniorPosition}
                    />
                  </Grid>

                  <Grid item>
                    <InputAutoSearchButton
                      value={selectedValuesSeniorPositionIncidents ?? ''}
                      options={optSeniorPositionIncidents}
                      sx={{ width: '340px' }}
                      control={control}
                      propsInput={{
                        name: 'approvalManagerId',
                        label: t('instancesWorkPositions.input.seniorPositionIncidents'),
                        placeholder: t(
                          'instancesWorkPositions.placeHolder.seniorPositionIncidents',
                        ),
                        error: !!formState.errors.approvalManagerId,
                        helperText: formState.errors.approvalManagerId?.message as string,
                        onChange: () => clearErrors('approvalManagerId'),
                      }}
                      onSearch={getSeniorPositionIncidents}
                    />
                  </Grid>
                </Grid>
              </OpenWithUpdate>
            </Grid>
            <Grid item xs={12}>
              <OpenWithUpdate
                title={t('instancesWorkPositions.view.inputs.branchs')}
                hiddenIcon={!infoCard ? false : true}
                onRefresh={getBranch}
              >
                {!infoCard || watch('storeIds') === undefined ? (
                  <InputAutoSearchButton
                    value={selectedValuesStore ?? ''}
                    options={optBranch}
                    sx={{ width: '340px' }}
                    control={control}
                    propsInput={{
                      name: 'storeIds',
                      label: t('instancesWorkPositions.input.searchBranch'),
                      placeholder: t('instancesWorkPositions.placeHolder.searchBranch'),
                      error: !!formState.errors.storeIds,
                      helperText: formState.errors.storeIds?.message as string,
                      onChange: () => clearErrors('storeIds'),
                    }}
                    onSearch={getBranch}
                  />
                ) : (
                  <>
                    <ItemCard
                      label={infoCard && infoCard.label ? infoCard.label.toString() : ''}
                      title={t('instancesWorkPositions.view.inputs.branch')}
                      clearPost={clearPost}
                    />
                  </>
                )}
              </OpenWithUpdate>
            </Grid>
            <Grid item xs={12}>
              <GeneralAccordion
                title={t('instancesWorkPositions.view.inputs.geoStructureLevel')}
                props={{
                  accordionProps: {
                    defaultExpanded: true,
                  },
                  iconExtraProps: {
                    color: 'secondary',
                    onClick: (e) => {
                      getFields()
                      e.stopPropagation()
                    },
                  },
                }}
                iconExtra={icons.cached}
                iconTooltip={t('general.button.update')}
              >
                <DynamicSelectForm type={TypeStructure.geo} />
              </GeneralAccordion>
            </Grid>
            <Grid item xs={12}>
              <GeneralAccordion
                title={t('instancesWorkPositions.view.inputs.orgStructureLevel')}
                props={{
                  accordionProps: {
                    defaultExpanded: true,
                  },
                  iconExtraProps: {
                    color: 'secondary',
                    onClick: (e) => {
                      getFields()
                      e.stopPropagation()
                    },
                  },
                }}
                iconExtra={icons.cached}
                iconTooltip={t('general.button.update')}
              >
                <DynamicSelectForm type={TypeStructure.org} />
              </GeneralAccordion>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'end' }}>
              <Button
                color="secondary"
                type="submit"
                sx={{
                  fontFamily: FontName.RobotoMedium,
                  fontSize: '0.9rem',
                }}
              >
                {t('instancesWorkPositions.view.actions.btn')}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  )
}
