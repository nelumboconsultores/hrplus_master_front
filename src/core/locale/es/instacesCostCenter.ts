export const instancesCostCenter = {
  view: {
    title: 'Centros de Costos',
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
    status: {
      active: 'Activo',
      inactive: 'Inactivo',
    },
    notifications: {
      changeStatus: 'El centro de costos ha sido {{status}}',
      changeStatusError: 'No se ha podido cambiar el estatus del centro de costos',
      deleteSuccess: 'El centro de costos ha sido eliminado',
      deleteError: 'No se ha podido eliminar el centro de costos',
      deleteTitle: 'Eliminar Centro de Costos',
      deleteMessage: '¿Está seguro que desea eliminar el centro de costos?',
      error: 'Error en la creación del registro',
      createError: 'No se ha podido crear el centro de costos',
      changeStatusErrorAct:
        'No es posible eliminar un centro de costos que se encuentra en estado activo',
    },
  },
  creation: {
    title: {
      generalInformation: 'Información General',
      geographicalStructure: 'Estructura Geográfica',
      organizationalStructure: 'Estructura Organizativa',
      geographicalStructureLevel: 'Nivel en la Estructura Geográfica',
      organizationalStructureLevel: 'Nivel en la Estructura Organizativa',
      newCostCenter: 'Nuevo Centro de Costos',
      editCostCenter: 'Editar Centro de Costos',
    },
    notifications: {
      editSuccess: 'El centro de costos ha sido editado',
      editError: 'No se ha podido editar el centro de costos',
      createSuccess: 'El centro de costos ha sido creado',
      createError: 'No se ha podido crear el centro de costos',
    },
    label: {
      city: 'Municipio',
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
