import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { styles } from './styles'
import { FieldTypeEnumSelect, icons } from 'core'
import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd'
import { useContext, useState } from 'react'
import { useServices } from 'modules/dataStructure/modules/companyStructure/hooks'
import { DynamicFieldsDADProps } from 'modules/dataStructure/modules/companyStructure/types'
import { FormOrgContext } from 'modules/dataStructure/provider'
import {
  rangeDatesEnum,
  valueGeoOptions,
} from 'modules/dataStructure/modules/companyStructure/enums'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from 'core/utils/textFormat'

export const DynamicFieldsDAD = <T extends Record<string, any>>(
  props: DynamicFieldsDADProps<T>,
) => {
  const { fields, setFields, click, serviceEdit, removeActions } = props
  const { catReasonsOptions, setLoading, loading } = useContext(FormOrgContext)
  const { connectService } = useServices()
  const { t } = useTranslation()
  const [auxFields, setAuxFields] = useState<T[]>(fields)
  const returnValidations = (type: FieldTypeEnumSelect, field: T) => {
    switch (type) {
      case FieldTypeEnumSelect.date:
      case FieldTypeEnumSelect.date:
        const rangeTimeText = rangeDatesEnum[field.rangeTime]
          ? `Fecha, ${rangeDatesEnum[field.rangeTime]}`
          : ''
        const upperLimitText = field?.max_date !== undefined ? `Max. ${field.max_date}` : ''
        const separator = rangeTimeText && upperLimitText ? ', ' : ''
        return `${rangeTimeText}${separator}${upperLimitText}`
      case FieldTypeEnumSelect.number:
        return `Min. ${field?.min_value ?? '-'} - Max. ${field?.max_value ?? '-'},`
      case FieldTypeEnumSelect.text:
        return ` Min.  ${field?.minLength ?? '-'} - Max. ${field?.maxLength ?? '-'} caracteres,`
      case FieldTypeEnumSelect.catalog:
        return `Lista desplegable: ${
          catReasonsOptions.find((v) => v.value === field?.catalogueId)?.label ?? '-'
        },`
      case FieldTypeEnumSelect.hour:
        return `Min. ${field?.min_time ?? '-'} - Max. ${field?.max_time ?? '-'},`
      case FieldTypeEnumSelect.currency:
        return `Min. ${formatCurrency(Number(field?.lowerMoney))} - Max. ${formatCurrency(
          Number(field?.upperMoney),
        )}`
      case FieldTypeEnumSelect.file:
        const fileType = field?.fileType?.toString().toUpperCase().replace('[', '').replace(']', '')
        return `Tipo de archivo: ${fileType}, Max. ${field?.max_size} MB`
      case FieldTypeEnumSelect.geographic_location:
        return `Ubicación geográfica: ${valueGeoOptions[field.depth]},`
      default:
        return ''
    }
  }
  const changeOrder = async (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    setLoading(true)
    if (source.index === destination.index && source.droppableId === destination.droppableId) return
    const field = fields[source.index]
    const body = {
      name: field?.name,
      fieldTypeId: field?.type,
      validations: {
        required: field?.required,
        unique: field?.unique,
        max_chars: field?.maxLength,
        min_chars: field?.minLength,
        ...(!!field.depth && { depth: field?.depth }),
        ...(!!field.max_size && { max_size: field.max_size }),
        ...(!!field.fileType && { file_type: field.fileType }),
        ...(!!field.min_time && { min_time: field.min_time }),
        ...(!!field.max_time && { max_time: field.max_time }),
        ...(!!field.min_value && { min_value: field.min_value }),
        ...(!!field.max_value && { max_value: field.max_value }),
        ...(!!field.lowerMoney && { min_currency: field.lowerMoney }),
        ...(!!field.upperMoney && { max_currency: field.upperMoney }),
        ...(!!field.rangeTime && { max_range: field.rangeTime }),
        ...(!!field.max_date && { max_date: field.max_date }),
      },
      visible: field.visible,
      newPosition: destination?.index,
      ...(field?.catalogueId && { catalogueId: field?.catalogueId }),
    }
    setFields((prevTasks: T[]) => {
      const result = [...prevTasks]
      const [removed] = result.splice(source.index, 1)
      result.splice(destination.index, 0, removed)
      const newResult = result.map((item, index) => ({ ...item, newPosition: index }))
      return newResult
    })
    const response = await connectService(
      { path: serviceEdit.path.replace('${fieldId}', field.id.toString()), type: serviceEdit.type },
      body,
    )
    if (response.data) setAuxFields(fields)
    if (response.error) setFields(auxFields)
    setLoading(false)
  }

  return (
    <DragDropContext onDragEnd={(result) => changeOrder(result)}>
      <Droppable droppableId="tasks">
        {(droppableProvided) => (
          <Box
            {...droppableProvided.droppableProps}
            ref={droppableProvided.innerRef}
            className="task-container"
            sx={styles.container}
          >
            {fields.map((task, index) => (
              <Draggable key={task.id} draggableId={task?.id?.toString()} index={index}>
                {(draggableProvided) => (
                  <Paper
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                    sx={styles.paper}
                    elevation={3}
                  >
                    <Grid container justifyContent={'space-between'} wrap="nowrap">
                      <Grid item sx={{ flexGrow: 1 }}>
                        <Box sx={styles.title}>
                          {!removeActions?.sort && (
                            <IconButton sx={styles.icon} {...draggableProvided.dragHandleProps}>
                              {icons?.dragIndicator}
                            </IconButton>
                          )}
                          <Typography
                            sx={styles.textTitle}
                            className={removeActions?.sort ? 'noSort' : ''}
                          >
                            {task?.label ?? task?.name}
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item sx={styles.lastGrid}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Typography sx={styles.general}>
                            {returnValidations(task.type, task)}
                          </Typography>
                          <Typography sx={styles.optional}>
                            {task?.required ? 'Obligatorio,' : 'Opcional,'}
                          </Typography>
                          <Typography sx={styles.only}>
                            {task?.unique ? 'Único' : 'No único'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                          {!removeActions?.edit && !task.locked && (
                            <Tooltip title={t('general.toolTip.edit')}>
                              <IconButton
                                sx={styles.edit}
                                onClick={() => click.edit(task.id)}
                                disabled={loading}
                              >
                                {icons?.edit}
                              </IconButton>
                            </Tooltip>
                          )}
                          {!removeActions?.view && !task.locked && (
                            <Tooltip
                              title={t(
                                task.visible ? 'general.toolTip.hidden' : 'general.toolTip.visible',
                              )}
                            >
                              <IconButton
                                sx={{ color: task.visible ? 'primary.main' : 'error.main' }}
                                onClick={() => click.view(task.id)}
                                disabled={loading}
                              >
                                {task.visible ? icons?.visibility : icons?.VisibilityOff}
                              </IconButton>
                            </Tooltip>
                          )}
                          {!removeActions?.delete && !task.used && (
                            <Tooltip title={t('general.toolTip.delete')}>
                              <IconButton
                                sx={styles.remove}
                                onClick={() => click.remove(task.id)}
                                disabled={loading}
                              >
                                {icons?.close}
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}
