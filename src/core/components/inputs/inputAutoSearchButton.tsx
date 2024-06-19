import React from 'react'
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
  InputAdornment,
  Icon,
  Button,
} from '@mui/material'
import { ItemsSelectType } from 'core/types'
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { icons } from 'core'

type InputAutoSearchPropsLocal<TControl extends FieldValues = any> = {
  control: Control<TControl>
  errors?: string
  helpertext?: string
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
  propsInput?: TextFieldProps
  onSearch?: (value?: string) => void // Función de búsqueda
} & Omit<AutocompleteProps<ItemsSelectType, boolean, true, true>, 'renderInput'>

export const InputAutoSearchButton: React.FC<InputAutoSearchPropsLocal> = ({
  controlProps,
  propsInput,
  onSearch,
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
            clearOnBlur
            noOptionsText={t('general.autoComplete.noOptions')}
            onChange={(_, e, reason) => {
              onChange((e as ItemsSelectType)?.value || null)
              if (rest.onChange) rest.onChange(_, e, reason)
            }}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : (option.label as string)
            }
            sx={{
              ...(rest.sx ?? {}),
              '&.MuiAutocomplete-hasClearIcon.MuiAutocomplete-root .MuiOutlinedInput-root': {
                pr: '0px',
              },
              '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
                pr: '0px',
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...propsInput}
                inputRef={ref}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    typeof onSearch === 'function' && onSearch(params.inputProps.value as string)
                    e.preventDefault()
                  }
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '0px 4px 4px 0px',
                          padding: '13px 0px 18px 0px',
                        }}
                        onClick={() =>
                          typeof onSearch === 'function' &&
                          onSearch(params.inputProps.value as string)
                        }
                      >
                        <Icon>{icons.search}</Icon>
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        )
      }}
    />
  )
}
