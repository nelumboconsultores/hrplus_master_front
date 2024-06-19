import React, { useState } from 'react'
import { Autocomplete, AutocompleteProps, Box, IconButton } from '@mui/material'
import { ItemsSelectType } from 'core/types'
import { InputRoot } from '.'
import { Control, Controller, ControllerProps, FieldValues } from 'react-hook-form'
import { icons } from 'core'
import { colors } from 'core/styles/colors'
import { useTranslation } from 'react-i18next'

interface PopperData {
  x: number
  y: number
  width: number
  height: number
}

export type InputAutocompletePropsLocal<TControl extends FieldValues = any> = {
  label?: string
  required?: boolean
  name?: string
  control: Control<TControl>
  errors?: string
  helpertext?: string
  defaultValue?: any
  onAddNotFoundOption?: (newOption: string) => Promise<void>
  onInvalidOption?: (isValid: boolean) => void
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
  allowZero?: boolean
} & Omit<AutocompleteProps<ItemsSelectType, boolean, boolean, boolean>, 'renderInput'>

export const InputAutocomplete: React.FC<InputAutocompletePropsLocal> = ({
  onInvalidOption,
  onAddNotFoundOption,
  controlProps,
  allowZero,
  ...rest
}) => {
  const [isValidOption, setIsValidOption] = useState<boolean>(true)
  const [newOption, setNewOption] = useState<string>('')
  const { t } = useTranslation()

  return (
    <Controller
      {...controlProps}
      name={rest?.name ?? ''}
      control={rest.control}
      render={({ field: { onChange, ref }, fieldState: { invalid } }) => {
        return (
          <Autocomplete
            {...rest}
            fullWidth
            componentsProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    enabled: true,
                    options: {
                      offset: ({ popper }: { popper: PopperData }) => {
                        const placement = popper?.y
                        if (placement > 0) {
                          return [0, 10]
                        }

                        return [0, 0]
                      },
                    },
                  },
                ],
              },
            }}
            noOptionsText={t('general.autoComplete.noOptions')}
            filterOptions={(options, params) => {
              const filtered = options.filter((option) => {
                if (typeof option.label === 'string') {
                  return option.label.toLowerCase().includes(params.inputValue.toLowerCase())
                }
                if (typeof option.label === 'number') {
                  return option.label
                    .toString()
                    .toLowerCase()
                    .includes(params.inputValue.toLowerCase())
                }
              })

              if (onAddNotFoundOption && params.inputValue !== '' && !filtered.length) {
                setIsValidOption(false)
              } else {
                setIsValidOption(true)
              }

              return filtered
            }}
            onChange={(_, e, reasen, details) => {
              if (rest.onChange) rest.onChange(_, e, reasen, details)
              if (rest.multiple) {
                const data = e as { label: string; value: any }[]
                const values = data?.map(({ value }) => value)

                onChange(values || null)
              } else if (allowZero) onChange((e as ItemsSelectType)?.value ?? null)
              else onChange((e as ItemsSelectType)?.value || null)
            }}
            onInputChange={(_, newInputValue) => {
              setNewOption(newInputValue)
            }}
            renderInput={(params) => (
              <InputRoot
                {...params}
                required={rest.required}
                placeholder={rest.placeholder}
                label={rest.label}
                inputRef={ref}
                error={!!rest.errors || (onAddNotFoundOption && invalid)}
                helperText={
                  rest.errors
                    ? rest.helpertext
                    : onAddNotFoundOption && invalid
                      ? t('general.autoComplete.selectOption')
                      : ''
                }
                defaultValue={rest.defaultValue}
                endAdornment={
                  onAddNotFoundOption && !isValidOption ? (
                    <Box sx={{ position: 'absolute', right: '0' }}>
                      <IconButton
                        onClick={() => {
                          onAddNotFoundOption(newOption)
                          setNewOption('')
                        }}
                        sx={{ color: colors.color4 }}
                      >
                        {icons.add}
                      </IconButton>
                    </Box>
                  ) : undefined
                }
              />
            )}
          />
        )
      }}
    />
  )
}
