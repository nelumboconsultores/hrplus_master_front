export enum ProfileModulesIds {
  PersonalInformation = 1,
  BiographicalInformation = 2,
  PersonalData = 3,
  IdentifyDocument = 4,
  Address = 5,
  ContactInformation = 6,
  EducationInformation = 7,
  EmergencyContact = 8,
  Dependents = 9,
  JobInformation = 10,
  PayrollInformation = 11,
  Compensation = 12,
  WorkHistory = 13,
  PaymentInformation = 14,
  HumanCapital = 15,
  // WorkSchedule = 16,
  Documents = 16,
}

export const ProfilePageKeyword: Record<number | string, string> = {
  [ProfileModulesIds.PersonalInformation]: 'PSPI01', // Información personal
  [ProfileModulesIds.BiographicalInformation]: 'PSBI02', // Información biográfica
  [ProfileModulesIds.PersonalData]: 'PSPD03', // Datos personales
  [ProfileModulesIds.IdentifyDocument]: 'PSID04', // Documentos de Identificación Personal
  [ProfileModulesIds.Address]: 'PSAS05', // Dirección
  [ProfileModulesIds.ContactInformation]: 'PSCI06', // Información Contacto
  [ProfileModulesIds.EducationInformation]: 'PSEI07', // Información educativa
  [ProfileModulesIds.EmergencyContact]: 'PSEC08', // Contacto de emergencia
  [ProfileModulesIds.Dependents]: 'PSDP09', // Dependientes
  [ProfileModulesIds.JobInformation]: 'PSJI10', // Información Puesto
  [ProfileModulesIds.PayrollInformation]: 'PSPN11', // Información Nómina
  [ProfileModulesIds.Compensation]: 'PSCT12', // Compensaciones
  [ProfileModulesIds.WorkHistory]: 'PSWH13', // Registro Laboral
  [ProfileModulesIds.PaymentInformation]: 'PSPM14', // Información Pago
  [ProfileModulesIds.HumanCapital]: 'PSHC15', // Capital humano
  //[ProfileModulesIds.WorkSchedule]: 'PSWS16', // Jornada
  [ProfileModulesIds.Documents]: 'PSDC17', // Documentos
}
