import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {
  JfUtils,
  JfApiRoute,
  JfResponse,
  JfCondition,
  JfCrudService,
  JfResponseList,
  JfLazyLoadEvent,
  JfRequestOption,
  JfMessageService,
  JfStorageManagement,
  BaseCmsListComponent,
} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

import {Country} from 'projects/first-app/src/app/models/_models'

const kRoute = k.routes.countries
const kConditions = `${k.suggestions}${kRoute}`

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent extends BaseCmsListComponent implements OnInit, OnChanges {
  override labels = l
  override itemCurrent?: Country
  override kRoute = kRoute
  override kConditions = kConditions
  override mApi = new JfApiRoute(kRoute)
  override responseList: JfResponseList<Country> = new JfResponseList<Country>(0, 0, [])

  constructor(
    public override router: Router,
    public override modalService: NgbModal,
    public override crudService: JfCrudService,
    public override messageService: JfMessageService,
    private route: ActivatedRoute
  ) {
    super()
    this.queryFieldOptions = [this.labels.country.name, this.labels.country.code]
    this.hasPermission2show = JfRequestOption.isAuthorized(`/${kRoute}/show`)
    this.hasPermission2new = JfRequestOption.isAuthorized(`/${kRoute}/new`)
    this.hasPermission2delete = JfRequestOption.isAuthorized(`/${kRoute}/delete`)
  }

  ngOnInit(): void {
    this.initSearch()
    this.onLazyLoad()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isSubComponent) {
      this.initSearch()
      this.onLazyLoad()
    }
  }

  initSearchModel(): any {
    const search = !this.isSubComponent ? JfStorageManagement.getItem(kConditions) : null
    const mSearch = {
      lazyLoadEvent: new JfLazyLoadEvent(),
    }
    const r = search ? JSON.parse(search) || mSearch : mSearch
    // console.log('r', r);
    return r
  }

  override initSearch(): void {
    this.modelSearch = this.initSearchModel()
    if (this.isSubComponent) {
    } else {
      if (this.modelSearch) {
        if (this.modelSearch.conditions) {
          Promise.resolve(this.searchField).then(() => {
            for (const condition of this.modelSearch.conditions) {
              this.addFilter(condition)
            }
          })
        }
      }
    }
  }

  override onLazyLoad(strAction = ''): void {
    if (this.loading) {
      return
    }
    // console.log('onLazyLoad this.loading', this.loading);
    // console.log('onLazyLoad this.loading', this.modelSearch);
    this.loading = true
    // prepare
    let nextOperator = 'AND'
    const conditions: any[] = []

    if (this.modelSearch.conditions) {
      for (const c of this.modelSearch.conditions) {
        if (c.value || c.field.type === 'boolean') {
          const nCondition = `${nextOperator} ${c.field.field} ${c.cond}`
          nextOperator = c.oper
          switch (c.field.type) {
            case 'date':
              const d = `${c.value.year}-${c.value.month}-${c.value.day}`
              conditions.push(new JfCondition(nCondition, d))
              break
            // case 'boolean':
            // const bx = !c.value;
            // conditions.push(new JfCondition(nCondition, bx));
            // break;
            default:
              conditions.push(new JfCondition(nCondition, c.value))
              break
          }
        }
      }
    }
    // joinType === '<' leftJoin, '>' rightJoin
    // 'joinTable.joinTablePK.ownTableFK'
    // 'joinTable.joinTablePK.ownTableFK.joinType'
    // 'joinTable.joinTablePK.ownTable.ownTableFK'
    // 'joinTable.joinTablePK.ownTable.ownTableFK.joinType'
    this.modelSearch.lazyLoadEvent.joins = []
    this.modelSearch.lazyLoadEvent.conditions = conditions
    this.modelSearch.lazyLoadEvent.additional = []
    // this.modelSearch.lazyLoadEvent.includes = ['relation-1tm', 'relation-mt1', 'relation-1t1', ...];
    const mSearch = JSON.stringify(this.modelSearch)
    switch (strAction) {
      case 'export':
        const csvColumns: any = JfUtils.csvColumns(this.labels.country)
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('action', strAction))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('title', this.labels.country.ownNamePlural))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('fields', JSON.stringify(csvColumns)))
        this.crudService.export(kRoute, this.modelSearch.lazyLoadEvent).subscribe(
          (resp) => {
            this.loading = false
            JfUtils.downloadFile(resp, this.labels.country.ownNamePlural)
          },
          (error) => {
            this.loading = false
            this.messageService.danger(k.project_name, error, this.labels.country.ownName)
          }
        )
        this.modelSearch.lazyLoadEvent.additional = []
        break
      default:
        this.crudService.getPage(kRoute, this.modelSearch.lazyLoadEvent).subscribe(
          (resp: JfResponse) => {
            this.loading = false
            this.responseList = resp.data
            if (!this.isSubComponent) {
              JfStorageManagement.setItem(kConditions, mSearch)
            }
          },
          (error) => {
            this.loading = false
            this.messageService.danger(k.project_name, error, this.labels.country.ownName)
          }
        )
        break
    }
  }
}
