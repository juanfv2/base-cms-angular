/* -------------------------------------------------------------------------- */
/* user                                                                       */
/* -------------------------------------------------------------------------- */

export interface User {
  id?: number
  name: string
  email: string
  password: string
  email_verified_at: any
  disabled: boolean
  userCanDownload: boolean
  phoneNumber: string
  uid: string
  token: string
  remember_token: string
  role_id: number
  company_id: number
  group_id: number

  photo: XFile
  person: Person
  account: Account
  roleName: string // mt1
  role: Role
  roles: Role[]
  countryName: string // mt1
  country: Country
  regionName: string // mt1
  region: Region
  cityName: string // mt1
  city: City
}

export interface Role {
  id?: number
  name: string
  description: string
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  deleted_at: string
  // many-to-many
  permissions: Permission[]

  // customs:
  length: number
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

export interface Person {
  id?: number
  firstName: string
  lastName: string
  cellPhone: string
  birthDate: any
  address: string
  neighborhood: string
  user_id: number
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  deleted_at: string
  userName: string // mt1
  user: User
}

export interface Account {
  id?: number
  firstName: string
  lastName: string
  cellPhone: string
  birthDate: any
  address: string
  neighborhood: string
  imei: string
  user_id: number
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  deleted_at: string
  userName: string // mt1
  user: User
}
/* -------------------------------------------------------------------------- */
/* country                                                                    */
/* -------------------------------------------------------------------------- */

export interface Country {
  id?: number
  name: string
  code: string
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  userName: string // 1tm
  users: User[]
  cityName: string // 1tm
  cities: City[]
  regionName: string // 1tm
  regions: Region[]
}

export interface Region {
  id?: number
  name: string
  code: string
  country_id: number
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  countryName: string // mt1
  country: Country
  userName: string // 1tm
  users: User[]
  cityName: string // 1tm
  cities: City[]
}

export interface City {
  id?: number
  name: string
  latitude: string
  longitude: string
  country_id: number
  region_id: number
  createdBy: number
  updatedBy: number
  created_at: string
  updated_at: string
  countryName: string // mt1
  country: Country
  regionName: string // mt1
  region: Region
  authUserName: string // 1tm
  users: User[]
}
