import { PathName } from 'core'

export enum NavLinksEnum {
  operating_schema = PathName.listGeographicalStructure,
  organizational_schema = PathName.listOrganizationalStr,
  cost_center = PathName.costCenter,
  position_categories = PathName.taxesCategories,
  cash_benefits = PathName.cashBenefits,
  stores = PathName.stores,
  positions = PathName.positions,
  job_titles = PathName.jobTitles,
}
