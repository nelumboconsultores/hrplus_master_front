import { CurrencyInput } from 'react-currency-mask'
import { Controller, ControllerProps, useFormContext } from 'react-hook-form'
import { InputRoot } from './inputRoot'
import { InputRootProps } from 'core/types'
import { InputAdornment } from '@mui/material'

type InputCurrencyProps = {
  InputProps?: InputRootProps
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
}

export const InputCurrency: React.FC<InputCurrencyProps> = ({ InputProps, controlProps }) => {
  const { control } = useFormContext()
  return (
    <Controller
      {...controlProps}
      name={InputProps?.name ?? ''}
      control={control}
      render={({ field: { ref, onChange, value } }) => {
        return (
          <CurrencyInput
            value={Number(value) === 0 ? '0' : Number(value)}
            onChangeValue={(_, valueOn) => onChange(Number(valueOn))}
            locale="es-MX"
            hideSymbol
            InputElement={
              <InputRoot
                {...InputProps}
                ref={ref}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            }
          />
        )
      }}
    />
  )
}
