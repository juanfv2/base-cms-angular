import {configs} from 'base-cms'
import {routes} from './routes'
import {roleAdmins as rolesAdmins, roleClients as rolesClients} from './resources'
const k0 = {
  sentry: 'https://b3fd2b0b5f8b4f5db584557c97146692@sentry.io/1283879',

  project_name: 'Safe Drive Admin',
  routes: routes,
  rolesAdmins: rolesAdmins,
  rolesClients: rolesClients,
  role_id_admin: 1,
  role_id_sub_admin: 2,
  role_id_driver: 3,
  role_id_customer: 4,
}
export const k = Object.assign(configs, k0)

// console.log('k', k)
