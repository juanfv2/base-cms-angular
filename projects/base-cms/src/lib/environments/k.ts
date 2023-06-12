import {exportFileTypes, routes} from '../resources/resources'

export const k: any = {
  project_name: 'project_name',
  path: {
    root: 0,
    company: 1,
    country: 2,
    dev: 3,
  },
  expireTimeOut: 15,
  expireTime: 3,
  expire: 0,

  _1_user: 1,
  _2_user_role_id: 2,
  _3_user_id: 3,

  _4_company: 4,
  _5_company_name: 5,

  _6_entityGlobal: 6,
  _7_entityGlobalId: 7,
  entityOriginK: 'r-origin',
  entityGlobalK: 'r-country',
  entityGlobalV: '--',

  _8_isSideBarVisible: 8,

  _9_role: 9,
  _10_token: 10,
  _11_permissions: 11,
  _12_entityGlobalTimeZone: 12,
  _13_entityGlobalTimeZoneStr: 13,
  canReceiveNotifications: '/reports/files',

  dev: 'dev',
  sentry: '',
  authorizationK: 'Authorization',
  versionK: 'r-version',
  versionV: 'd-2022_10_21T21_02_27_002Z',
  suggestions: 'suggestions.',
  registers: 'registers.',
  operatorOptions: [
    {label: 'Y', value: 'AND'},
    {label: 'O', value: 'OR'},
  ],
  conditionalOptions: [
    {label: 'Igual', value: '='},
    {label: 'No Igual', value: '!='},
    {label: 'Similar', value: 'like'},
    {label: 'Mayor', value: '>'},
    {label: 'Menor', value: '<'},
    {label: 'Mayor o igual', value: '>='},
    {label: 'Menor o igual', value: '<='},
  ],
  conditionalOptionsWithFile: [
    {label: 'Contener', value: '='},
    {label: 'Contenga Similares', value: 'like'},
  ],
  routes: routes,
  rolesAdmins: [] as never[],
  rolesClients: [] as never[],
  exportFileTypes: exportFileTypes,
}
