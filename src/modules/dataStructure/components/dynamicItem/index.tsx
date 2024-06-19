import { Box, Grid } from '@mui/material'

import {
  CapitalIconButton,
  FieldTypeEnumSelect,
  FieldTypeEnumTrans,
  InputAutocomplete,
  InputRoot,
  ItemsSelectType,
  icons,
} from 'core'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { iconPen, styles } from './styles'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FormOrgContext } from 'modules/dataStructure/provider'
import { getFieldsTypes } from 'core/services'
import { SwitchIOS } from 'core/components/inputs/IOSSwitch'
import { ReturnExtraValues } from '../returnExtraValues'

export const DynamicItem: React.FC = () => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    register,
    watch,
    clearErrors,
  } = useFormContext()
  const { loading, isDisabled } = useContext(FormOrgContext)
  const [options, setOpTions] = useState<ItemsSelectType[]>([])
  const valueFieldType = useMemo(
    () => options.find((v) => v.value === watch('type')),
    [watch('type'), options], // eslint-disable-line
  )
  const hideUnique = useMemo(() => {
    const { binary, geographic_location } = FieldTypeEnumSelect
    return [binary, geographic_location].includes(watch('type'))
  }, [watch('type')]) // eslint-disable-line

  const isOptionEqualToValue = (option_: ItemsSelectType, value: ItemsSelectType) =>
    option_.value === value.value

  const getListFields = async () => {
    const response = await getFieldsTypes()
    const newData = response.data?.data.map((item) => {
      return {
        value: item.id,
        label: FieldTypeEnumTrans[item.name as keyof typeof FieldTypeEnumTrans],
      }
    })
    setOpTions(newData ?? [])
  }
  useEffect(() => {
    getListFields()
  }, [])
  return (
    <Box sx={styles.paper}>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={2}>
          <InputAutocomplete
            disabled={isDisabled || watch('id')}
            control={control}
            name="type"
            options={options ?? []}
            label={t('operatingLevel.input.fieldType')}
            errors={errors.type?.message as string}
            disableClearable
            helpertext={errors.type?.message as string}
            value={valueFieldType ?? null}
            isOptionEqualToValue={isOptionEqualToValue}
            onChange={() => clearErrors()}
          />
        </Grid>
        <Grid item xs={4}>
          <InputRoot
            {...register('name')}
            label={t('operatingLevel.input.descriptiveName')}
            placeholder={t('operatingLevel.input.enterLabelNameThisField')}
            error={!!errors.name}
            helperText={errors.name?.message as string}
            value={watch('name') ?? ''}
            disabled={isDisabled}
            inputProps={{ maxLength: 40 }}
          />
        </Grid>

        <Grid item xs={3}>
          <ReturnExtraValues />
        </Grid>
        <Grid item>
          <Box sx={styles.iconSwitch}>
            {!hideUnique && (
              <SwitchIOS
                {...register('unique')}
                label={t('operatingLevel.input.unique')}
                checked={watch('unique')}
                disabled={isDisabled}
              />
            )}
            {watch('type') !== FieldTypeEnumSelect.geographic_location && (
              <SwitchIOS
                {...register('required')}
                label={t('operatingLevel.input.required')}
                checked={watch('required')}
                disabled={isDisabled}
              />
            )}
          </Box>
        </Grid>
        <Grid item sx={styles.containerIcon}>
          <Box sx={{ position: 'relative', top: -8 }}>
            {watch('id') ? (
              <CapitalIconButton
                title={t('general.toolTip.save')}
                type="submit"
                sx={iconPen(loading ?? false)}
              >
                {icons.saveDis}
              </CapitalIconButton>
            ) : (
              <CapitalIconButton
                title={t('general.toolTip.add')}
                disabled={isDisabled || loading}
                color="primary"
                type="submit"
                sx={{
                  '& .MuiSvgIcon-root': {
                    fontSize: '3.4rem',
                  },
                }}
              >
                {icons.addCircle}
              </CapitalIconButton>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
