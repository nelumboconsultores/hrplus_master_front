import { InputsEnum, ItemDynamicFormType } from 'core'
import { MultiSelectDynamic, SearchAutoDynamic, SearchDynamic, SelectDynamic } from './components'

type ReturnInputProps = { input: ItemDynamicFormType; getNameAndValue?: boolean }

export const ReturnInput: React.FC<ReturnInputProps> = ({ input, getNameAndValue }) => {
  switch (input.type) {
    case InputsEnum.Select:
      return <SelectDynamic input={input} />
    case InputsEnum.Search:
      return <SearchDynamic input={input} />
    case InputsEnum.MultiSelect:
      return <MultiSelectDynamic input={input} />
    case InputsEnum.SearchAutocomplete:
      return <SearchAutoDynamic input={input} getNameAndValue={getNameAndValue} />

    default:
      return (
        <div>
          <h3>No se consiguió input</h3>
        </div>
      )
  }
}
