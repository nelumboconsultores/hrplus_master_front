import { icons } from 'core/utils'
import { PathName } from '.'
import { MenuItems, MenuMainItemsType } from 'core'
import { ServicesKeys } from './routerEnum'

export enum keyMenu {
  home = 'home',
  dashboard = 'dashboard',
  questionnaire = 'questionnaire',
  users = 'users',
  reports = 'reports',
  configuration = 'configuration',
}

export const menuEnum: MenuItems = {
  home: {
    icon: icons.home,
    name: 'Inicio',
    url: PathName.Home,
  },
  /*   dashboard: {
    icon: icons.barChart,
    name: 'Dashboard KPI',
    url: '#',
  },
  reports: {
    icon: icons.description,
    name: 'Reportes',
    url: '#',
  },
  questionnaire: {
    icon: icons.questionMark,
    name: 'Cuestionario',
    url: '#',
  }, */
  users: {
    icon: icons.peopleAlt,
    name: 'Usuarios',
    url: PathName.UsersView,
    permissions: [ServicesKeys.UserGroups, ServicesKeys.Users],
  },
}

export const menuArray: Array<MenuMainItemsType> = Object.values(menuEnum)
