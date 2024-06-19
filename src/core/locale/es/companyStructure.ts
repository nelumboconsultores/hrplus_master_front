export const companyStructure = {
  title: {
    weightingSectionsOfTheCollaboratorFile: 'Ponderar Secciones de Ficha de Colaborador',
    configRelationshipsBetweenStructures: 'Configuración de relaciones entre estructuras',
  },
  input: {
    weighting: 'Ponderación *',
  },
  validations: {
    theSumPercentagesMustBe: 'La suma de los porcentajes debe ser 100',
    fieldsMustCompletedBeforeConfigurationSaved:
      'Debes completar los campos antes de guardar la configuración',
  },

  messages: {
    theConfigurationHasBeenSavedSuccessfully: 'La configuración se ha guardado correctamente',
    errorSavingConfiguration: 'Error al guardar la configuración',
  },
  links: {
    configRelationships: 'Configurar relaciones con estructuras',
  },
  button: {
    save: 'Guardar',
    cancel: 'Cancelar',
  },
  error: {
    errorSavingConfiguration: 'Error al guardar la configuración en {{type}}',
  },
  toolTip: {
    notPossibleToDisable:
      'No es posible deshabilitar, la selección del primer nivel es obligatoria',
  },
}
