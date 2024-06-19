import { Box, Checkbox, FormControlLabel, Radio } from '@mui/material'
import {
  AppContext,
  CardDetail,
  ConfirmationModal,
  InputAutocomplete,
  InputNumber,
  Variant,
  validationMaxNumber,
} from 'core'
import { styles } from './cardGalleryStyles'
import { TemplateCardProps } from '../../types/componentCardMap'
import { CardSwitch } from '../../hooks/cardSwitch'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { configEvidences, removeIncidence } from 'core/services/incidents'
import { LoadingButton } from '@mui/lab'

type SelectedCheckboxes = {
  id: string
  checked: boolean
  name: string
}

type FormData = {
  id: number | undefined
  required: boolean
  requiredValue: boolean
  sizes: number
  types: SelectedCheckboxes[]
  amounts: number
}

export const CardGallery: React.FC<TemplateCardProps> = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const { label, isRequired, checkboxes, switchIsRequired, sizes, amounts, lists, id } = value
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const { setActMessage } = useContext(AppContext)
  const { t } = useTranslation()
  const { control, handleSubmit, register, setValue, watch } = useForm<FormData>({
    defaultValues: {
      id,
      sizes,
      amounts,
      types: checkboxes,
      required: isRequired,
      requiredValue: switchIsRequired,
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'types',
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)
    const selectedTypes = data.types.filter((type) => type.checked).map((type) => type.name)

    const body = [
      {
        id: watch('id') ?? value.id,
        required: data.required,
        textHelp: value.textHelp,
        config: {
          sizes: data.sizes ?? null,
          types: selectedTypes,
          amounts: data.amounts ?? null,
        },
        evidenceTypeId: value.evidenceType,
        solicitationCatalogId: value.solicitationCatalogId,
      },
    ]

    const response = await configEvidences(body)

    if (response?.data) {
      if (response?.data?.data.length > 0) {
        setValue('id', response?.data?.data[0].id)
      }
      setActMessage({
        type: Variant.success,
        message: t('incidents.update'),
      })
    }
    if (response?.error) {
      setActMessage({
        type: Variant.error,
        message: t('incidents.errors'),
      })
    }

    setLoading(false)
  }

  useEffect(() => {
    if (checkboxes) {
      setValue('types', checkboxes as SelectedCheckboxes[])
    }
  }, [checkboxes, setValue])

  const handleRadioChange = () => {
    setValue('required', !watch('required'))
    if (watch('required')) {
      setValue('requiredValue', true)
    }
  }
  const handleSwitchChange = () => {
    setValue('requiredValue', !watch('requiredValue'))
    if (watch('requiredValue') === false) {
      setValue('required', false)
      if (watch('id') !== null) {
        setOpenConfirmation(true)
      }
    }
  }

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...fields]
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked
    setValue('types', updatedCheckboxes)
  }

  const selectedValues = useMemo(
    () => lists?.find((v) => v.value === watch('sizes')),
    [watch('sizes')], //eslint-disable-line
  )
  const cancelUpdate = async () => {
    setOpenConfirmation(false)
    setValue('requiredValue', true)
  }

  const UpdateData = async () => {
    setLoading(true)
    if (watch('id')) {
      const response = await removeIncidence(watch('id') as number)

      if (response?.error) {
        setActMessage({
          type: Variant.error,
          message: t('incidents.errors'),
        })
      } else {
        setValue('id', undefined)
        setActMessage({
          type: Variant.success,
          message: t('incidents.update'),
        })
      }
    }
    setLoading(false)
    setOpenConfirmation(false)
  }

  return (
    <>
      <CardDetail>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={styles.boxContainer}>
            <FormControlLabel
              control={
                <CardSwitch
                  {...register('requiredValue')}
                  sx={styles.cardStyles}
                  checked={watch('requiredValue')}
                  onChange={handleSwitchChange}
                />
              }
              label={label}
            />

            <FormControlLabel
              control={
                <Radio
                  sx={styles.checked}
                  checked={watch('required')}
                  disabled={!watch('requiredValue')}
                  onClick={handleRadioChange}
                />
              }
              label={t('incidents.detail.mandatory')}
            />
          </Box>

          <Box sx={styles.componentContainer}>
            {fields.map((checkbox, index) => (
              <FormControlLabel
                key={checkbox.id}
                control={
                  <Checkbox
                    {...register(`types.${index}.checked`)}
                    checked={checkbox.checked}
                    disabled={!watch('requiredValue')}
                    onChange={() => handleCheckboxChange(index)}
                    name={`types.${index}.checked`}
                  />
                }
                label={checkbox.name.toUpperCase()}
              />
            ))}
          </Box>
          <Box sx={styles.box}>
            {lists && lists?.length > 0 ? (
              <Box sx={styles.padInput}>
                <InputAutocomplete
                  control={control}
                  disabled={!watch('requiredValue')}
                  name="sizes"
                  options={lists}
                  label={t('incidents.detail.sizes')}
                  value={selectedValues ?? null}
                />
              </Box>
            ) : (
              <Box sx={styles.padInput}>
                <InputNumber
                  label={t('incidents.detail.sizes')}
                  disabled={!watch('requiredValue')}
                  defaultValue={sizes}
                  onInput={validationMaxNumber}
                />
              </Box>
            )}

            <Box sx={styles.padInput}>
              <InputNumber
                {...register('amounts')}
                disabled={!watch('requiredValue')}
                label={t('incidents.detail.amounts')}
                value={watch('amounts')}
                onInput={validationMaxNumber}
              />
            </Box>
          </Box>

          {watch('requiredValue') && (
            <LoadingButton
              variant="contained"
              sx={{ marginTop: '20px', justifySelf: 'flex-end', alignSelf: 'flex-end' }}
              type="submit"
              loading={loading}
            >
              Guardar
            </LoadingButton>
          )}
        </form>
      </CardDetail>
      <ConfirmationModal
        open={!!openConfirmation}
        title={''}
        isFetching={loading}
        description={t('incidents.delete')}
        onClose={() => cancelUpdate()}
        onConfirm={() => UpdateData()}
      />
    </>
  )
}
