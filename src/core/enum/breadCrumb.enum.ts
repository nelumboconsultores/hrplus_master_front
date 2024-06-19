import { PathName } from '.'

export const breadcrumbNameMap: { [key: string]: string } = {
  '/': 'Inicio',
  '/buscar-usuario': 'Búsqueda de Usuarios',
  '/usuarios/buscar-usuario': 'Gestión de Usuarios y Grupos',
  '/incidencias': 'Catálogo de Incidencias',
  '/incidencias/detalle': 'Detalle de Incidencias',
  '/jornadas-de-trabajo': 'Jornadas de Trabajo',
  '/catalogos-de-motivos': 'Catálogos de Motivos',
  '/listas-desplegables': 'Listas Desplegables',
  '/jornadas-de-trabajo/nuevo-horario': 'Nueva Jornada',
  '/jornadas-de-trabajo/editar-horario': 'Editar Jornada',
  '/localizacion': 'Localización',
  '/localizacion/actualizar-localizacion': 'Actualizar Localización',
  '/niveles-operativos': 'Niveles de Operación',
  '/niveles-operativos/nuevo-nivel': 'Nuevo Nivel',
  [PathName.employeeStructure]: 'Definición de Estructura de Datos',
  [PathName.dataStructureRelationshipConfiguration]:
    'Configuración de Relaciones entre Estructuras',
  [PathName.UserStructure]: 'Definición de Estructura de Datos',
  [PathName.employeeStructureWeighting]: 'Ponderar Secciones de Ficha de Colaborador',

  //-------------------Eventos--------------------
  [PathName.EventsAndCalendar]: 'Calendario y Eventos',
  [PathName.eventDescription]: 'Configuración de Evento',
  //----------------------------------------------
  '/estructura-de-la-compania/empresa': 'Definición de Estructura de Datos',
  '/estructura-de-la-compania/esquema-geografico': 'Esquema de Operación',
  '/estructura-de-la-compania/esquema-geografico/gestion-de-niveles': 'Niveles de gestión',
  '/estructura-de-la-compania/esquema-geografico/gestion-de-niveles/lista-de-niveles-operativos':
    'Lista de Niveles de Gestión',
  '/estructura-de-la-compania/esquema-geografico/gerarquia-de-niveles/estructura':
    'Jerarquía de Niveles',
  '/estructura-de-la-compania/esquema-geografico/gestion-de-niveles/crear-nivel-operativo':
    'Creación de Registros',
  '/estructura-de-la-compania/esquema-geografico/creacion-de-registros/formulario':
    'Formulario de Nivel de Gestión',
  '/estructura-de-la-compania/esquema-geografico/gestion-de-niveles/editar-nivel-operativo':
    'Editar Nivel de Gestión',
  '/company-structure/operating-schema/creation-records/new-instance': 'Nueva Instancia',
  '/gestionar-organizacion': 'Gestionar Organización',
  [PathName.listDataCreation]: 'Estructura Geográfica',
  [PathName.costCenterView]: 'Centro de Costos',
  [PathName.cashBenefitsView]: 'Tabulador',
  [PathName.storesView]: 'Sucursales',
  [PathName.jobTitlesView]: 'Cargos',
  [PathName.positionsView]: 'Puestos',
  [PathName.taxesCategoriesView]: 'Categoría de Puestos',

  //gestion de organizacion
  [PathName.instanceCostCenterView]: 'Centro de Costos',
  [PathName.instanceCashBenefitsView]: 'Tabulador',
  [PathName.instanceStoresView]: 'Sucursales',
  [PathName.instanceJobTitlesView]: 'Cargos',
  [PathName.instancePositionsView]: 'Puestos',
  [PathName.instanceTaxesCategoriesView]: 'Categoría de Puestos',
  [PathName.listOrganizationalStructure]: 'Estructura organizativa',
  //creacion de instancia
  [PathName.instanceCostCenterCreation]: 'Creación de Centro de Costos',
  [PathName.instanceCashBenefitsCreation]: 'Creación de Tabulador',
  [PathName.instanceStoresCreation]: 'Creación de Sucursales',
  [PathName.instanceJobTitlesCreation]: 'Creación de Cargos',
  [PathName.instancePositionsCreation]: 'Creación de Puestos',
  [PathName.instanceTaxesCategoriesCreation]: 'Creación de Categoría de Puestos',
  //edicion de instancia
  [PathName.instanceCostCenterEdit]: 'Edición de Centro de Costos',
  [PathName.instanceCashBenefitsEdit]: 'Edición de Tabulador',
  [PathName.instanceStoresEdit]: 'Edición de Sucursales',
  [PathName.instanceJobTitlesEdit]: 'Edición de Cargos',
  [PathName.instancePositionsEdit]: 'Edición de Puestos',
  [PathName.instanceTaxesCategoriesEdit]: 'Edición de Categoría de Puestos',

  //detalle
  [PathName.instanceCostCenterDetail]: 'Detalle de Centro de Costos',
  [PathName.instancePositionsDetail]: 'Detalle de Puestos',
  [PathName.instanceStoresDetail]: 'Detalle de Sucursales',
  [PathName.instanceTaxesCategoriesDetail]: 'Detalle de Categoría de Puestos',
  [PathName.instanceCashBenefitsDetail]: 'Detalle de Tabulador',
  [PathName.instanceJobTitlesDetail]: 'Detalle de Cargos',

  //intancias estructura de perfil
  [PathName.personalInformation]: 'Información Personal',
  [PathName.biographicalInformation]: 'Información Biográfica',
  [PathName.personalData]: 'Datos Personales',
  [PathName.identifyDocument]: 'Documentos de Identificación Personal',
  [PathName.address]: 'Dirección',
  [PathName.contactInformation]: 'Información Contacto',
  [PathName.educationInformation]: 'Información Educativa',
  [PathName.emergencyContact]: 'Contacto de Emergencia',
  [PathName.dependents]: 'Dependientes',
  [PathName.jobInformation]: 'Información Puesto',
  [PathName.payrollInformation]: 'Información Nómina',
  [PathName.compensation]: 'Compensaciones',
  [PathName.workHistory]: 'Registro Laboral',
  [PathName.paymentInformation]: 'Información Pago',
  [PathName.humanCapital]: 'Capital Humano',
  [PathName.workSchedule]: 'Jornada',
  [PathName.documents]: 'Documentos',

  //colaboradores
  [PathName.contributorsModule]: 'Colaboradores',
  [PathName.contributorsListDetail]: 'Detalle de Colaborador',
  [PathName.contributorsCreate]: 'Crear Colaborador',
  [PathName.contributorsEdit]: 'Editar Colaborador',
}
