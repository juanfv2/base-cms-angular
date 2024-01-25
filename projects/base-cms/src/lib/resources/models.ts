/* -------------------------------------------------------------------------- */
/* User                                                                       */
/* -------------------------------------------------------------------------- */

export interface User {
  id?: number
  name: string
  email: string
  password: string
  email_verified_at: any
  disabled: boolean
  userCanDownload: boolean
  phone_number: string
  uid: string
  token: string
  remember_token: string
  role_id: number
  company_id: number
  group_id: number

  photo: XFile
  pdf: XFile
  person: Person
  account: Account
  roleName: string // mt1
  role: Role
  roles: Role[]

  countryName: string // mt1
  country: any // Country
  regionName: string // mt1
  region: Region
  cityName: string // mt1
  city: City
}

export interface Role {
  length: number
  id?: number
  name: string
  description: string
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  deleted_at: string
  // many-to-many
  permissions: any[]

  // customs:
  menus: Permission[]
  urlPermissions: string[]
  idsPermissions: number[]
}

export interface Permission {
  // Raw attributes
  id?: number
  icon?: string
  name?: string
  urlBackEnd?: string
  urlFrontEnd?: string
  isSection?: boolean
  isVisible?: boolean
  permission_id?: number
  orderInMenu?: number
  createdBy: number
  updatedBy: number

  // custom jfv
  subMenus?: Permission[]
  actions?: Permission[]
}

export interface Person {
  id?: number
  first_name: string
  last_name: string
  cell_phone: string
  birth_date: any
  address: string
  neighborhood: string
  dui: string
  dui_expiration_date: any
  user_id: number
  user: any
}

export interface Account {
  id?: number
  user_id: number
  area_id: number
  branch_id: number
  client_id: number
  first_name: string
  last_name: string
  job: string
  phone: string
  cell_phone: string
  birth_date: any
  address: string
  neighborhood: string
  dui: string
  for_notification_only: boolean
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  deleted_at: string
}

/* -------------------------------------------------------------------------- */
/* Country                                                                    */
/* -------------------------------------------------------------------------- */

export interface Country {
  id?: string
  name: string
  code: string
  authUserName: string // 1tm
  authUsers: User[]
  cityName: string // 1tm
  cities: City[]
  regionName: string // 1tm
  regions: Region[]
}

export interface Region {
  id?: string
  name: string
  code: string
  country_id: string
  countryName: string // mt1
  country: Country
  userName: string // 1tm
  users: User[]
  cityName: string // 1tm
  cities: City[]
}

export interface City {
  id?: string
  name: string
  latitude: string
  longitude: string
  country_id: string
  region_id: string
  countryName: string // mt1
  country: Country
  regionName: string // mt1
  region: Region
  authUserName: string // 1tm
  authUsers: User[]
}

/* -------------------------------------------------------------------------- */
/* Misc                                                                       */
/* -------------------------------------------------------------------------- */

export interface XFile {
  // Raw attributes
  id: number
  entity: string
  field: string
  entity_id?: any
  name: string
  nameOriginal: string
  extension: string
  publicPath: string
  data: any
  created_at: string
  updated_at: string
  colors: boolean
}
