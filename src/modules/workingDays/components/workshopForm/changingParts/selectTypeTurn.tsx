import { Grid } from '@mui/material'
import { InputAutocomplete, ItemsSelectType } from 'core'
import { getWorkTurnType } from 'core/services'
import { typesOfShifts } from 'modules/workingDays/enums'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const SelectTypeTurn = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [typesTurn, setTypesTurn] = useState<ItemsSelectType[]>([])
  const loadingOptions = async () => {
    const response = await getWorkTurnType()
    setTypesTurn(
      response?.data?.map((item) => {
        return { label: typesOfShifts[item.id], value: item.id }
      }) ?? [],
    )
  }
  useEffect(() => {
    loadingOptions()
  }, [])
  return (
    <Grid item xs={4}>
      <InputAutocomplete
        options={typesTurn}
        loading={typesTurn.length === 0}
        control={control}
        label="Tipo"
        name="workTurnTypeId"
        errors={errors.workTurnTypeId?.toString()}
        helpertext={errors.workTurnTypeId?.message as string}
      />
    </Grid>
  )
}
