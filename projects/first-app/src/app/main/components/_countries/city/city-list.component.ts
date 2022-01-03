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
  JfSearchCondition,
  JfStorageManagement,
  BaseCmsListComponent,
} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

import {City, Country, Region} from 'projects/first-app/src/app/models/_models'

const kRoute = k.routes.cities
const kConditions = `${k.suggestions}${kRoute}`

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent extends BaseCmsListComponent implements OnInit, OnChanges {
  mCountry?: Country
  @Input()
  set country(country: Country) {
    if (country) {
      this.mCountry = country
      this.isSubComponentFrom = 'country'
    }
  }

  mRegion?: Region
  @Input()
  set region(region: Region) {
    if (region) {
      this.mRegion = region
      this.isSubComponentFrom = 'region'
    }
  }
  override itemCurrent?: City
  override labels = l
  override kRoute = kRoute
  override kConditions = kConditions
  override mApi = new JfApiRoute(kRoute)
  override responseList: JfResponseList<City> = new JfResponseList<City>(0, 0, [])

  constructor(
    public override router: Router,
    public override modalService: NgbModal,
    public override crudService: JfCrudService,
    public override messageService: JfMessageService,
    private route: ActivatedRoute
  ) {
    super()
    this.queryFieldOptions = [
      this.labels.city.name,
      this.labels.city.latitude,
      this.labels.city.longitude,
      this.labels.city.country_id,
      this.labels.city.region_id,
    ]
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
      conditionCountry: new JfSearchCondition(),
      conditionRegion: new JfSearchCondition(),
    }
    const r = search ? JSON.parse(search) || mSearch : mSearch
    // console.log('r', r);
    return r
  }

  override initSearch(): void {
    this.modelSearch = this.initSearchModel()
    if (this.isSubComponent) {
      this.modelSearch.conditionCountry.value = this.mCountry
      this.modelSearch.conditionRegion.value = this.mRegion
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

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionCountry,
      foreignKName: `${this.labels.city.tableName}.country_id`,
      primaryKName: 'id',
      nextOperator,
    })

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionRegion,
      foreignKName: `${this.labels.city.tableName}.region_id`,
      primaryKName: 'id',
      nextOperator,
    })
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
    this.modelSearch.lazyLoadEvent.joins = [
      new JfCondition(`${this.labels.country.tableName}.id.country_id`, [
        // `${this.labels.country.tableName}.id as country_id`,
        `${this.labels.country.tableName}.name as countryName`,
      ]),
      new JfCondition(`${this.labels.region.tableName}.id.region_id`, [
        // `${this.labels.region.tableName}.id as region_id`,
        `${this.labels.region.tableName}.name as regionName`,
      ]),
    ]
    this.modelSearch.lazyLoadEvent.conditions = conditions
    this.modelSearch.lazyLoadEvent.additional = []
    // this.modelSearch.lazyLoadEvent.includes = ['relation-1tm', 'relation-mt1', 'relation-1t1', ...];
    const mSearch = JSON.stringify(this.modelSearch)
    switch (strAction) {
      case 'export':
        const csvColumns: any = JfUtils.csvColumns(this.labels.city)
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('action', strAction))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('title', this.labels.city.ownNamePlural))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('fields', JSON.stringify(csvColumns)))
        this.crudService.export(kRoute, this.modelSearch.lazyLoadEvent).subscribe(
          (resp) => {
            this.loading = false
            JfUtils.downloadFile(resp, this.labels.city.ownNamePlural)
          },
          (error) => {
            this.loading = false
            this.messageService.danger(k.project_name, error, this.labels.city.ownName)
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
            this.messageService.danger(k.project_name, error, this.labels.city.ownName)
          }
        )
        break
    }
  }

  override addNew(): void {
    this.itemCurrent = {country: this.mCountry, region: this.mRegion} as City
    super.addNew()
  }
}
