export const workingDays = {
  title: {
    WorkingDays: 'Jornadas de Trabajo',
    filters: 'Filtros',
    workDayShift: 'Jornada/Turno de Trabajo',
    selectTheWorking: 'Seleccione los días laborables de esta jornada',
    indicateTheTime: 'Indique los bloques horarios de esta jornada',
  },
  button: {
    newDay: 'NUEVO',
    finish: 'GUARDAR',
  },
  table: {
    descriptiveName: 'Nombre de la Jornada',
    scheduledShifts: 'Días y Horarios Laborales',
    associatedUsers: '# Usuarios Asociados',
    status: 'Estado',
    active: 'Activa',
    inactive: 'Inactiva',
    type: 'Tipo de Jornada',
  },
  snackbar: {
    delete: 'La jornada ha sido eliminada',
    update: 'Jornada actualizada exitosamente',
    act: 'La jornada ha sido activada',
    desc: 'La jornada ha sido desactivada',
    create: 'Jornada creada   exitosamente',
    couldNotEliminated: 'No se pudo eliminar la jornada',
    errorDelete: 'No es posible eliminar una jornada que se encuentra en estado activo',
  },
  subtitle: {
    workDayShift:
      'Configura los días de descanso y días laborales con los que vamos a interpretar la gestión de tu talento humano y operaciones.',
    youMustAddLeastOneWorking:
      ' Debes agregar al menos una jornada laboral para comenzar a usar la plataforma',
  },
  label: {
    workDayShift: 'Nombre descriptivo *',
    workDayShiftType: 'Tipo de jornada *',
    workPeriodMaxTime: 'Duración máxima del turno *',
    workDayMaxTime: 'Validación horas máx. p/día *',
    associatedUsers: ' # Usuarios asociados',
    status: 'Estado',
  },
  modal: {
    title: 'Eliminar jornada',
    subtitle: 'Está a punto de eliminar una jornada laboral. ¿Desea continuar?',
  },
  error: {
    repeated: 'No pueden existir choques en los horarios',
    workPeriod: 'El nombre de la jornada laboral ya existe',
    workTurn: 'El bloque de horario agregado ya existe',
    workPeriodsMaxDurationMaxDurationAlert:
      'Si reduce la duración máxima del turno, se eliminarán los turnos que excedan el límite, ¿Desea continuar?',
    workPeriodsMaxDurationMaxDurationDayAlert:
      'Si reduce la duración máxima de la horas, se eliminarán los turnos que excedan el límite, ¿Desea continuar?',
  },
  form: {
    name: 'Nombre de la jornada',
    daysOfWeek: 'Días laborales',
    statusWorkingDay: 'Estatus',
    dateFrom: 'Desde',
    dateTo: 'Hasta',
  },
}
