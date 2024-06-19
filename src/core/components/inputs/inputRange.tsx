import { Grid, Grid2Props } from '@mui/material'
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { Controller, useFormContext } from 'react-hook-form'
import { esES } from '@mui/x-date-pickers/locales'

type InputRangeProps = {
  onChange?: (e: Date | null, name: string) => void
  spacing?: number

  fromProp?: {
    gridProps?: Grid2Props
    name?: string
    helperText?: string
    error?: boolean
    minDate?: dayjs.Dayjs | undefined
  } & DatePickerProps<Date>
  toProp?: {
    gridProps?: Grid2Props
    name?: string
    helperText?: string
    error?: boolean
  } & DatePickerProps<Date>
}

export const InputRange: React.FC<InputRangeProps> = ({ spacing, toProp, fromProp }) => {
  const { control, watch } = useFormContext()

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={'es'}
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
    >
      <Grid container columnSpacing={0.5} spacing={spacing}>
        <Grid {...fromProp?.gridProps} item>
          <Controller
            control={control}
            name={fromProp?.name ?? 'from'}
            render={({ field: { onChange } }) => (
              <DatePicker
                {...fromProp}
                label={'Desde'}
                onChange={onChange}
                format="DD/MM/YYYY"
                minDate={fromProp?.minDate ?? dayjs()}
                maxDate={watch(toProp?.name ?? 'to') ?? undefined}
                sx={{ ...fromProp?.sx, ...{ minWidth: { lg: '240', xl: '278px' } } }}
                slotProps={{
                  textField: {
                    helperText: fromProp?.helperText,
                    error: fromProp?.error,
                  },
                  calendarHeader: { sx: { textTransform: 'capitalize' } },
                }}
              />
            )}
          />
        </Grid>
        <Grid {...toProp?.gridProps} item>
          <Controller
            control={control}
            name={toProp?.name ?? 'to'}
            render={({ field: { onChange } }) => (
              <DatePicker
                {...toProp}
                label={'Hasta'}
                onChange={onChange}
                format="DD/MM/YYYY"
                minDate={watch(fromProp?.name ?? 'from') ?? dayjs()}
                sx={{
                  ...toProp?.sx,
                  ...{ minWidth: { lg: '240', xl: '278px' }, paddingBottom: '5px' },
                }}
                slotProps={{
                  textField: {
                    helperText: toProp?.helperText,
                    error: toProp?.error,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}
