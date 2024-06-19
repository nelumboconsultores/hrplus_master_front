export const operatingLevel = {
  title: {
    operatingLevel: 'Niveles Geográficos',
    organizationalLevel: 'Niveles Organizacionales', // New key
    createRecordsSalesHierarchy:
      'Para crear registros de la estructura comercial debes confirmar la jerarquía de niveles',
  },
  table: {
    id: 'Id',
    name: 'Nombre de la Entidad / Nivel',
    recordCount: 'Subniveles Asociados',
    associatedRecords: 'Cantidad de Registros',
    actions: 'Acciones',
    add_edit: 'Agregar/editar campos',
    listFields: 'Lista de campos',
    noFields: 'No hay campos agregados',
    date: 'Fecha de Registro',
  },
  instructions: {
    addFieldTypesInformationAssociateLevelYourOperationalStructure:
      'Agrega los tipos de campo e información que desea asociar a este nivel de tu Estructura Geográfica ',
  },
  input: {
    newLevelEntity: 'Nuevo Nivel / Entidad *',
    editLevelEntity: 'Editar Nivel / Entidad *',
    required: 'Obligatorio',
    allowMultipleSections: 'Permite agregar varios registros',
    unique: 'Único',
    fieldType: 'Tipo de campo *',
    descriptiveName: 'Nombre de la etiqueta *',
    enterLabelNameThisField: 'Nombre de la etiqueta',
    lowerLimit: 'Lím. Inferior *',
    upperLimit: 'Lím. Superior',
    catalogueReason: 'Listas desplegables *',
    rangeTime: 'Rango de tiempo',
    currentDate: 'Fecha actual',
    typeFile: 'Tipo de archivo *',
    maxSize: 'Tamaño máximo (MB)*',
    maxSizeFile: 'Tamaño máximo (MB)',
    levelsRequired: 'Niveles requeridos',
  },
  button: {
    addFields: 'Agregar campo',
    save: 'Guardar',
    finish: 'Finalizar',
    letsStart: 'COMENCEMOS',
    add: 'AGREGAR',
    confirm: 'CONFIRMAR',
    continue: 'CONTINUAR',
  },
  modals: {
    finishedOperationalStructure: 'Definición de Estructura Geográfica',
    finishedOrganizationalStructure: 'Definición de Estructura Organizativa', // New key
    removeTitle: 'Eliminar jerarquía',
    removeDescription:
      '¿Está seguro que desea eliminar el nivel agregado? Una vez eliminado se perderán los nodos asociados.',
    saveHierarchyDescriptionOrg:
      '¿Esta seguro que desea confirmar y finalizar la creación de la estructura organizativa? Al hacerlo no podrá realizar más cambios.',
    saveHierarchyDescriptionGeo:
      '¿Esta seguro que desea confirmar y finalizar la creación de la estructura geográfica? Al hacerlo no podrá realizar más cambios.',

    theOperationalStructure:
      'La Estructura Geográfica no ha sido creada. Vamos a comenzar creando el primer nivel de la estructura.',
    theOrganizationalStructure:
      'La Estructura Organizativa no ha sido creada. Vamos a comenzar creando el primer nivel de la estructura.',
    title: 'Eliminar Nivel',
    subtitle: '¿Estás seguro que deseas eliminar este nivel / entidad?',
    creationOperationalStructure: 'Creación de Estructura Geográfica',
    creationOrganizationalStructure: 'Creación de Estructura Organizativa', // New key
    deleteEntity: 'Eliminar Nivel / Entidad',
    changedMultipleStatusSuccess: 'Estado cambiado correctamente',
    changedMultipleStatusError: 'Error al cambiar el estado',
  },
  message: {
    selectLevel: 'Seleccionar el siguiente nivel',
    selectLevelMain: 'Seleccionar el nivel principal',
    success: 'Nivel creado correctamente',
    error: 'Error al crear el nivel',
    errorDelete: 'Error al eliminar el nivel',
    noHierarchy: 'Para guardar la jerarquía se necesita de un nivel principal y un sub-nivel.',
    edit: 'Nivel editado correctamente',
    successDelete: 'Nivel eliminado correctamente',
    successSaveHierarchy: 'La jerarquía se guardó correctamente',
    successFinaledHierarchy: 'La Estructura Geográfica se finalizó correctamente',
    successFinaledHierarchyOrganizational: 'La Estructura Organizativa se finalizó correctamente',
    finallyDescription: 'Dale a continuar para ir a la pantalla de creacion de registros.',
    couldNotBeFinalized: 'No se pudo finalizar la jerarquía',
    thereAreNotStructureData:
      'Para generar el resumen de jerarquía debes agregar al menos una estructura de datos.',
    noData: 'No hay datos para mostrar',
  },
  error: {
    field: 'el campo',
  },
}
