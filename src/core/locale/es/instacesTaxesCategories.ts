export const instancesTaxesCategories = {
  view: {
    title: 'Categoria de Puestos',
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
    status: {
      active: 'Activa',
      inactive: 'Inactiva',
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
      changeStatus: 'La categoría de puestos ha sido {{status}}',
      changeStatusError: 'No se ha podido cambiar el estatus de la categoría de puestos',
      changeStatusErrorAct:
        'No es posible eliminar una categoría de puestos que se encuentra en estado activo',
      deleteSuccess: 'La categoría de puestos ha sido eliminada',
      deleteError: 'No se ha podido eliminar la categoría de puestos',
      deleteTitle: 'Eliminar categoría de puestos',
      deleteMessage: '¿Está seguro que desea eliminar la categoría de puestos?',
      error: 'Error en la creación del registro',
      createError:
        'No se ha podido crear la categoría de puestos porque el código o denominación ya existe',
    },
  },
  creation: {
    title: {
      generalInformation: 'Información General',
      geographicalStructure: 'Estructura Geográfica',
      organizationalStructure: 'Estructura Organizativa',
      geographicalStructureLevel: 'Nivel en la Estructura Geográfica',
      organizationalStructureLevel: 'Nivel en la Estructura Organizativa',
      newCostCenter: 'Nueva Categoría de Puestos',
      editCostCenter: 'Editar Categoría de Puestos',
    },
    notifications: {
      editSuccess: 'La categoría de puestos ha sido editada',
      editError: 'No se ha podido editar la categoría de puestos',
      createSuccess: 'La categoría de puestos ha sido creada',
      createError:
        'No se ha podido crear la categoría de puestos porque el código o denominación ya existe',
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
