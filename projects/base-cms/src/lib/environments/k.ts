import {routes} from '../resources/resources'

export const k: any = {
  project_name: 'project_name',
  path: {
    root: 1,
    company: 2,
    country: 3,
    dev: 4,
  },
  expireTimeOut: 15,
  expireTime: 3,
  expire: 0,

  user: 1,
  user_role_id: 2,
  user_id: 3,

  company: 4,
  company_name: 5,

  entityGlobal: 6,
  entityGlobalId: 7,
  entityGlobalK: 'r-country',

  isSidebarVisible: 8,
  isSidebarVisibleOpen: 1,
  isSidebarVisibleClose: 0,

  role: 9,
  token: 10,
  permissions: 11,
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
  routes: routes,
  rolesAdmins: [] as never[],
  rolesClients: [] as never[],
}
