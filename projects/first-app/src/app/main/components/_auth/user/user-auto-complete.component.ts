import {Component, forwardRef, Input} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

import {Observable, of} from 'rxjs'
import {tap, catchError, map} from 'rxjs/operators'

import {
  JfSort,
  JfResponse,
  JfCondition,
  JfLazyLoadEvent,
  jfTemplateAutoComplete,
  BaseCmsAutoCompleteComponent,
} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

import {User, City, Country, Region, Role} from 'projects/first-app/src/app/models/_models'

// Resource: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

export const user_auto_complete_control_value_accessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UserAutoCompleteComponent),
  multi: true,
}

const kRoute = k.routes.users

@Component({
  selector: 'app-user-auto-complete',
  template: jfTemplateAutoComplete,
  providers: [user_auto_complete_control_value_accessor],
})
export class UserAutoCompleteComponent extends BaseCmsAutoCompleteComponent implements ControlValueAccessor {
  mCity?: City
  @Input()
  set city(city: City) {
    this.value = undefined
    this.mCity = city
  }
  mCountry?: Country
  @Input()
  set country(country: Country) {
    this.value = undefined
    this.mCountry = country
  }
  mRegion?: Region
  @Input()
  set region(region: Region) {
    this.value = undefined
    this.mRegion = region
  }
  mRole?: Role
  @Input()
  set role(role: Role) {
    this.value = undefined
    this.mRole = role
  }

  override labels = l
  override kRoute = kRoute

  // override formatter = (x: User) => `${ x.name || ''}`;

  override searchTerm(term: string): Observable<any> {
    this.previousTerm = term
    const conditions: any[] = []
    if (this.avoidable && this.avoidable.length > 0) {
      conditions.push(
        new JfCondition(
          `and ${this.labels.user.id.field} not-in`,
          this.avoidable.map((r) => r.id)
        )
      )
    }
    if (this.mCity) {
      conditions.push(new JfCondition(`${this.labels.user.tableName}.city_id`, this.mCity.id))
    }
    if (this.mCountry) {
      conditions.push(new JfCondition(`${this.labels.user.tableName}.country_id`, this.mCountry.id))
    }
    if (this.mRegion) {
      conditions.push(new JfCondition(`${this.labels.user.tableName}.region_id`, this.mRegion.id))
    }
    if (this.mRole) {
      conditions.push(new JfCondition(`${this.labels.user.tableName}.role_id`, this.mRole.id))
    }
    if (term) {
      const g: any[] = []
      g.push(new JfCondition(`OR ${this.labels.user.id.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.name.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.email.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.password.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.email_verified_at.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.disabled.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.user.phoneNumber.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.uid.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.role_id.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.country_id.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.region_id.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.city_id.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.api_token.field} like`, term))
      // g.push(new JfCondition(`OR ${this.labels.user.remember_token.field} like`, term))
      conditions.push(g)
    }
    const mEvent = new JfLazyLoadEvent()
    mEvent.select = [
      `${this.labels.user.id.field}`,
      `${this.labels.user.name.field}`,
      `${this.labels.user.email.field}`,
      `${this.labels.user.password.field}`,
      `${this.labels.user.email_verified_at.field}`,
      `${this.labels.user.disabled.field}`,
      `${this.labels.user.phoneNumber.field}`,
      // `${this.labels.user.uid.field}`,
      // `${this.labels.user.role_id.field}`,
      // `${this.labels.user.country_id.field}`,
      // `${this.labels.user.region_id.field}`,
      // `${this.labels.user.city_id.field}`,
      // `${this.labels.user.api_token.field}`,
      // `${this.labels.user.remember_token.field}`,
    ]
    mEvent.multiSortMeta = [new JfSort(`${this.labels.user.id.field}`, JfSort.asc)]
    mEvent.additional = [new JfCondition('cp', this.currentPage)]
    mEvent.conditions = conditions
    // mEvent.rows = 10;
    return this.crudService.getPage(kRoute, mEvent).pipe(
      tap(() => (this.searchFailed = false)),
      map((resp: JfResponse) => {
        this.searchFailed = resp.data.content.length === 0
        return resp.data.content
      }),
      catchError((error) => {
        this.searchFailed = true
        this.messageService.danger(k.project_name, error, this.labels.user.ownName)
        return of([])
      })
    )
  }
}
