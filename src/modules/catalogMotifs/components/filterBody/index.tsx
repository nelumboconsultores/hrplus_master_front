import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import { InputAutocomplete, InputMultiSelect, ItemsSelectType, getMultiselecValues } from 'core'
import { statusWorkingDays } from 'modules/workingDays/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type FilterBodyProps = {
  getDataFilter: () => void
  type: number
  options: ItemsSelectType[]
  optionsCatalogue: ItemsSelectType[]
  loading: boolean
}
export const FilterBody: React.FC<FilterBodyProps> = (props) => {
  const { options, optionsCatalogue, type } = props
  const { t } = useTranslation()
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext()

  return (
    <Box sx={{ display: ' flex', alignItems: 'center' }}>
      <Grid container spacing={{ xs: 1, lg: 2 }}>
        <Grid item xs={3}>
          <InputMultiSelect
            label={type === 1 ? t('catalogMotifs.nameCatalog') : t('catalogMotifs.nameList')}
            placeholder={type === 1 ? t('catalogMotifs.nameCatalog') : t('catalogMotifs.nameList')}
            options={options}
            value={getMultiselecValues(watch('searchBy'), options)}
            control={control}
            name="searchBy"
            sx={{ marginRight: '16px' }}
            errors={errors.searchBy?.message as string}
            helpertext={errors.searchBy?.message as string}
          />
        </Grid>
        <Grid item md={4.5} lg={3.5}>
          <InputMultiSelect
            label={t('catalogMotifs.relationship')}
            placeholder={t('catalogMotifs.relationship')}
            options={optionsCatalogue}
            control={control}
            value={getMultiselecValues(watch('relationshipIds'), optionsCatalogue)}
            name="relationshipIds"
            sx={{ marginRight: '16px' }}
            errors={errors.relationshipIds?.message as string}
            helpertext={errors.relationshipIds?.message as string}
          />
        </Grid>
        <Grid item md={2.5} lg={2}>
          <InputAutocomplete
            options={statusWorkingDays}
            control={control}
            label={t('catalogMotifs.status')}
            name="status"
            value={statusWorkingDays.find(({ value }) => value === watch('status'))}
            sx={{ marginRight: '16px' }}
            errors={errors.status?.toString()}
            helpertext={errors.status?.message as string}
          />
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'center', marginTop: '4px' }}>
          <LoadingButton
            loading={props.loading}
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: '44px' }}
          >
            Buscar
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  )
}
