import { Grid } from '@mui/material'
import { InputMultiSelect, InputNumber, ListFilesSelect } from 'core'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const FileStructure = () => {
  const {
    control,
    formState: { errors },
    watch,

    register,
  } = useFormContext()
  const { t } = useTranslation()
  const selectedValues = useMemo(
    () => ListFilesSelect.filter((v) => watch('fileType')?.includes(v.value)),
    [watch('fileType')], //eslint-disable-line
  )
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputMultiSelect
          control={control}
          options={ListFilesSelect}
          value={selectedValues}
          name="fileType"
          label={t('operatingLevel.input.typeFile')}
          errors={errors.fileType?.message as string}
          helpertext={errors.fileType?.message as string}
        />
      </Grid>
      <Grid item xs={6}>
        <InputNumber
          {...register('max_size', { valueAsNumber: true })}
          label={t('operatingLevel.input.maxSize')}
          placeholder={t('operatingLevel.input.maxSizeFile')}
          error={!!errors.max_size}
          helperText={errors.max_size?.message as string}
        />
      </Grid>
    </Grid>
  )
}
