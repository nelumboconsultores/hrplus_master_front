import { ProfileModulesIds, ProfilePageKeyword, PathName } from 'core'

export const pageTitle: Record<number | string, string> = {
  [ProfileModulesIds.PersonalInformation]: 'dinamicModels.personalInformation.title',
  [ProfileModulesIds.BiographicalInformation]: 'dinamicModels.biographicalInformation.title',
  [ProfileModulesIds.PersonalData]: 'dinamicModels.personalData.title',
  [ProfileModulesIds.IdentifyDocument]: 'dinamicModels.identifyDocument.title',
  [ProfileModulesIds.Address]: 'dinamicModels.address.title',
  [ProfileModulesIds.ContactInformation]: 'dinamicModels.contactInformation.title',
  [ProfileModulesIds.EducationInformation]: 'dinamicModels.educationInformation.title',
  [ProfileModulesIds.EmergencyContact]: 'dinamicModels.emergencyContact.title',
  [ProfileModulesIds.Dependents]: 'dinamicModels.dependents.title',
  [ProfileModulesIds.JobInformation]: 'dinamicModels.jobInformation.title',
  [ProfileModulesIds.PayrollInformation]: 'dinamicModels.payrollInformation.title',
  [ProfileModulesIds.Compensation]: 'dinamicModels.compensation.title',
  [ProfileModulesIds.WorkHistory]: 'dinamicModels.workHistory.title',
  [ProfileModulesIds.PaymentInformation]: 'dinamicModels.paymentInformation.title',
  [ProfileModulesIds.HumanCapital]: 'dinamicModels.humanCapital.title',
  //[ProfileModulesIds.WorkSchedule]: 'dinamicModels.workSchedule.title',
  [ProfileModulesIds.Documents]: 'dinamicModels.documents.title',
}

export const pageFinishMessage: Record<string, string> = {
  [ProfilePageKeyword[ProfileModulesIds.PersonalInformation]]:
    'dinamicModels.personalInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.BiographicalInformation]]:
    'dinamicModels.biographicalInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.PersonalData]]: 'dinamicModels.personalData.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.IdentifyDocument]]:
    'dinamicModels.identifyDocument.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.Address]]: 'dinamicModels.address.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.ContactInformation]]:
    'dinamicModels.contactInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.EducationInformation]]:
    'dinamicModels.educationInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.EmergencyContact]]:
    'dinamicModels.emergencyContact.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.Dependents]]: 'dinamicModels.dependents.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.JobInformation]]:
    'dinamicModels.jobInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.PayrollInformation]]:
    'dinamicModels.payrollInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.Compensation]]: 'dinamicModels.compensation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.WorkHistory]]: 'dinamicModels.workHistory.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.PaymentInformation]]:
    'dinamicModels.paymentInformation.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.HumanCapital]]: 'dinamicModels.humanCapital.finishMessage',
  // [ProfilePageKeyword[ProfileModulesIds.WorkSchedule]]: 'dinamicModels.workSchedule.finishMessage',
  [ProfilePageKeyword[ProfileModulesIds.Documents]]: 'dinamicModels.documents.finishMessage',
}

export const pageBreadCrumbs: Record<number | string, string> = {
  [ProfileModulesIds.PersonalInformation]: PathName.personalInformation,
  [ProfileModulesIds.BiographicalInformation]: PathName.biographicalInformation,
  [ProfileModulesIds.PersonalData]: PathName.personalData,
  [ProfileModulesIds.IdentifyDocument]: PathName.identifyDocument,
  [ProfileModulesIds.Address]: PathName.address,
  [ProfileModulesIds.ContactInformation]: PathName.contactInformation,
  [ProfileModulesIds.EducationInformation]: PathName.educationInformation,
  [ProfileModulesIds.EmergencyContact]: PathName.emergencyContact,
  [ProfileModulesIds.Dependents]: PathName.dependents,
  [ProfileModulesIds.JobInformation]: PathName.jobInformation,
  [ProfileModulesIds.PayrollInformation]: PathName.payrollInformation,
  [ProfileModulesIds.Compensation]: PathName.compensation,
  [ProfileModulesIds.WorkHistory]: PathName.workHistory,
  [ProfileModulesIds.PaymentInformation]: PathName.paymentInformation,
  [ProfileModulesIds.HumanCapital]: PathName.humanCapital,
  // [ProfileModulesIds.WorkSchedule]: PathName.workSchedule,
  [ProfileModulesIds.Documents]: PathName.documents,
}
