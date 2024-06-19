import { FieldTypeEnumSelect, InputAutocomplete, ItemsSelectType } from 'core'
import { useContext, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormOrgContext } from 'modules/dataStructure/provider'
import {
  CurrencyStructure,
  DateStructure,
  FileStructure,
  GeographicalLocation,
  HourStructure,
  NumRangeStructure,
} from './inputTypes'

export const ReturnExtraValues = () => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()
  const { catReasonsOptions } = useContext(FormOrgContext)
  const isOptionEqualToValue = (option: ItemsSelectType, value: ItemsSelectType) =>
    option.value === value.value

  const selectedCatValues = useMemo(
    () => catReasonsOptions.find((v) => v.value === watch(`catalogueId`)),
    [catReasonsOptions, watch(`catalogueId`)], //eslint-disable-line
  )
  switch (watch('type')) {
    case FieldTypeEnumSelect.number:
      return (
        <NumRangeStructure
          maxProps={{
            name: 'max_value',
          }}
          minProps={{
            name: 'min_value',
          }}
        />
      )

    case FieldTypeEnumSelect.text:
      return (
        <NumRangeStructure
          maxProps={{
            name: 'maxLength',
            onInput: (e: React.ChangeEvent<HTMLInputElement>) =>
              (e.target.value = Number(e.target.value) > 255 ? (255).toString() : e.target.value),
            helperText: t('general.validations.maxChart', { max: 255 }),
          }}
          minProps={{
            name: 'minLength',
          }}
        />
      )

    case FieldTypeEnumSelect.date:
      return <DateStructure />

    case FieldTypeEnumSelect.catalog:
      return (
        <InputAutocomplete
          control={control}
          options={catReasonsOptions}
          name={`catalogueId`}
          disableClearable
          label={t('operatingLevel.input.catalogueReason')}
          errors={errors?.catalogueId?.message as string}
          helpertext={errors?.catalogueId?.message as string}
          value={selectedCatValues ?? null}
          isOptionEqualToValue={isOptionEqualToValue}
        />
      )
    case FieldTypeEnumSelect.hour:
      return <HourStructure />
    case FieldTypeEnumSelect.currency:
      return <CurrencyStructure />
    case FieldTypeEnumSelect.file:
      return <FileStructure />
    case FieldTypeEnumSelect.geographic_location:
      return <GeographicalLocation />
    case FieldTypeEnumSelect.binary:
    case FieldTypeEnumSelect.email:
    case FieldTypeEnumSelect.phone:
      return <></>
  }
}
