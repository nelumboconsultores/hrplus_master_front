import { useContext, useEffect, useState, useRef } from 'react'
import {
  Box,
  MenuItem,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import { HexColorPicker } from 'react-colorful'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { BaseModal } from '../modals'
import { styled } from '@mui/system'
import { useTranslation } from 'react-i18next'
import { SelectChangeEvent } from '@mui/material/Select'
import { styles } from './styles'
import { DropdownColorProps } from 'core/types/dropdownColorProps'
import { useServices } from 'core/hooks/useServices'
import { errorCodes } from 'core/locale/es/errorCodes'
import { Variant } from 'core/enum'
import { AppContext } from 'core/context'
import { GetEventTypesResponse } from 'modules/eventAndCalendar/service/types'
import { Controller } from 'react-hook-form'
import { ErrorMessage } from '../errorMessage'

interface EventType {
  id?: number
  name: string
  color: string
}

const CustomHexColorPicker = styled(HexColorPicker)({
  '& .react-colorful__pointer': {
    width: '24px',
    height: '24px',
  },
  '& .react-colorful__saturation-pointer': {
    width: '24px',
    height: '24px',
  },
  '& .react-colorful__saturation': {
    borderBottom: '0px solid #000',
    borderRadius: '20px',
  },
  '& .react-colorful__last-control': {
    marginTop: '22px',
    borderRadius: '20px',
  },
})

const newEventStyle = {
  backgroundColor: '#f0f0f0',
  '&:hover': {
    backgroundColor: '#d0d0d0',
  },
}

export const DropdownColorComponent: React.FC<DropdownColorProps> = (props) => {
  const {
    services,
    controlProps,
    selectProps,
    isFestivo,
    required,
    defaultValue,
    onEventTypeChange,
  } = props
  const { connectService } = useServices()
  const { setActMessage } = useContext(AppContext)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editEvent, setEditEvent] = useState<EventType | null>(null)
  const [eventName, setEventName] = useState<string>('')
  const [eventColor, setEventColor] = useState<string>('#ffffff')
  const [errorName, setErrorName] = useState<string>('')
  const [helperText, setHelperText] = useState<string>('')
  const [menuDirection, setMenuDirection] = useState<'bottom' | 'top'>('bottom')

  const { t } = useTranslation()
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    getEvent()
    updateMenuDirection()
  }, []) //eslint-disable-line

  const getEvent = async () => {
    const { data: resp, error } = await connectService<GetEventTypesResponse>(services.getAll)
    if (resp?.data) {
      if (Array.isArray(resp.data)) {
        const modifiedData = resp.data
          .filter((eventType: EventType) => !(isFestivo && eventType.id === 1))
          .map((eventType: EventType) => ({
            ...eventType,
            color: `#${eventType.color}`,
          }))

        setEventTypes(modifiedData)
      }
    }
    if (error) {
      if (error?.errors?.code) {
        const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
        setActMessage({
          message: errorCode,
          type: Variant.error,
        })
      } else {
        setActMessage({
          message: t('general.validations.errorService'),
          type: Variant.error,
        })
      }
    }
  }

  const updateMenuDirection = () => {
    const selectElement = selectRef.current
    if (selectElement) {
      const rect = selectElement.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      if (spaceBelow < 224 && spaceAbove > spaceBelow) {
        setMenuDirection('top')
      } else {
        setMenuDirection('bottom')
      }
    }
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event?.target?.value
    if (value === 'new') {
      handleNewEvent()
      return undefined
    } else return value
  }

  const handleNewEvent = () => {
    setEditEvent(null)
    setEventName('')
    setEventColor('#ffffff')
    setOpenModal(true)
  }

  const handleEditEvent = (eventType: EventType) => {
    setEditEvent(eventType)
    setEventName(eventType.name)
    setEventColor(eventType.color)
    setOpenModal(true)
  }

  const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEventName(value)
    if (value.length === 30) {
      setHelperText('El límite máximo es 30 caracteres')
    } else {
      setHelperText('')
    }
  }

  const handleSave = async () => {
    setLoading(true)
    const eventColorWithoutHash = eventColor.startsWith('#') ? eventColor.slice(1) : eventColor

    setErrorName('')
    let isValid = true
    if (!eventName.trim()) {
      setErrorName(t('general.validations.requiredEvent'))
      isValid = false
    }

    if (!isValid) {
      setLoading(false)
      return
    }

    if (editEvent) {
      const { data: resp, error } = await connectService<GetEventTypesResponse>(
        {
          path: services.edit.path.replace('{keyword}', String(editEvent.id)),
          type: services.edit.type,
        },
        {
          name: eventName,
          color: eventColorWithoutHash,
        },
      )
      if (resp) {
        getEvent()
        setActMessage({
          type: Variant.success,
          message: t('eventAndCalendar.eventType.editEvent'),
        })
      }
      if (error) {
        if (error?.errors?.code) {
          const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
          setActMessage({
            message: errorCode,
            type: Variant.error,
          })
        } else {
          setActMessage({
            message: t('general.validations.errorService'),
            type: Variant.error,
          })
        }
      }
      setLoading(false)
    } else {
      const newEvent = { name: eventName, color: eventColorWithoutHash }
      const { data: resp, error } = await connectService<GetEventTypesResponse>(
        services.create,
        newEvent,
      )

      if (resp) {
        if (defaultValue) {
          if ('id' in resp.data && onEventTypeChange) {
            onEventTypeChange(resp?.data?.id)
          }
        }

        getEvent()
        setActMessage({
          message: t('eventAndCalendar.eventType.newEvents'),
          type: Variant.success,
        })
      }
      if (error) {
        if (error?.errors?.code) {
          const errorCode = errorCodes[(error?.errors.code ?? '') as keyof typeof errorCodes]
          setActMessage({
            message: errorCode,
            type: Variant.error,
          })
        } else {
          setActMessage({
            message: t('general.validations.errorService'),
            type: Variant.error,
          })
        }
      }
      setLoading(false)
    }
    setOpenModal(false)
  }

  return (
    <Controller
      {...controlProps}
      render={({ field: { name, onChange, value, ref } }) => {
        return (
          <Box>
            <FormControl fullWidth variant="outlined">
              <InputLabel>
                {required
                  ? t('general.dropdownColor.typeEvent') + '*'
                  : t('general.dropdownColor.typeEvent')}
              </InputLabel>
              <Select
                {...selectProps}
                ref={(el) => {
                  ref(el)
                  selectRef.current = el as HTMLDivElement
                }}
                name={name}
                value={value ?? selectProps?.value ?? ''}
                onChange={(e) => {
                  updateMenuDirection()
                  onChange(handleChange(e))
                }}
                label={t('general.dropdownColor.typeEvent')}
                displayEmpty
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      marginBottom: menuDirection === 'top' ? '40px' : '0px',
                    },
                  },
                  anchorOrigin: {
                    vertical: menuDirection,
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: menuDirection === 'bottom' ? 'top' : 'bottom',
                    horizontal: 'left',
                  },
                }}
                renderValue={(selected) => {
                  if (!selected) return <em></em>
                  return eventTypes.find((eventType) => eventType.id === selected)?.name
                }}
              >
                <MenuItem value="new" sx={newEventStyle}>
                  <ListItemText primary={t('general.dropdownColor.newEvent')} />
                </MenuItem>
                {eventTypes.map((eventType) => (
                  <MenuItem key={eventType.id} value={eventType.id} sx={styles.menuItem}>
                    <ListItemText primary={eventType.name} sx={{ marginRight: '10px' }} />
                    <Box sx={styles.listItem}>
                      <Box
                        sx={{
                          ...styles.container,
                          backgroundColor: eventType.color,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditEvent(eventType)
                        }}
                      >
                        <CreateOutlinedIcon
                          className="edit-icon"
                          fontSize="small"
                          sx={styles.createIcon}
                        />
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <BaseModal
              open={openModal}
              onClose={() => setOpenModal(false)}
              width={370}
              borderRadius={2}
            >
              <Box sx={styles.modalContainer}>
                <Typography sx={styles.titleModal}>
                  {editEvent
                    ? t('general.dropdownColor.editEvent')
                    : t('general.dropdownColor.newEvent')}
                </Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  label={t('general.dropdownColor.typeEvent') + ' *'}
                  fullWidth
                  variant="outlined"
                  value={eventName}
                  onChange={handleEventNameChange}
                  error={!!errorName}
                  helperText={helperText || errorName}
                  inputProps={{ maxLength: 30 }}
                />
                <Typography sx={styles.subTitleModal}>
                  {t('general.dropdownColor.newColor')}
                </Typography>
                <CustomHexColorPicker
                  color={eventColor}
                  onChange={setEventColor}
                  style={{ width: '100%' }}
                />
                <Box sx={styles.boxModal}>
                  <Box
                    sx={{
                      ...styles.btnRadioModal,
                      background: `${eventColor}`,
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#fff',
                        paddingLeft: '3px',
                        paddingTop: '1px',
                        fontSize: '14px',
                      }}
                    >
                      Aa
                    </Typography>
                  </Box>
                  <Typography sx={styles.hex}>{t('general.dropdownColor.hex')}</Typography>
                  <Typography sx={styles.colorText}> {eventColor}</Typography>
                </Box>
                <Box sx={styles.btns}>
                  <Button variant="text" onClick={() => setOpenModal(false)} sx={styles.btnCancel}>
                    {t('general.button.cancel')}
                  </Button>
                  <Button
                    variant="text"
                    onClick={handleSave}
                    disabled={loading}
                    sx={styles.btnSave}
                  >
                    {t('general.button.save')}
                  </Button>
                </Box>
              </Box>
            </BaseModal>
            <ErrorMessage message={selectProps?.helpertext as string} />
          </Box>
        )
      }}
    />
  )
}
