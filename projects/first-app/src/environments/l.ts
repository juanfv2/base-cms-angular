import {DBType, JfCondition} from 'base-cms'
import {k} from './k'

const assets = k.routes.backEnd.assets

export const l = {
  misc: {
    k: k,
    slug: new DBType('Slug', 'stores.slug', 'string'),
    csv: `${assets}images/admin/ic-csv.svg`,
    zip: `${assets}images/admin/ic-zip.svg`,
    pdf: `${assets}images/admin/ic-pdf.svg`,
    upload: `${assets}images/admin/ic-upload.svg`,
    loading: `${assets}images/admin/ic-loading.svg`,
    pageLimit: [
      new JfCondition('5', 5),
      new JfCondition('10', 10),
      new JfCondition('50', 50),
      new JfCondition('100', 100),
      new JfCondition('Todos', -1),
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* System                                                                     */
  /* -------------------------------------------------------------------------- */

  user: {
    tablePK: 'id',
    tableName: 'auth_users',

    ownName: 'Usuario',
    ownNamePlural: 'Usuarios',

    id: new DBType('#', 'auth_users.id', 'string'),
    name: new DBType('Nombre', 'auth_users.name', 'string'),
    email: new DBType('Correo electrónico', 'auth_users.email', 'string'),
    password: new DBType('Contraseña', 'auth_users.password', 'string', false),
    email_verified_at: new DBType('Correo electrónico verificado', 'auth_users.email_verified_at', 'date'),
    disabled: new DBType('Estado', 'auth_users.disabled', 'string'),
    phoneNumber: new DBType('Teléfono', 'auth_users.phoneNumber', 'string'),

    photo: new DBType('Foto', 'photo', 'object', false, false),
    pdf: new DBType('Documento (PDF)', 'pdf', 'object', false, false),

    country_id: new DBType(`País #`, 'auth_users.country_id', 'number'),
    countryName: new DBType(`País`, 'countryName', 'string', true, false),

    region_id: new DBType(`Region #`, 'auth_users.region_id', 'number'),
    regionName: new DBType(`Region`, 'regionName', 'string', true, false),

    city_id: new DBType(`Ciudad #`, 'auth_users.city_id', 'number'),
    cityName: new DBType(`Ciudad`, 'cityName', 'string', true, false),

    role_id: new DBType(`Rol #`, 'auth_users.role_id', 'number'),
    roleName: new DBType(`Rol`, 'roleName', 'string', true, false),

    account_id: new DBType(`Cuenta #`, 'account.user_id', 'number', false, false),
    accountName: new DBType(`Cuenta`, 'accountName', 'string', false, false),

    person_id: new DBType(`Persona #`, 'person.user_id', 'number', false, false),
    personName: new DBType(`Persona`, 'personName', 'string', false, false),
  },
  role: {
    tablePK: 'id',
    tableName: 'auth_roles',
    ownName: 'Rol',
    ownNamePlural: 'Roles',
    // Raw attributes
    id: new DBType('#', 'auth_roles.id', 'number'),
    name: new DBType('Nombre', 'auth_roles.name', 'string'),
    description: new DBType('Descripción', 'auth_roles.description', 'string'),
    permissions: new DBType('Permisos', 'auth_roles.permissions', 'string'),
  },
  permission: {
    tablePK: 'id',
    tableName: 'auth_permissions',
    ownName: 'Permiso',
    ownNamePlural: 'Permisos',
    // Raw attributes
    id: new DBType('#', 'auth_permissions.id', 'number'),
    icon: new DBType('Icono', 'auth_permissions.icon', 'string'),
    name: new DBType('Nombre', 'auth_permissions.name', 'string'),
    urlBackEnd: new DBType('Url Back End', 'auth_permissions.urlBackEnd', 'string'),
    urlFrontEnd: new DBType('Url Front End', 'auth_permissions.urlFrontEnd', 'string'),
    isSection: new DBType('Is Section?', 'auth_permissions.isSection', 'boolean'),
    isVisible: new DBType('Is Visible?', 'auth_permissions.isVisible', 'boolean'),
    permission_id: new DBType('Permission Id', 'auth_permissions.permission_id', 'number'),
    orderInMenu: new DBType('Order In Menu', 'auth_permissions.orderInMenu', 'number'),
  },
  person: {
    tablePK: 'id',
    tableName: 'auth_people',

    ownName: 'Persona',
    ownNamePlural: 'Personas',

    id: new DBType('#', 'auth_people.id', 'string'),
    firstName: new DBType('Nombre', 'auth_people.firstName', 'string'),
    lastName: new DBType('Apellido', 'auth_people.lastName', 'string'),
    cellPhone: new DBType('Celular', 'auth_people.cellPhone', 'string'),
    birthDate: new DBType('Fecha de nacimiento', 'auth_people.birthDate', 'date'),
    address: new DBType('Dirección', 'auth_people.address', 'string'),
    neighborhood: new DBType('Vecindario', 'auth_people.neighborhood', 'string'),
    dui: new DBType('Documento de identificación', 'people.dui', 'string'),
    dui_expiration_date: new DBType('Expiración', 'people.dui_expiration_date', 'date'),

    user_id: new DBType('User #', 'auth_people.user_id', 'number'),
  },
  account: {
    tablePK: 'id',
    tableName: 'auth_accounts',
    ownName: 'Cuenta',
    ownNamePlural: 'Cuentas',
    id: new DBType('#', 'accounts.id', 'number'),
    firstName: new DBType('Nombre', 'accounts.firstName', 'string'),
    lastName: new DBType('Apellido', 'accounts.lastName', 'string'),
    cellPhone: new DBType('Celular', 'accounts.cellPhone', 'string'),
    birthDate: new DBType('Fecha de cumpleaños', 'accounts.birthDate', 'date'),
    address: new DBType('Dirección', 'accounts.address', 'string'),
    neighborhood: new DBType('Vecindario', 'accounts.neighborhood', 'string'),
    imei: new DBType('IMEI', 'accounts.imei', 'string'),
    user_id: new DBType('User_Id', 'accounts.user_id', 'number'),
    createdBy: new DBType('Createdby', 'accounts.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'accounts.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'accounts.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'accounts.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'accounts.deleted_at', 'date'),

    // user_id: new DBType(`User #`, 'user.user_id', 'number'),
    userName: new DBType(`User`, 'userName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Countries                                                                  */
  /* -------------------------------------------------------------------------- */

  country: {
    tablePK: 'id',
    tableName: 'countries',
    ownName: 'País',
    ownNamePlural: 'Países',
    id: new DBType('#', 'countries.id', 'number'),
    name: new DBType('Nombre', 'countries.name', 'string'),
    code: new DBType('Código', 'countries.code', 'string'),
    createdBy: new DBType('Createdby', 'countries.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'countries.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'countries.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'countries.updated_at', 'date'),

    country_id: new DBType(`User #`, 'user.country_id', 'number'),
    userName: new DBType(`User`, 'userName', 'string', true, false),

    // country_id: new DBType(`City #`, 'city.country_id', 'number'),
    cityName: new DBType(`City`, 'cityName', 'string', true, false),

    // country_id: new DBType(`Region #`, 'region.country_id', 'number'),
    regionName: new DBType(`Region`, 'regionName', 'string', true, false),
  },
  region: {
    tablePK: 'id',
    tableName: 'regions',
    ownName: 'Departamento/Provincia',
    ownNamePlural: 'Departamentos/Provincias',
    id: new DBType('#', 'regions.id', 'number'),
    name: new DBType('Nombre', 'regions.name', 'string'),
    code: new DBType('Código', 'regions.code', 'string'),
    country_id: new DBType('Country_Id', 'regions.country_id', 'number'),
    createdBy: new DBType('Createdby', 'regions.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'regions.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'regions.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'regions.updated_at', 'date'),

    // country_id: new DBType(`Country #`, 'country.country_id', 'number'),
    countryName: new DBType(`País`, 'countryName', 'string', true, false),

    region_id: new DBType(`User #`, 'user.region_id', 'number'),
    userName: new DBType(`User`, 'userName', 'string', true, false),

    // region_id: new DBType(`City #`, 'city.region_id', 'number'),
    cityName: new DBType(`City`, 'cityName', 'string', true, false),
  },
  city: {
    tablePK: 'id',
    tableName: 'cities',
    ownName: 'Ciudad',
    ownNamePlural: 'Ciudades',
    id: new DBType('#', 'cities.id', 'number'),
    name: new DBType('Nombre', 'cities.name', 'string'),
    latitude: new DBType('Latitud', 'cities.latitude', 'string'),
    longitude: new DBType('Longitud', 'cities.longitude', 'string'),
    country_id: new DBType('Country_Id', 'cities.country_id', 'number'),
    region_id: new DBType('Region_Id', 'cities.region_id', 'number'),
    createdBy: new DBType('Createdby', 'cities.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'cities.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'cities.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'cities.updated_at', 'date'),

    // country_id: new DBType(`Country #`, 'country.country_id', 'number'),
    countryName: new DBType(`País`, 'countryName', 'string', true, false),

    // region_id: new DBType(`Region #`, 'region.region_id', 'number'),
    regionName: new DBType(`Region`, 'regionName', 'string', true, false),

    city_id: new DBType(`Authuser #`, 'authUser.city_id', 'number'),
    authUserName: new DBType(`Authuser`, 'authUserName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Misc                                                                       */
  /* -------------------------------------------------------------------------- */

  bulkError: {
    tablePK: 'id',
    tableName: 'bulk_errors',
    ownName: 'Error',
    ownNamePlural: 'Consulta de errores',
    id: new DBType('Id', 'bulk_errors.id', 'number'),
    payload: new DBType('Detalle', 'bulk_errors.payload', 'string'),
    queue: new DBType('Nombre del proceso', 'bulk_errors.queue', 'string'),
    container_id: new DBType('Container_Id', 'bulk_errors.container_id', 'number'),
    created_at: new DBType('Fecha', 'bulk_errors.created_at', 'date'),
  },
}

// console.log('l', l)
