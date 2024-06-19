import { Box, Typography, Grid, styled } from '@mui/material'
import { CapitalIconButton, ErrorMessage, InputFile, InputRoot, createId } from 'core'
import { useTranslation } from 'react-i18next'
import { styles } from './styles'
import { FieldValues, useForm, useFormContext } from 'react-hook-form'
import { CardFiles } from '../cardFiles'
import { useAWS } from 'core/hooks'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EventConfigurationContext } from '../../context'
import { AddCircleOutlined as AddIcon } from '@mui/icons-material'

export type fileArray = {
  url: string
  description: string
  name: string
  id: number
}

export const RightSide: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { eventCongReducer } = useContext(EventConfigurationContext)
  const { idEvent } = eventCongReducer
  const [disabled, setDisabled] = useState(true)
  const {
    formState: { errors: errorsOutside },
    setValue: setValueOutside,
    getValues: getValuesOutside,
    watch: watchOutside,
    clearErrors,
  } = useFormContext()
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>()
  const { deleteObject } = useAWS()

  const onSubmit = (data: FieldValues) => {
    const nameDoc = data?.doc?.split('/')?.pop()
    setValueOutside('files', [
      ...(getValuesOutside('files') ?? []),
      { url: data.doc, description: data.docDes, name: nameDoc, id: createId() },
    ])
    clearErrors('files')
    reset()
  }

  const deleteFile = async (url: string, id: number) => {
    await deleteObject({ Key: url })
    setValueOutside(
      'files',
      getValuesOutside('files').filter((file: fileArray) => file.id !== id),
    )
  }
  const StyledAddIcon = styled(AddIcon)(() => ({
    fontSize: '30px',
  }))

  useEffect(() => {
    if (watch('doc')) setDisabled(false)
    else setDisabled(true)
  }, [watch('doc'), watch('docDes')]) // eslint-disable-line

  return (
    <Box sx={styles.container}>
      <Typography variant="h1">{t('eventAndCalendar.titles.attachDocuments')}</Typography>
      <Box sx={styles.formContainer}>
        <Grid container spacing={2}>
          <Grid item xs={10} xl={10.8}>
            <InputRoot
              {...register('docDes')}
              label={t('eventAndCalendar.inputs.docDes')}
              helperText={
                watch('docDes')?.length === 65
                  ? 'El límite máximo es de 65 caracteres'
                  : (errors.docDes?.message as string)
              }
              inputProps={{ maxLength: 65 }}
              placeholder={t('eventAndCalendar.inputs.placeHolder.docDes')}
              error={!!errors.docDes}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} xl={10.8}>
            <InputFile
              outside={{
                controlOutside: control,
                setValueOutside: setValue,
                getValuesOutside: getValues,
                setErrorOutside: setError,
                watchOutside: watch,
              }}
              inputProps={{
                name: 'doc',
                label: t('eventAndCalendar.inputs.doc') + ' *',
                placeholder: t('eventAndCalendar.inputs.placeHolder.doc'),
                error: !!errors.doc,
                helperText: errors.doc?.message as string,
                value: watch('doc'),
              }}
            />
          </Grid>
          <Grid item xs={1} sx={{ alignContent: 'center' }}>
            <CapitalIconButton
              title={t('general.toolTip.add')}
              color="primary"
              disabled={disabled || !!(idEvent && !id)}
              onClick={handleSubmit(onSubmit)}
            >
              <StyledAddIcon />
            </CapitalIconButton>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Typography variant="h2" marginBottom={'8px'}>
          {t('eventAndCalendar.titles.attachedDocuments')}
        </Typography>

        {watchOutside('files')?.length > 0 ? (
          <Box sx={styles.containerScroll}>
            {watchOutside('files')?.map((file: fileArray, index: number) => (
              <CardFiles
                key={index}
                description={file.description}
                url={file.url}
                name={file.name}
                id={file.id}
                deleteFile={deleteFile}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="grayText">{t('eventAndCalendar.texts.noFiles')}</Typography>
        )}
      </Box>
      <ErrorMessage message={errorsOutside.files?.message as string} />
    </Box>
  )
}
