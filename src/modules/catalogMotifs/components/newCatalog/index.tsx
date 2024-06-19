import { Box, Button, Chip, Tooltip, Typography } from '@mui/material'
import {
  AppContext,
  GeneralTitle,
  InputAdd,
  InputRoot,
  Variant,
  icons,
  useBuildSchema,
  useValidations,
} from 'core'
import { styles } from './newCatalogStyles'
import { DataCatalog } from 'modules/catalogMotifs/types'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { JSONConfigurations, noNumbers } from 'modules/users/utils'
import { useContext, useEffect, useState } from 'react'
import { UpdateCatalogue, addCatalogue } from 'core/services'
import { useTranslation } from 'react-i18next'
import { errorCodes } from 'core/locale/es/errorCodes'
import { CatalogType } from 'core/enum/catalogTypes'

type TemplateNewCatalog = {
  edit: boolean
  type: number
  dataCatalog: DataCatalog
  onSubmitSuccess: () => void
}
interface FormData {
  name: string
  catalogueTypeId: number
  description: string
  values: { value: string }[]
}

export const NewCatalog: React.FC<TemplateNewCatalog> = ({
  edit,
  type,
  dataCatalog,
  onSubmitSuccess,
}) => {
  const [loading, setLoading] = useState(false)
  const { requiredString, requiredArray /* requiredNumber */ } = useValidations()
  const { buildSchema } = useBuildSchema()
  const { setActMessage } = useContext(AppContext)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      catalogueTypeId: dataCatalog.catalogueTypeId,
      name: dataCatalog.name,
    },
    resolver: zodResolver(
      z.object({
        ...buildSchema(JSONConfigurations),
        name: requiredString(t('catalogMotifs.validation.name')),
        values: requiredArray(t('catalogMotifs.validation.lenght')),
      }),
    ),
  })
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'values',
  })
  useEffect(() => {
    if (dataCatalog && dataCatalog.subcategories) {
      dataCatalog.subcategories.forEach((value, index) => {
        update(index, { value })
      })
    }
  }, []) //eslint-disable-line

  const formatValue = (value: string) => {
    const withoutSpacesStartAndEnd = value.trim()
    const withOnlyOneSpaceBetweenWords = withoutSpacesStartAndEnd.replace(/\s+/g, ' ')
    return withOnlyOneSpaceBetweenWords.toLowerCase()
  }

  const handleAddValue = (value: string) => {
    const trimmedValue = formatValue(value)
    const normalizedFields = fields.map((field) => formatValue(field.value))

    if (!normalizedFields.includes(trimmedValue)) {
      append({ value: value })
    } else {
      setActMessage({ type: Variant.error, message: t('catalogMotifs.validation.repite') })
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    const body = {
      name: data.name,
      catalogueTypeId: type,

      subcategories: data.values.map((item) => item.value),
    }
    const operation = edit ? UpdateCatalogue(dataCatalog.id, body) : addCatalogue(body)
    const message = edit
      ? `catalogMotifs.snackbar.successfulEdition`
      : `catalogMotifs.snackbar.successfulAdd`

    const res = await operation

    if (res.data) {
      onSubmitSuccess()
      setActMessage({
        type: Variant.success,
        message: t(message, { name: data.name }),
      })
    }
    const value =
      type === CatalogType.Catalog
        ? t('catalogMotifs.validation.catalog')
        : t('catalogMotifs.validation.list')
    if (res.error) {
      if (res?.error?.errors?.code === 'C01CARS01') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01CARS01,
        })
      } else if (res?.error?.errors?.code === 'C01CASE01') {
        setActMessage({
          type: Variant.error,
          code: res?.error?.errors?.code,
          elementInsertError: res?.error?.errors?.invalids
            .map((invalid) => invalid.name)
            .join(', '),
        })
      } else if (res?.error?.errors?.code === 'C01CARS08') {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01CARS08,
        })
      } else if (
        res?.error?.errors?.code === 'C01CARS02' ||
        res?.error?.errors?.code === 'C01CARS05'
      ) {
        setActMessage({
          type: Variant.error,
          message: errorCodes.C01CARS05.replace('{{value}}', value),
        })
      } else {
        setActMessage({
          type: Variant.error,
          message: t('authentication.alertError'),
        })
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {type === CatalogType.Catalog && (
          <GeneralTitle sx={styles.container}>
            {!edit ? t('catalogMotifs.catalogNewTitle') : t('catalogMotifs.edit')}
          </GeneralTitle>
        )}
        {type === CatalogType.List && (
          <GeneralTitle sx={styles.container}>
            {!edit ? t('catalogMotifs.listNewTitle') : t('catalogMotifs.editList')}
          </GeneralTitle>
        )}
        <Typography lineHeight={1.3} sx={styles.text}>
          {type === CatalogType.Catalog ? t('catalogMotifs.detail') : t('catalogMotifs.detailList')}
        </Typography>
      </Box>
      <Box sx={styles.containerInput}>
        <InputRoot
          {...register('name', {
            required: true,
          })}
          label={
            type === CatalogType.Catalog
              ? t('catalogMotifs.catalogName')
              : t('catalogMotifs.listName')
          }
          defaultValue={dataCatalog.name ?? ''}
          helperText={errors.name?.message}
          error={!!errors.name?.message}
          disabled={dataCatalog.isLocked}
          fullWidth
          inputProps={{ maxLength: 75 }}
          onInput={noNumbers}
        />
      </Box>

      <Box sx={styles.container}>
        <Typography lineHeight={1.3} sx={styles.text}>
          {type === CatalogType.Catalog
            ? t('catalogMotifs.catalogValue')
            : t('catalogMotifs.listValue')}
        </Typography>
        <Box sx={styles.pad}>
          <InputAdd
            {...register('description')}
            label={t('catalogMotifs.description')}
            error={!!errors.values?.message}
            helperText={errors.values?.message}
            inputProps={{ maxLength: 75 }}
            onAdd={(value) => handleAddValue(value)}
          />
        </Box>
        <Box sx={styles.heightChip}>
          {fields.map((field, index) => (
            <Chip
              key={field.id}
              label={field.value}
              onDelete={() => remove(index)}
              sx={styles.chipStyle}
              deleteIcon={icons.close}
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
      <Tooltip title={fields.length < 1 ? t('catalogMotifs.catalogLenght') : ''}>
        <Box sx={styles.btnAling}>
          <Button type="submit" color="secondary" sx={styles.btn} disabled={loading}>
            Guardar
          </Button>
        </Box>
      </Tooltip>
    </form>
  )
}
