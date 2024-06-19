import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import { Dayjs } from 'dayjs'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'

type InputDateProps = {
  name: string
  helpertext?: string
  error?: boolean
  placeholder?: string
  onBlur?: () => void
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
} & DatePickerProps<Dayjs>

export const InputDate: React.FC<InputDateProps> = ({
  helpertext,
  error,
  placeholder,
  name,
  controlProps,
  onBlur,
  ...rest
}) => {
  const { control, setValue } = useFormContext()

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      const formattedValue = newValue.format('DD/MM/YYYY')
      setValue(name, formattedValue, { shouldValidate: true })
    } else {
      setValue(name, null, { shouldValidate: true })
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Controller
        {...controlProps}
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            {...field}
            {...rest}
            onChange={(newValue) => {
              handleDateChange(newValue)
              field.onChange(newValue ? newValue?.format('DD/MM/YYYY') : null)
            }}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                helperText: helpertext,
                error,
                placeholder,
                fullWidth: true,
                onBlur,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
