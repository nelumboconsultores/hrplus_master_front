import React from 'react'
import { Autocomplete, AutocompleteProps, Icon, TextField, TextFieldProps } from '@mui/material'
import { ItemsSelectType } from 'core/types'
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { icons } from 'core/utils'

type InputAutoSearchPropsLocal<TControl extends FieldValues = any> = {
  control: Control<TControl>
  errors?: string
  helpertext?: string
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
  propsInput?: TextFieldProps
  getNameAndValue?: boolean
} & Omit<AutocompleteProps<ItemsSelectType, boolean, true, true>, 'renderInput'>

export const InputAutoSearch: React.FC<InputAutoSearchPropsLocal> = ({
  controlProps,
  propsInput,
  getNameAndValue,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Controller
      {...controlProps}
      name={propsInput?.name ?? ''}
      control={rest.control}
      render={({ field: { onChange, ref } }) => {
        return (
          <Autocomplete
            {...rest}
            fullWidth
            freeSolo
            clearOnBlur
            noOptionsText={t('general.autoComplete.noOptions')}
            onChange={(_, e) => {
              if (getNameAndValue) onChange(e as ItemsSelectType)
              else onChange((e as ItemsSelectType)?.value || null)
            }}
            sx={{
              '&.MuiAutocomplete-hasClearIcon.MuiAutocomplete-root .MuiOutlinedInput-root': {
                pr: '9px ',
              },
              '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
                pr: '9px',
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...propsInput}
                inputRef={ref}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <Icon>{icons.search}</Icon>,
                }}
              />
            )}
          />
        )
      }}
    />
  )
}
