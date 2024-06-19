export const instancesPositions = {
  view: {
    title: 'Puestos',
    inputs: {
      code: 'Código',
      denomination: 'Denominación',
      costCenterStatusId: 'Estatus',
      search: 'Buscar',
    },

    columns: {
      registerDate: 'Fecha de Registro',
      code: 'Código',
      denomination: 'Denominación',
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
    notifications: {
      changeStatus: 'El puesto ha sido {{status}}',
      changeStatusError: 'No se ha podido cambiar el estatus del puesto',
      deleteSuccess: 'El puesto ha sido eliminado',
      deleteError: 'No se ha podido eliminar el puesto',
      deleteTitle: 'Eliminar puesto',
      deleteMessage: '¿Está seguro que desea eliminar el puesto?',
      error: 'Error en la creación del registro',
      createError: 'No se ha podido crear el puesto',
      changeStatusErrorAct: 'No es posible eliminar un puesto que se encuentra en estado activo',
    },
    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },
  },
  creation: {
    title: {
      generalInformation: 'Información General',
      geographicalStructure: 'Estructura Geográfica',
      organizationalStructure: 'Estructura Organizativa',
      geographicalStructureLevel: 'Nivel en la Estructura Geográfica',
      organizationalStructureLevel: 'Nivel en la Estructura Organizativa',
      newCostCenter: 'Nuevo Puesto',
      editCostCenter: 'Editar Puesto',
    },
    notifications: {
      editSuccess: 'El puesto ha sido editado',
      editError: 'No se ha podido editar el puesto',
      createSuccess: 'El puestos ha sido creado',
      createError: 'No se ha podido crear el puesto',
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
      code: 'Código',
      denomination: 'Denominación',
      status: 'Estatus',
      createdAt: 'Fecha de Registro',
    },
  },
}
