import { Grid, IconButton } from '@mui/material'
import { InputAutocomplete, ItemsSelectType, icons } from 'core'
import { useFormContext } from 'react-hook-form'
import { styles } from '../styles'
import { SelectTypeTurn } from './selectTypeTurn'
import { useEffect, useState } from 'react'
import { getDurations } from 'core/services'

export const ShiftsVarComponent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [durationsOptions, setDurationsOptions] = useState<ItemsSelectType[]>([])
  const loadingData = async () => {
    const response = await getDurations()
    setDurationsOptions(response?.data?.map((item) => ({ label: item.name, value: item.id })) ?? [])
  }
  useEffect(() => {
    loadingData()
  }, [])
  return (
    <Grid container spacing={{ xs: 1, lg: 2 }}>
      <Grid item xs={3.3}>
        <InputAutocomplete
          options={durationsOptions}
          control={control}
          label="Duración"
          name="durationId"
          errors={errors.durationId?.toString()}
          helpertext={errors.durationId?.message as string}
        />
      </Grid>
      <SelectTypeTurn />

      <Grid item xs={1}>
        <IconButton sx={styles.iconPlus} type="submit">
          {icons.addCircleOutline}
        </IconButton>
      </Grid>
    </Grid>
  )
}
