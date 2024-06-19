import React from 'react'
import { Control, Controller, ControllerProps } from 'react-hook-form'
import { NumericFormatProps, InputAttributes, PatternFormat } from 'react-number-format'
import { InputRoot } from '.'
import { InputRootProps } from 'core/types'

const NumberFormatCustom = React.forwardRef<
  NumericFormatProps<InputAttributes>,
  {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
  }
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props

  return (
    <PatternFormat
      getInputRef={ref}
      {...other}
      onValueChange={(values: { value: string }): void => {
        onChange({ target: { name: props.name, value: values.value } })
      }}
      format="(##) ####-####"
      mask="_"
    />
  )
})

type PhoneInputProps = InputRootProps & {
  control: Control
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
}

export const InputPhoneComponent = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ controlProps, ...props }, ref): JSX.Element => {
    return (
      <Controller
        {...controlProps}
        defaultValue={props.defaultValue}
        control={props.control}
        name={props.name ?? ''}
        render={({ field }) => (
          <InputRoot
            {...field}
            {...props}
            ref={ref}
            InputProps={{
              ...props.InputProps,
              inputComponent: NumberFormatCustom as any,
            }} //eslint-disable-line
          />
        )}
      />
    )
  },
)
