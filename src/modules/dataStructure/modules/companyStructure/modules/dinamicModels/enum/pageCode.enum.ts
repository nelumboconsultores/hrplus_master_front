import { ModulesIds, PageKeyword, PathName } from 'core'

export const pageTitle: Record<number | string, string> = {
  [ModulesIds.CostCenter]: 'dinamicModels.costCenter.title',
  [ModulesIds.TaxesCategories]: 'dinamicModels.taxesCategories.title',
  [ModulesIds.Tabs]: 'dinamicModels.cashBenefits.title',
  [ModulesIds.stores]: 'dinamicModels.stores.title',
  [ModulesIds.positions]: 'dinamicModels.positions.title',
  [ModulesIds.jobTitles]: 'dinamicModels.jobTitles.title',
}

export const pageFinishMessage: Record<string, string> = {
  [PageKeyword[ModulesIds.CostCenter]]: 'dinamicModels.costCenter.finishMessage',
  [PageKeyword[ModulesIds.TaxesCategories]]: 'dinamicModels.taxesCategories.finishMessage',
  [PageKeyword[ModulesIds.Tabs]]: 'dinamicModels.cashBenefits.finishMessage',
  [PageKeyword[ModulesIds.stores]]: 'dinamicModels.stores.finishMessage',
  [PageKeyword[ModulesIds.positions]]: 'dinamicModels.positions.finishMessage',
  [PageKeyword[ModulesIds.jobTitles]]: 'dinamicModels.jobTitles.finishMessage',
}

export const pageBreadCrumbs: Record<number | string, string> = {
  [ModulesIds.CostCenter]: PathName.costCenterView,
  [ModulesIds.TaxesCategories]: PathName.taxesCategoriesView,
  [ModulesIds.Tabs]: PathName.cashBenefitsView,
  [ModulesIds.stores]: PathName.storesView,
  [ModulesIds.positions]: PathName.positionsView,
  [ModulesIds.jobTitles]: PathName.jobTitlesView,
}
