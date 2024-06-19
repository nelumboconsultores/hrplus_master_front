export const users = {
  organizationalStructure: 'Por Estructura Organizativa',
  title: {
    userSelection: 'Seleccción de Usuarios',
    userGroupManagement: 'Gestión de Usuarios y Grupos',
  },
  paragraph: {
    youMustSelectAtLeastOneGroup:
      'Debes seleccionar al menos un grupo, cargo o usuario al que deseas configurarle incidencias',
  },
  inputs: {
    byGroup: 'Por grupos',
    group: 'Grupo',
    sampleGroupName: 'Nombre de ejemplo del grupo',
    byRoles: 'Por roles',
    userRole: 'Rol de usuario',
    exampleRoleName: 'Nombre de ejemplo de rol',
    byUsers: 'Por usuarios',
    enterTheSearchValue: 'Ingresa el valor de búsqueda',
    search: 'Buscar',
  },
  button: {
    search: 'Buscar',
  },
  msg: {
    success: 'La asignación se realizó exitosamente',
    error: '',
    conflictError:
      'Se han detectado {{length}} conflictos, por favor confirme la selección de los registros a los que desea aplicar los cambios',
    messageConfirmation:
      '¿Está seguro que desea cambiar la jornada a estos {{length}} usuarios? Al hacerlo recibirán una   notificación con la información de dicho cambio.',
    messageConfirmationGroup: '¿Está seguro que desea asignar los grupos a todos los usuarios?',

    successfulConference: 'Se ha modificado la jornada a {{name}} para {{length}}',

    createGroupSuccess: 'Se ha creado el grupo exitosamente',
    errorStartDate: 'La fecha de inicio no puede ser menor a la fecha actual.',
    errorStartNextDate: 'La fecha de inicio debe ser posterior al día actual.',
    errorEndDate: 'La fecha de finalización debe ser igual o posterior a la fecha de inicio.',
    createGroupError: 'No se ha podido crear el grupo',
  },
  workingDay: {
    title: 'Gestionar Jornadas ',
    workingGroupTitle: 'Gestionar Grupos',
    subTitle: 'JORNADA DE TRABAJO',
    discription: 'Seleccione la jornada de trabajo que desea aplicar a los usuarios seleccionados',
    managmentGroups: 'GRUPOS DE USUARIOS',
    managmentGroupsDiscription:
      'Seleccione los grupos de usuarios que desea aplicar a los registros seleccionados',
  },
  tooltip: 'Debe seleccionar al menos un usuario de la lista',
  temporal: 'Tiempo Parcial',
  from: 'Desde',
  to: 'Hasta',
  description: '¿Esta seguro de querer actualizar la información?',
  dateRequired: 'La fecha es requerida',
}
