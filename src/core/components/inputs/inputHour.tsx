import { Control, Controller } from 'react-hook-form'
import { InputAttributes, NumericFormatProps, PatternFormat } from 'react-number-format'
import { InputRoot } from '.'
import { forwardRef } from 'react'
import { InputRootProps } from 'core'

type NumberFormatCustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const FormatHourCustom = forwardRef<NumericFormatProps<InputAttributes>, NumberFormatCustomProps>(
  function FormatHourCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <PatternFormat
        getInputRef={ref}
        {...other}
        onValueChange={(values: { value: string }): void => {
          onChange({ target: { name: props.name, value: values.value } })
        }}
        format="##:##"
        mask="_"
      />
    )
  },
)

type InputHourProps = InputRootProps & { control: Control }
export const InputHour = forwardRef<HTMLInputElement, InputHourProps>((props, ref) => {
  const handleChanges = (e: { target: { name: string; value: string } }) => {
    if (e.target.value.length === 4) {
      const valueNew = e.target.value
      const length = valueNew.length
      const firstHalf = valueNew.slice(0, length / 2)
      const secondHalf = valueNew.slice(length / 2)
      const formattedString = `${firstHalf}:${secondHalf}`
      return formattedString
    }
    return e.target.value
  }
  return (
    <Controller
      defaultValue={props.defaultValue}
      control={props.control}
      name={props.name ?? ''}
      render={({ field }) => (
        <InputRoot
          {...field}
          {...props}
          ref={ref}
          onChange={(e) => field.onChange(handleChanges(e))}
          InputProps={{ ...props.InputProps, inputComponent: FormatHourCustom as any }} //eslint-disable-line
        />
      )}
    />
  )
})
