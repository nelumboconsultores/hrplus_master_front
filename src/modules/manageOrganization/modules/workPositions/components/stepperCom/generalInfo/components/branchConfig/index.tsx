import { Box } from '@mui/material'
import {
  AppContext,
  ErrorMessage,
  InputAutoSearchButton,
  ItemCard,
  ItemsSelectType,
  OpenWithUpdate,
  Variant,
} from 'core'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useContext, useEffect, useState } from 'react'
import { getAllStores } from 'modules/manageOrganization/modules/stores/services/model.services'
import { WorkPositionsContext } from 'modules/manageOrganization/modules/workPositions/context'
import { DetailCard } from 'modules/manageOrganization/components/detailCard'
import { GeneralInfoType } from 'modules/manageOrganization/modules/workPositions/types'

type BranchConfigProps = {
  generalInfo?: GeneralInfoType
  setGeneralInfo: React.Dispatch<React.SetStateAction<GeneralInfoType | undefined>>
}

export const BranchConfig: React.FC<BranchConfigProps> = ({ generalInfo, setGeneralInfo }) => {
  const {
    control,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext()
  const { setActMessage } = useContext(AppContext)
  const { consultStore, modelState } = useContext(WorkPositionsContext)
  const { t } = useTranslation()
  const [optBranch, setOptBranch] = useState<ItemsSelectType[]>([])
  const getBranch = async (value?: string | number | readonly string[]) => {
    const trimmedValue = value?.toString().trim()
    if (trimmedValue && trimmedValue.toString().length > 2) {
      const { data, error } = await getAllStores(`search=${value as string}`)
      if (data) {
        const options = data.data.map((item) => ({
          label: `${item.code} - ${item.denomination}`,
          value: item.id,
        }))
        if (options.length === 0)
          setActMessage({
            message: t(`general.notifications.noResults`),
            type: Variant.info,
          })

        setOptBranch(options)
      }
      if (error) {
        setActMessage({
          message: t(`instancesWorkPositions.creation.notifications.error`),
          type: Variant.error,
        })
      }
    } else {
      setError('stores', {
        type: 'manual',
        message: t('instancesStores.creation.notifications.minConstcenterSearch'),
      })
    }
  }
  const changeValueCheck = (id: number) => {
    if (!generalInfo) return
    const newStructureOrg = generalInfo.structureOrg.map((str) => {
      if (str.id === id) return { ...str, check: true }
      return { ...str, check: false }
    })
    setGeneralInfo({ ...generalInfo, structureOrg: newStructureOrg })
  }
  const clearPost = () => {
    setGeneralInfo(undefined)
    setOptBranch([])
  }

  const updateInfo = () => {
    consultStore(
      (watch('stores') as string) ?? modelState.formInformation?.generalInfo.storesId,
      modelState.formInformation?.generalInfo.selectOrg,
    ).then((data) => {
      if (data) setGeneralInfo(data)
    })
  }
  useEffect(() => {
    if (!watch('stores')) return
    updateInfo()
  }, [watch('stores')]) // eslint-disable-line

  return (
    <Box sx={{ width: '100%' }}>
      <OpenWithUpdate
        title={t('instancesWorkPositions.view.inputs.branch')}
        onRefresh={getBranch}
        hiddenIcon={!generalInfo ? false : true}
      >
        {!generalInfo && (
          <InputAutoSearchButton
            options={optBranch}
            sx={{ width: '340px' }}
            control={control}
            propsInput={{
              name: 'stores',
              label: t('instancesWorkPositions.input.searchBranch'),
              placeholder: t('instancesWorkPositions.placeHolder.searchBranch'),
              error: !!errors.stores,
              helperText: errors.stores?.message as string,
              onChange: () => clearErrors('stores'),
            }}
            onSearch={getBranch}
            controlProps={{
              rules: {
                required: {
                  value: true,
                  message: t('general.validations.requiredName', { name: 'Sucursal' }),
                },
              },
            }}
          />
        )}
        {generalInfo?.main && (
          <ItemCard
            label={generalInfo?.main.code + ' - ' + generalInfo.main.name}
            title={generalInfo?.main.address}
            clearPost={clearPost}
          />
        )}
      </OpenWithUpdate>
      {generalInfo?.structureGeo.data && (
        <OpenWithUpdate
          hiddenIcon
          title={t('instancesWorkPositions.creation.title.geographicalStructureLevel')}
        >
          <DetailCard structures={generalInfo?.structureGeo} hideShadow />
        </OpenWithUpdate>
      )}
      {generalInfo?.structureOrg && generalInfo?.structureOrg?.length > 0 && (
        <OpenWithUpdate
          title={t('instancesWorkPositions.creation.title.organizationalStructureLevel')}
          onRefresh={updateInfo}
        >
          <Controller
            name="storeOrganizativeId"
            rules={{
              required: t('general.validations.requiredName', {
                name: 'Nivel de la estructura organizativa',
              }),
            }}
            render={({ field: { onChange } }) => (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {generalInfo?.structureOrg?.map((str) => (
                  <DetailCard
                    key={str.id}
                    structures={str}
                    checked
                    checkedProps={{
                      click: (id) => {
                        onChange(id)
                        changeValueCheck(id)
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          />
          <ErrorMessage message={errors.storeOrganizativeId?.message as string} />
        </OpenWithUpdate>
      )}
    </Box>
  )
}
