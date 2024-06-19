import { MenuMainItemsType, PathName, icons } from 'core'
import { ServicesKeys } from 'core/enum/routerEnum'
/* import hat from '../../../core/assets/hat.svg'
import { CheckCard } from '../components' */

export const ListMenu: MenuMainItemsType[] = [
  {
    icon: { img: icons.settings, color: '#0062FF' },
    name: 'Definición de Estructura de Datos',
    url: PathName.DataStructure,
    permissions: [ServicesKeys.Settings],
  },
  {
    icon: { img: icons.listAlt, color: '#9F31F6' },
    name: 'Gestionar Organización',
    url: PathName.organizationManagement,
    permissions: [ServicesKeys.Settings],
  },
  {
    icon: { img: icons.accessTime, color: '#9F31F6' },
    name: 'Jornadas de Trabajo',
    url: PathName.WorkingDays,
    permissions: [ServicesKeys.WorkPeriods],
  },
  {
    icon: { img: icons.fmdGood, color: '#7D2A4E' },
    name: 'Localización',
    url: PathName.LocationView,
  },
  {
    icon: { img: icons.calendarToday, color: '#2A7977' },
    name: 'Calendario y Eventos',
    url: PathName.EventsAndCalendar,
    permissions: [ServicesKeys.EventDate],
  },
  {
    icon: { img: icons.catalogs, color: '#9F31F6' },
    name: 'Catálogos de Motivos',
    url: PathName.CatalogMotifsView + '1',
    permissions: [ServicesKeys.Catalogs],
  },
  {
    icon: { img: icons.formatList, color: '#0062ff' },
    name: 'Listas Desplegables',
    url: PathName.CatalogOtherView + '2',
    permissions: [ServicesKeys.Catalogs],
  },
  {
    icon: { img: icons.feed, color: '#EC6666' },
    name: 'Tipos de Incidencias',
    url: PathName.IncidentsView,
    permissions: [ServicesKeys.SolicitationCatalogs],
  },
  {
    icon: { img: icons.switchAccount, color: '#31C462' },
    name: 'Colaboradores',
    url: PathName.contributorsModule,
    //  permissions: [ServicesKeys.SolicitationCatalogs],
  },
  /* {
    icon: { img: icons.bell, color: '#31C462' },
    name: 'ALERTAS Y MENSAJERÍA',
    url: '#',
  }, */
  /*  {
    url: '#',
    render: () => <CheckCard />,
  },
  {
    icon: { img: icons.brush, color: '#0062FF' },
    name: 'PERSONALIZACIÓN VISUAL',
    url: '#',
  },
  {
    icon: { img: <img src={hat} alt="check" />, color: '#9F31F6' },
    name: 'VER TUTORIAL',
    url: '#',
  }, */
]
