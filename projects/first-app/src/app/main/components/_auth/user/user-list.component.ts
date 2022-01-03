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

import {User, City, Country, Region, Role} from 'projects/first-app/src/app/models/_models'

const kRoute = k.routes.users
const kConditions = `${k.suggestions}${kRoute}`

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends BaseCmsListComponent implements OnInit, OnChanges {
  currentPath: string
  currentLabels: any

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

  mCity?: City
  @Input()
  set city(city: City) {
    if (city) {
      this.mCity = city
      this.isSubComponentFrom = 'city'
    }
  }

  mRole?: Role
  @Input()
  set role(role: Role) {
    if (role) {
      this.mRole = role
      this.isSubComponentFrom = 'role'
    }
  }
  override itemCurrent?: User
  override labels = l
  override kRoute = kRoute
  override kConditions = kConditions
  override mApi = new JfApiRoute(kRoute)
  override responseList: JfResponseList<User> = new JfResponseList<User>(0, 0, [])

  constructor(
    public override router: Router,
    public override modalService: NgbModal,
    public override crudService: JfCrudService,
    public override messageService: JfMessageService,
    private route: ActivatedRoute
  ) {
    super()
    this.queryFieldOptions = [
      this.labels.user.name,
      this.labels.user.email,
      // this.labels.user.password,
      this.labels.user.email_verified_at,
      this.labels.user.disabled,
      this.labels.user.phoneNumber,
      // this.labels.user.uid,
      this.labels.user.role_id,
      this.labels.user.country_id,
      this.labels.user.region_id,
      this.labels.user.city_id,
      // this.labels.user.api_token,
      // this.labels.user.remember_token
    ]
    this.hasPermission2show = JfRequestOption.isAuthorized(`/${kRoute}/show`)
    this.hasPermission2new = JfRequestOption.isAuthorized(`/${kRoute}/new`)
    this.hasPermission2delete = JfRequestOption.isAuthorized(`/${kRoute}/delete`)

    this.currentPath = this.route.snapshot.url[0].path
    // console.log('this.currentPath', this.currentPath)
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
      conditionCity: new JfSearchCondition(),
      conditionCountry: new JfSearchCondition(),
      conditionRegion: new JfSearchCondition(),
      conditionRole: new JfSearchCondition(),
    }
    const r = search ? JSON.parse(search) || mSearch : mSearch
    // console.log('r', r);
    return r
  }

  override initSearch(): void {
    switch (this.currentPath) {
      case k.routes.accounts:
        this.currentLabels = this.labels.account
        break

      default:
        this.currentLabels = this.labels.user
        break
    }

    this.modelSearch = this.initSearchModel()
    if (this.isSubComponent) {
      this.modelSearch.conditionCountry.value = this.mCountry
      this.modelSearch.conditionRegion.value = this.mRegion
      this.modelSearch.conditionCity.value = this.mCity
      this.modelSearch.conditionRole.value = this.mRole
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
    const g: any[] = []

    switch (this.currentPath) {
      case k.routes.accounts:
        g.push(new JfCondition('AND role_id =', k.role_id_customer))
        break

      default:
        g.push(new JfCondition('AND role_id not-in', [k.role_id_driver, k.role_id_customer]))
        break
    }

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionCity,
      foreignKName: `${this.labels.user.tableName}.city_id`,
      primaryKName: 'id',
      nextOperator,
    })

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionCountry,
      foreignKName: `${this.labels.user.tableName}.country_id`,
      primaryKName: 'id',
      nextOperator,
    })

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionRegion,
      foreignKName: `${this.labels.user.tableName}.region_id`,
      primaryKName: 'id',
      nextOperator,
    })

    nextOperator = JfUtils.x2one({
      conditions,
      conditionModel: this.modelSearch.conditionRole,
      foreignKName: `${this.labels.user.tableName}.role_id`,
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
      new JfCondition(`${this.labels.city.tableName}.id.city_id`, [
        // `${this.labels.city.tableName}.id as city_id`,
        `${this.labels.city.tableName}.name as cityName`,
      ]),
      new JfCondition(`${this.labels.country.tableName}.id.country_id`, [
        // `${this.labels.country.tableName}.id as country_id`,
        `${this.labels.country.tableName}.name as countryName`,
      ]),
      new JfCondition(`${this.labels.region.tableName}.id.region_id`, [
        // `${this.labels.region.tableName}.id as region_id`,
        `${this.labels.region.tableName}.name as regionName`,
      ]),
      new JfCondition(`${this.labels.role.tableName}.id.role_id`, [
        // `${this.labels.role.tableName}.id as role_id`,
        `${this.labels.role.tableName}.name as roleName`,
      ]),
    ]
    g.push(conditions)
    this.modelSearch.lazyLoadEvent.conditions = g
    this.modelSearch.lazyLoadEvent.additional = []
    this.modelSearch.lazyLoadEvent.includes = ['photo']
    // this.modelSearch.lazyLoadEvent.includes = ['relation-1tm', 'relation-mt1', 'relation-1t1', ...];
    const mSearch = JSON.stringify(this.modelSearch)
    switch (strAction) {
      case 'export':
        const csvColumns: any = JfUtils.csvColumns(this.labels.user)
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('action', strAction))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('title', this.labels.user.ownNamePlural))
        this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('fields', JSON.stringify(csvColumns)))
        this.crudService.export(kRoute, this.modelSearch.lazyLoadEvent).subscribe({
          next: (resp) => {
            this.loading = false
            JfUtils.downloadFile(resp, this.labels.user.ownNamePlural)
          },
          error: (error) => {
            this.loading = false
            this.messageService.danger(k.project_name, error, this.labels.user.ownName)
          },
        })
        this.modelSearch.lazyLoadEvent.additional = []
        break
      default:
        this.crudService.getPage(kRoute, this.modelSearch.lazyLoadEvent).subscribe({
          next: (resp: JfResponse) => {
            this.loading = false
            this.responseList = resp.data
            if (!this.isSubComponent) {
              JfStorageManagement.setItem(kConditions, mSearch)
            }
          },
          error: (error) => {
            this.loading = false
            this.messageService.danger(k.project_name, error, this.labels.user.ownName)
          },
        })
        break
    }
  }
  override onRowSelect(item: any): void {
    if (this.isSubComponent) {
      this.itemCurrent = {id: item.id} as User
    } else {
      // todo: #if($entity.hasCompositePk())
      const id = item.id
      this.router.navigate([this.currentPath, id])
    }
  }

  override addNew(): void {
    if (this.isSubComponent) {
      this.itemCurrent = {
        id: 'new',
        country: this.mCountry,
        region: this.mRegion,
        city: this.mCity,
        role: this.mRole,
      } as unknown as User
    } else {
      this.router.navigate([this.currentPath, 'new'])
    }
  }
}
