import {Component, forwardRef} from '@angular/core'
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

import {Country} from 'projects/first-app/src/app/models/_models'

// Resource: http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel

export const country_auto_complete_control_value_accessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CountryAutoCompleteComponent),
  multi: true,
}

const kRoute = k.routes.countries

@Component({
  selector: 'app-country-auto-complete',
  template: jfTemplateAutoComplete,
  providers: [country_auto_complete_control_value_accessor],
})
export class CountryAutoCompleteComponent extends BaseCmsAutoCompleteComponent implements ControlValueAccessor {
  override labels = l
  override kRoute = kRoute

  // override formatter = (x: Country) => `${x.name || ''}`

  override searchTerm(term: string): Observable<any> {
    // console.log(`term: "${term}"`, this.kRoute, this.currentPage, this.hasPermission2show)
    this.previousTerm = term
    const conditions: any[] = []
    if (this.avoidable && this.avoidable.length > 0) {
      conditions.push(
        new JfCondition(
          `and ${this.labels.country.id.field} not-in`,
          this.avoidable.map((r) => r.id)
        )
      )
    }

    if (term) {
      const g: any[] = []
      g.push(new JfCondition(`OR ${this.labels.country.id.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.country.name.field} like`, term))
      g.push(new JfCondition(`OR ${this.labels.country.code.field} like`, term))
      conditions.push(g)
    }
    const mEvent = new JfLazyLoadEvent()
    mEvent.select = [
      `${this.labels.country.id.field}`,
      `${this.labels.country.name.field}`,
      `${this.labels.country.code.field}`,
    ]
    mEvent.multiSortMeta = [new JfSort(`${this.labels.country.id.field}`, JfSort.asc)]
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
        this.messageService.danger(k.project_name, error, this.labels.country.ownName)
        return of([])
      })
    )
  }
}
