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

import {Account, User} from 'projects/first-app/src/app/models/_models'

// Resource: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

export const account_auto_complete_control_value_accessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AccountAutoCompleteComponent),
  multi: true,
}

const kRoute = k.routes.accounts

@Component({
  selector: 'app-account-auto-complete',
  template: jfTemplateAutoComplete,
  providers: [account_auto_complete_control_value_accessor],
})
export class AccountAutoCompleteComponent extends BaseCmsAutoCompleteComponent implements ControlValueAccessor {
  mUser?: User
  @Input()
  set user(user: User) {
    this.value = undefined
    this.mUser = user
  }

  override labels = l
  override kRoute = kRoute

  // override formatter = (x: Account) => `${ x.name || ''}`;

  override searchTerm(term: string): Observable<any> {
    this.previousTerm = term
    const conditions: any[] = []
    if (this.avoidable && this.avoidable.length > 0) {
      conditions.push(
        new JfCondition(
          `and ${this.labels.account.id.field} not-in`,
          this.avoidable.map((r) => r.id)
        )
      )
    }
    if (this.mUser) {
      conditions.push(new JfCondition(`${this.labels.account.tableName}.user_id`, this.mUser.id))
    }
    if (term) {
      const g: any[] = []
      g.push(new JfCondition(`OR ${this.labels.account.id.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.firstName.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.lastName.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.cellPhone.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.birthDate.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.address.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.neighborhood.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.imei.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.account.user_id.field} like`, term))
      conditions.push(g)
    }
    const mEvent = new JfLazyLoadEvent()
    mEvent.select = [
      `${this.labels.account.id.field}`,
      `${this.labels.account.firstName.field}`,
      `${this.labels.account.lastName.field}`,
      `${this.labels.account.cellPhone.field}`,
      `${this.labels.account.birthDate.field}`,
      `${this.labels.account.address.field}`,
      `${this.labels.account.neighborhood.field}`,
      `${this.labels.account.imei.field}`,
      `${this.labels.account.user_id.field}`,
    ]
    mEvent.multiSortMeta = [new JfSort(`${this.labels.account.id.field}`, JfSort.asc)]
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
        this.messageService.danger(k.project_name, error, this.labels.account.ownName)
        return of([])
      })
    )
  }
}
