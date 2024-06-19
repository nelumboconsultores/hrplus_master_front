import { Box, Button, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material'
import { AppContext, BaseModal, InputAutocomplete, Variant, icons } from 'core'
import { useContext, useEffect, useMemo, useState } from 'react'
import { TemplateTextBlockProps } from '../../types/componentsMap'
import { styles } from './textCatalogue'
import { useTranslation } from 'react-i18next'
import { catalogTime } from 'modules/incidents/enum/catalogTime'
import { getCatalogueIncidents, solicitationCatalog } from 'core/services/incidents'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBuildSchema, useValidations } from 'core'
import { JSONConfigurations } from 'modules/users/utils'

type Lists = {
  value: number
  label: string
}

interface FormData {
  select: number
}

export const TextCatalogue: React.FC<TemplateTextBlockProps> = ({
  title,
  urlType,
  options,
  solicitationCatalogid,
  column,
  keys,
  url,
}) => {
  const [open, setOpen] = useState(false)
  const { setActMessage } = useContext(AppContext)
  const [isCatalog, setIsCatalog] = useState(false)
  const { t } = useTranslation()
  const { optionalString } = useValidations()
  const { buildSchema } = useBuildSchema()
  const [succes, setSucces] = useState(false)
  const [list, setList] = useState<Lists[]>([])
  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { select: options?.id },
    resolver: zodResolver(
      z.object({
        ...buildSchema(JSONConfigurations),
        select: optionalString(),
      }),
    ),
  })
  const keyExists = (key: string | undefined, array: string[]) => {
    return array.some((item) => item === key)
  }

  const getIncidents = async () => {
    setSucces(true)
    const { data: resp, error } = await getCatalogueIncidents(url ?? '')
    if (resp) {
      const contentData = resp.data.map((item) => {
        return {
          value: item.id,
          label: item.name ?? '',
        }
      })
      setList(contentData)
    }
    if (error) {
      setActMessage({ type: Variant.error, message: t('incidents.modal.error') })
    }
    setSucces(false)
  }

  useEffect(() => {
    const keyExistsInCatalogTime = keyExists(keys, catalogTime)

    if (keyExistsInCatalogTime) {
      setIsCatalog(true)
    }
  }, []) //eslint-disable-line

  const handleOptions = async () => {
    setOpen(true)
    if (list.length === 0) {
      await getIncidents()
    }
  }

  const handleUpdate = async () => {
    const value = getValues('select')

    const body = {
      id: value,
      column: column,
    }
    if (solicitationCatalogid && urlType) {
      const response = await solicitationCatalog(solicitationCatalogid, urlType, body)

      if (response.data) {
        const selectedOption = list?.find((option) => option.value === value)
        if (selectedOption) {
          if (options) {
            options.name = selectedOption.label
          } else {
            const newOptions = {
              id: selectedOption.value,
              name: selectedOption.label,
            }
            setValue('select', newOptions.id)
          }
        }
        setActMessage({ type: Variant.success, message: t('incidents.update') })
      }
      if (response.error) {
        if (response.error.errors.code === 'C01SLCT01') {
          setActMessage({
            type: Variant.error,
            code: response.error.errors.code,
          })
        } else {
          setActMessage({ type: Variant.error, message: t('incidents.modal.error') })
        }
      }
    }

    setOpen(false)
  }

  const selectedValues = useMemo(
    () => list?.find((v) => v.value === getValues('select')),
    [getValues('select'), list],
  )

  return (
    <Box>
      <Typography sx={styles.title}>{title}</Typography>
      <Grid container>
        <Grid item xs={8} md={8} lg={10} xl={9}>
          <Paper sx={styles.paper}>
            <Typography lineHeight={1.3} sx={styles.catalogue}>
              {isCatalog ? t('incidents.detail.time') : t('incidents.detail.catalog')}
            </Typography>
            <Typography lineHeight={1.3} sx={styles.descrip}>
              {options?.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2} md={2} lg={2} xl={2}>
          <IconButton sx={styles.iconColor} onClick={handleOptions}>
            {icons.edit}
          </IconButton>
        </Grid>
      </Grid>
      <BaseModal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Box sx={styles.padSelec}>
          <Typography lineHeight={1.3} sx={styles.type}>
            {!isCatalog
              ? t('incidents.modal.catalogSelection')
              : t('incidents.modal.timeSelection')}
          </Typography>
          <Typography lineHeight={1.3} sx={styles.subTitle}>
            {t('incidents.modal.catalogSelectionMotifs', {
              element: title,
              type: !isCatalog
                ? t('incidents.modal.theCatalogMotifs')
                : t('incidents.modal.theDate'),
            })}
          </Typography>
          {succes ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            list?.length > 0 && (
              <Box sx={styles.inputPad}>
                <InputAutocomplete
                  {...register('select')}
                  control={control}
                  name="select"
                  disableClearable
                  options={list}
                  label={!isCatalog ? t('catalogMotifs.title') : t('incidents.modal.theDateLabel')}
                  helpertext={errors.select?.message}
                  value={selectedValues}
                />
              </Box>
            )
          )}

          <Button sx={styles.btn} onClick={handleUpdate} disabled={!watch('select')}>
            {t('incidents.modal.apply')}
          </Button>
        </Box>
      </BaseModal>
    </Box>
  )
}
