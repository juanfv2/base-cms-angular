const baseFrontEnd = 'admin'
const baseBackEnd = ''
const sBaseBackEnd = `${baseBackEnd}`

export const routes = {
  /* -------------------------------------------------------------------------- */
  /* System                                                                     */
  /* -------------------------------------------------------------------------- */
  login: 'login',
  logout: 'logout',
  roles: 'roles',
  users: 'users',
  people: 'people',
  accounts: 'accounts',
  permissions: 'permissions',
  /* -------------------------------------------------------------------------- */
  /* Countries                                                                  */
  /* -------------------------------------------------------------------------- */
  countries: 'countries',
  regions: 'regions',
  cities: 'cities',

  frontEnd: {
    name: baseFrontEnd,
    root: `/${baseFrontEnd}/`,
  },
  backEnd: {
    name: baseBackEnd,
    root: `${sBaseBackEnd}/`,
    sRoot: `${sBaseBackEnd}`,
    assets: `${sBaseBackEnd}/assets/`,
  },
  api: 'api/',
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
