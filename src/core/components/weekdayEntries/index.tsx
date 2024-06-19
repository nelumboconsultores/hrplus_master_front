import { Box, Checkbox, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { itemCheck, styles } from './styles'
import { ErrorMessage } from 'core'
import { Controller, useFormContext } from 'react-hook-form'

type DaysType = { days: Array<DayType>; name: string; disabled?: boolean }
export type DayType = { name: string; value: number; disabled?: boolean }
type DayOfTheWeekProps = DayType & { father: string }

export const WeekdayEntries: React.FC<DaysType> = ({ days, name }) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  useEffect(() => {
    const selectedDays = getValues(name) || []
    const validDays = days.filter((day) => !day.disabled).map((day) => day.value)
    const cleanedDays = selectedDays.filter((day: number) => validDays.includes(day))
    if (selectedDays.length !== cleanedDays.length) {
      setValue(name, cleanedDays)
    }
  }, [days, name, getValues, setValue])

  return (
    <Box sx={styles.containerError}>
      <Box sx={styles.container}>
        {days.map((day) => (
          <DayOfTheWeek
            name={day.name}
            value={day.value}
            key={day.value}
            father={name}
            disabled={day.disabled}
          />
        ))}
      </Box>
      <ErrorMessage message={errors[name]?.message as string} />
    </Box>
  )
}

const DayOfTheWeek: React.FC<DayOfTheWeekProps> = (props) => {
  const { name, father, value, disabled } = props
  const { getValues, setValue } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue(father, [...(getValues(father) ?? []), value])
    } else {
      setValue(father, getValues(father)?.filter((item: number) => item !== value))
    }
  }

  useEffect(() => {
    if (disabled) {
      const selectedDays = getValues(father) || []
      const updatedDays = selectedDays.filter((day: number) => day !== value)
      setValue(father, updatedDays)
    }
  }, [disabled, value, father, getValues, setValue])

  return (
    <Controller
      name={father}
      render={({ field: { ref, value: fieldValue } }) => (
        <Checkbox
          ref={ref}
          onChange={(e) => handleChange(e)}
          checked={(fieldValue || []).includes(value)}
          disabled={disabled}
          sx={{ padding: '0px' }}
          icon={
            <Box sx={itemCheck(disabled)}>
              <Typography>{name}</Typography>
            </Box>
          }
          checkedIcon={
            <Box sx={styles.itemClean}>
              <Typography>{name}</Typography>
            </Box>
          }
        />
      )}
    />
  )
}
