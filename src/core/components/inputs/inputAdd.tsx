import { forwardRef, useState } from 'react'
import { InputRoot } from '.'
import { InputRootProps } from 'core/types'
import { IconButton, InputAdornment, Tooltip } from '@mui/material'
import { icons } from 'core/utils'

type InputAddProps = InputRootProps & {
  enter?: () => void
  onAdd?: (value: string) => void
}

export const InputAdd = forwardRef<HTMLInputElement, InputAddProps>(({ onAdd, ...rest }, ref) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const handleAdd = () => {
    if (onAdd && inputValue.trim() !== '') {
      onAdd(inputValue)
      setInputValue('')
    }
  }

  return (
    <InputRoot
      {...rest}
      ref={ref}
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={(event) => {
        if (event?.key === 'Enter') {
          event.preventDefault()
          event.stopPropagation()
          handleAdd()
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="Agregar">
              <IconButton sx={{ color: '#24A9E2' }} onClick={handleAdd}>
                {icons.add}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
      onKeyUp={(event) => {
        if (event?.key === 'Enter') {
          if (rest.enter) {
            rest.enter()
          }
        }
      }}
      fullWidth
    />
  )
})
