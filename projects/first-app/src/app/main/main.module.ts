import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {NgbNavModule, NgbTypeaheadModule, NgbPaginationModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap'

import {BaseCmsModule} from 'base-cms'

import {MainRoutes} from './main.module.routing'

import {DashboardComponent} from './components/_commons/dashboard/dashboard.component'

import {PersonAutoCompleteComponent} from './components/_auth/person/person-auto-complete.component'
import {PersonDetailComponent} from './components/_auth/person/person-detail.component'

import {AccountAutoCompleteComponent} from './components/_auth/account/account-auto-complete.component'
import {AccountDetailComponent} from './components/_auth/account/account-detail.component'

import {UserAutoCompleteComponent} from './components/_auth/user/user-auto-complete.component'
import {UserDetailComponent} from './components/_auth/user/user-detail.component'
import {UserListComponent} from './components/_auth/user/user-list.component'

import {RoleAutoCompleteComponent} from './components/_auth/role/role-auto-complete.component'
import {RoleDetailComponent} from './components/_auth/role/role-detail.component'
import {RoleListComponent} from './components/_auth/role/role-list.component'

import {CountryAutoCompleteComponent} from './components/_countries/country/country-auto-complete.component'
import {CountryDetailComponent} from './components/_countries/country/country-detail.component'
import {CountryListComponent} from './components/_countries/country/country-list.component'

import {RegionAutoCompleteComponent} from './components/_countries/region/region-auto-complete.component'
import {RegionDetailComponent} from './components/_countries/region/region-detail.component'
import {RegionListComponent} from './components/_countries/region/region-list.component'

import {CityAutoCompleteComponent} from './components/_countries/city/city-auto-complete.component'
import {CityDetailComponent} from './components/_countries/city/city-detail.component'
import {CityListComponent} from './components/_countries/city/city-list.component'

@NgModule({
  declarations: [
    DashboardComponent,

    PersonDetailComponent,
    PersonAutoCompleteComponent,

    AccountDetailComponent,
    AccountAutoCompleteComponent,

    RoleListComponent,
    RoleDetailComponent,
    RoleAutoCompleteComponent,

    UserListComponent,
    UserDetailComponent,
    UserAutoCompleteComponent,

    CountryListComponent,
    CountryDetailComponent,
    CountryAutoCompleteComponent,

    RegionListComponent,
    RegionDetailComponent,
    RegionAutoCompleteComponent,

    CityListComponent,
    CityDetailComponent,
    CityAutoCompleteComponent,
  ],
  imports: [
    BaseCmsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(MainRoutes),

    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbDatepickerModule,
  ],
})
export class MainModule {}
