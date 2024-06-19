import { Checkbox } from '@mui/material'
import { InputAutocomplete, InputAutocompletePropsLocal, icons } from 'core'

type InputMultiSelectProps = InputAutocompletePropsLocal & {
  onAddNotFoundOption?: (newOption: string) => Promise<void>
}

export const InputMultiSelect: React.FC<InputMultiSelectProps> = ({ ...props }) => {
  const { checkBoxIcon, checkBoxOutlineBlank } = icons

  return (
    <InputAutocomplete
      {...props}
      limitTags={2}
      sx={{ ...props.sx }}
      multiple
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={checkBoxOutlineBlank}
            checkedIcon={checkBoxIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
    />
  )
}
