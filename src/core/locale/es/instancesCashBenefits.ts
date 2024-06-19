export const instancesCashBenefits = {
  view: {
    title: 'Tabulador',
    inputs: {
      code: 'Nivel Macropay',
      denomination: 'Posición',
      costCenterStatusId: 'Estatus',
      search: 'Buscar',
    },

    columns: {
      registerDate: 'Fecha de Registro',
      code: 'Nivel Macropay',
      denomination: 'Posición',
      area: 'Área',
      subArea: 'Subárea',
      department: 'Departamento',
      status: 'Estatus',
    },
    actions: {
      clean: 'Limpiar Filtros',
      create: 'Nuevo',
      edit: 'Editar',
      delete: 'Eliminar',
      activate: 'Activar',
      deactivate: 'Desactivar',
    },
    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },
    notifications: {
      changeStatus: 'El tabulador ha sido {{status}}',
      changeStatusError: 'No se ha podido cambiar el estatus del tabulador',
      deleteSuccess: 'El tabulador ha sido eliminado',
      deleteError: 'No se ha podido eliminar el tabulador',
      deleteTitle: 'Eliminar tabulador',
      deleteMessage: '¿Está seguro que desea eliminar el tabulador?',
      error: 'Error en la creación del registro',
      createError: 'No se ha podido crear el tabulador',
      changeStatusErrorAct: 'No es posible eliminar un tabulador que se encuentra en estado activo',
    },
  },
  creation: {
    title: {
      generalInformation: 'Información General',
      geographicalStructure: 'Estructura Geográfica',
      organizationalStructure: 'Estructura Organizativa',
      geographicalStructureLevel: 'Nivel en la Estructura Geográfica',
      organizationalStructureLevel: 'Nivel en la Estructura Organizativa',
      newCostCenter: 'Nuevo Tabulador',
      editCostCenter: 'Editar Tabulador',
    },
    notifications: {
      editSuccess: 'El tabulador ha sido editado',
      editError: 'No se ha podido editar el tabulador',
      createSuccess: 'El tabulador ha sido creado',
      createError: 'No se ha podido crear el tabulador',
    },
    label: {
      city: 'Ciudad',
      country: 'País',
      state: 'Estado',
      status: 'Estatus',
    },
  },
  details: {
    labels: {
      code: 'Nivel Macropay',
      denomination: 'Posición',
      status: 'Estatus',
      createdAt: 'Fecha de Registro',
    },
  },
}
