import {Routes} from '@angular/router'

import {DashboardComponent} from './components/_commons/dashboard/dashboard.component'

import {RoleDetailComponent} from './components/_auth/role/role-detail.component'
import {RoleListComponent} from './components/_auth/role/role-list.component'

import {UserListComponent} from './components/_auth/user/user-list.component'
import {UserDetailComponent} from './components/_auth/user/user-detail.component'

import {CountryDetailComponent} from './components/_countries/country/country-detail.component'
import {CountryListComponent} from './components/_countries/country/country-list.component'

import {RegionListComponent} from './components/_countries/region/region-list.component'
import {RegionDetailComponent} from './components/_countries/region/region-detail.component'
import {CityDetailComponent} from './components/_countries/city/city-detail.component'
import {CityListComponent} from './components/_countries/city/city-list.component'
import { k } from '../../environments/k'

// import {UserDetailComponent} from 'projects/first-app/src/app/components/main/_auth/user/user-detail.component'
// import {UserListComponent} from 'projects/first-app/src/app/components/main/_auth/user/user-list.component'
// import {RoleDetailComponent} from 'projects/first-app/src/app/components/main/_auth/role/role-detail.component'
// import {RoleListComponent} from 'projects/first-app/src/app/components/main/_auth/role/role-list.component'

// entities init --------

// entities end --------

export const MainRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},

  {path: `${k.routes.users}/:id/:profile`, component: UserDetailComponent},
  {path: `${k.routes.users}/:id`, component: UserDetailComponent},
  {path: k.routes.users, component: UserListComponent},

  {path: `${k.routes.roles}/:id`, component: RoleDetailComponent},
  {path: k.routes.roles, component: RoleListComponent},

  {path: `${k.routes.accounts}/:id`, component: UserDetailComponent},
  {path: k.routes.accounts, component: UserListComponent},

  {path: `${k.routes.countries}/:id`, component: CountryDetailComponent},
  {path: k.routes.countries, component: CountryListComponent},

  {path: `${k.routes.regions}/:id`, component: RegionDetailComponent},
  {path: k.routes.regions, component: RegionListComponent},

  {path: `${k.routes.cities}/:id`, component: CityDetailComponent},
  {path: k.routes.cities, component: CityListComponent},
  // entities end --------
]
