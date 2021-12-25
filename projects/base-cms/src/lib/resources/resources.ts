const baseFrontEnd = 'stage/admin'
const baseBackEnd = 'stage'
const sBaseBackEnd = `/${baseBackEnd}`

export const routes = {
  countries: 'countries',
  regions: 'regions',
  cities: 'cities',


  frontEnd: {
    name: 'admin',
    root: '/admin/',
  },
  backEnd: {
    name: '',
    root: '/',
    sRoot: '',
    assets: `/storage/assets/`,
  },
  api: 'api/',
  auth: {
    login: 'login',
    logout: 'logout',
    roles: 'roles',
    users: 'users',
    accounts: 'accounts',
    permissions: 'permissions',
  },
  misc: {
    importCsv: 'import-csv',
    exportCsv: 'export-csv',
    file: 'file/',
    xFiles: 'x_files',
    seeder: 'seeder',
    subscribe: 'subscribe',
    bulkErrors: 'bulk_errors',
  },
}
