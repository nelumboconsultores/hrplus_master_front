import { InputRootProps } from 'core/types'
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { Box, Icon, IconButton, InputAdornment, TextField } from '@mui/material'
import { useAWS } from 'core/hooks'
import { ChangeEvent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { icons, containsDot } from 'core/utils'

type InputFileProps = {
  outside: {
    controlOutside: Control<FieldValues>
    setErrorOutside: UseFormSetError<FieldValues>
    setValueOutside: UseFormSetValue<FieldValues>
    getValuesOutside: UseFormGetValues<FieldValues>
    watchOutside: UseFormWatch<FieldValues>
  }
  inputProps?: InputRootProps
  controlProps?: Omit<ControllerProps, 'render' | 'control' | 'name'>
  validations?: {
    required?: boolean
    max_size?: number
    file_type?: string
  }
}
export const InputFile: React.FC<InputFileProps> = ({
  inputProps,
  controlProps,
  validations,
  outside,
}) => {
  const { controlOutside, setErrorOutside, setValueOutside, watchOutside, getValuesOutside } =
    outside ?? {}
  const { t } = useTranslation()
  const { uploadObject, deleteObject } = useAWS()
  const fileRef = useRef(null)

  const validateFile = (value: File) => {
    const fileExtension = value?.name?.split('.')?.pop()?.toLowerCase()
    const weightInMB = value?.size / (1024 * 1024)

    if (validations?.required && !value)
      return t('general.validations.requiredName', { name: inputProps?.label })

    if (value) {
      if (validations?.max_size && weightInMB > validations?.max_size) {
        return t('validations.maxSize', { size: validations?.max_size })
      }
      if (
        fileExtension &&
        validations?.file_type &&
        !validations?.file_type.includes(fileExtension)
      ) {
        return t('validations.fileType', { type: validations?.file_type })
      }
    }

    return true
  }
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const isValid = validateFile(file)

    if (isValid !== true) {
      if (setErrorOutside) {
        setErrorOutside(inputProps?.name ?? '', {
          message: isValid,
        })
      }

      return
    }
    const fileName = `${file?.name}`.replace(/ /g, '_')

    const params = {
      Key: fileName,
      Body: file,
    }
    if (inputProps?.name && watchOutside(inputProps?.name)) await deleteOldImage()

    const link = await uploadObject(params)
    if (!link) return

    return link
  }

  const deleteOldImage = async () => {
    const isGetValue = watchOutside
    if (!inputProps?.name || !isGetValue(inputProps.name)) return Promise.resolve()
    const key = isGetValue(inputProps.name)?.split('/').pop()
    return deleteObject({ Key: key ?? '' })
  }
  return (
    <Box width={'100%'}>
      <Controller
        {...controlProps}
        control={controlOutside ?? controlOutside}
        name={inputProps?.name ?? ''}
        rules={{
          required: {
            value: validations?.required ?? false,
            message: t('general.validations.requiredName', { name: inputProps?.label }),
          },
        }}
        render={({ field: { value, onChange, ...fields } }) => (
          <input
            {...fields}
            type="file"
            ref={fileRef}
            value={value?.fileName ?? undefined}
            style={{ display: 'none' }}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              if (event.target instanceof HTMLInputElement) {
                handleFileChange(event as React.ChangeEvent<HTMLInputElement>).then((res) => {
                  if (!res) return
                  onChange(res)
                })
              }
            }}
          />
        )}
      />

      <TextField
        {...inputProps}
        fullWidth
        sx={{ ...inputProps?.sx }}
        onClick={() => {
          if (fileRef?.current) (fileRef?.current as HTMLElement)?.click()
        }}
        value={
          containsDot(getValuesOutside(inputProps?.name ?? ''))
            ? getValuesOutside(inputProps?.name ?? '')
                .split('/')
                .pop()
            : ''
        }
        InputProps={{
          readOnly: true,
          endAdornment: inputProps?.value ? (
            <InputAdornment position="end">
              <IconButton
                onClick={(e) => {
                  const key = inputProps?.value?.toString().split('/').pop()
                  if (key)
                    deleteObject({ Key: key }).then(() => {
                      setValueOutside(inputProps?.name ?? '', undefined)
                      if (fileRef?.current) (fileRef.current as HTMLInputElement).value = ''
                    })
                  e.stopPropagation()
                  e.preventDefault()
                }}
                sx={{
                  padding: 0,
                  backgroundColor: 'error.main',
                  '& :hover': {
                    borderRadius: '50%',
                    backgroundColor: 'error.dark',
                  },
                  color: 'white',
                  '& svg': {
                    width: '1.5rem',
                    height: '1.5rem',
                  },
                }}
              >
                {icons.Remove}
              </IconButton>
            </InputAdornment>
          ) : (
            <InputAdornment position="start">
              <Icon color="primary">{icons.CreateNewFolderOutlined}</Icon>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
}
