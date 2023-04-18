import {Component, Input, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {JfResponseList, JfSearchCondition, JfCondition, JfResponse, DBType} from '../../resources/classes'
import {JfAddComponentDirective} from '../../directives/jf-add-component.directive'
import {MessageModalComponent} from '../message-modal/message-modal.component'
import {JfCrudService} from '../../services/jf-crud.service'
import {JfMessageService} from '../../services/jf-message.service'
import {JfStorageManagement} from '../../support/jf-storage-management'
import {JfApiRoute} from '../../support/jf-api-route'
import {JfUtils} from '../../support/jf-utils'
import {k} from '../../environments/k'

@Component({
  selector: 'base-cms-base-cms-list',
  templateUrl: './base-cms-list.component.html',
  styleUrls: ['./base-cms-list.component.scss'],
})
export class BaseCmsListComponent {
  @ViewChild(JfAddComponentDirective) searchField?: JfAddComponentDirective

  @Input() isSubComponentFrom = '-'
  @Input() isSubComponent = false

  itemCurrent?: any
  itemLabels?: any
  labels: any
  csv: any
  loading = false
  hasPermission2new = false
  hasPermission2show = false
  hasPermission2delete = false
  kRoute = ''
  kConditions = ''
  mApi = new JfApiRoute('')
  responseList: JfResponseList<any> = new JfResponseList<any>(0, 0, [])

  modelSearch: any = {}
  operatorOptions: any[] = k.operatorOptions
  conditionalOptions: any[] = k.conditionalOptions
  searchFieldAdded: any[] = []
  fieldsSearchable: any[] = []
  fieldsInList: any[] = []

  public router!: Router
  public modalService!: NgbModal
  public crudService!: JfCrudService
  public messageService!: JfMessageService

  constructor() {}

  initSearch(): void {}
  onLazyLoad(strAction = ''): void {}

  onRowSelect(item: JfCondition): void {
    if (this.isSubComponent) {
      this.itemCurrent = {id: item?.v?.id}
    } else {
      // todo: #if($entity.hasCompositePk())
      const id = item?.v?.id
      this.router.navigate([this.kRoute, id])
    }
  }

  onAddNew(m: any): void {
    if (this.isSubComponent) {
      if (this.itemCurrent) {
        this.itemCurrent.id = 'new'
      } else {
        this.itemCurrent = {id: 'new'}
      }
    } else {
      this.router.navigate([this.kRoute, 'new'])
    }
  }

  onDelete(model: any): void {
    const id = model.id
    this.crudService.deleteEntity(this.kRoute, id).subscribe({
      next: (resp: JfResponse) => {
        JfUtils.remove(this.responseList, model)
        this.messageService.info(k.project_name, `${this.itemLabels.ownName} Eliminado`)
      },
      error: (error: any) => this.messageService.danger(k.project_name, error, this.itemLabels.ownName),
    })
  }

  saveFormClicked(event: any): void {
    this.itemCurrent = event
    this.onLazyLoad()
  }

  clearFilters(m: any): void {
    this.searchFieldAdded.forEach((f: any) => f.deleteField())
    this.searchFieldAdded = []
    JfStorageManagement.removeItem(this.kConditions)
    this.initSearch()
    this.onLazyLoad()
  }

  addFilter(condition?: JfSearchCondition): void {
    const c = JfUtils.addSearchField(this, condition)
    this.searchFieldAdded.push(c)
  }

  changePage(event: any): void {
    if (this.loading) {
      return
    }
    // console.log('changePage this.loading', this.loading);
    // console.log('page', event);
    if (event) {
      this.modelSearch.lazyLoadEvent.first = event
      this.onLazyLoad()
    }
  }

  changePageLimit(event: any): void {
    if (this.loading) {
      return
    }
    // console.log('changePageLimit this.loading', this.loading);
    // console.log('page', event);
    if (event) {
      this.modelSearch.lazyLoadEvent.first = 1
      this.onLazyLoad()
    }
  }

  massiveInsert(jCondition: JfCondition): void {
    // console.log('jCondition', jCondition)
    this.onLazyLoad()
    this.messageService.success(k.project_name, jCondition.v?.updated + ' Guardados')
  }

  currentFields(modelSearch: any): void {
    const csvColumns: any = JfUtils.csvColumns(this.itemLabels, true)
    const csv: any = {}
    // csv.cp = this.mApi.store()
    csv.table = this.itemLabels.tableName
    csv.primaryKeyName = this.itemLabels.tablePK
    csv.cModel = modelSearch.cModel
    csv.keys = JSON.stringify(csvColumns)

    modelSearch.csv = csv

    modelSearch.fields = this.fieldsInList

    modelSearch.fieldsSelected = modelSearch.fields.filter((_f: DBType) => _f.allowInList)
  }

  onLazyLoadExport(strAction: string, fType = 'csv', fDate = true) {
    const csvColumns: any = JfUtils.csvColumns(this.itemLabels)
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('action', strAction))
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('title', this.itemLabels.ownNamePlural))
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('fields', JSON.stringify(csvColumns)))
    this.crudService.export(this.kRoute, this.modelSearch.lazyLoadEvent).subscribe({
      next: (resp: any) => {
        this.loading = false
        JfUtils.downloadFile(resp, this.itemLabels.ownNamePlural, fType, fDate)
      },
      error: (error: any) => {
        this.loading = false
        this.messageService.danger(k.project_name, error, this.itemLabels.ownName)
      },
    })
    this.modelSearch.lazyLoadEvent.additional = []
  }

  onLazyLoadList(mSearch: any) {
    this.crudService.getPage(this.kRoute, this.modelSearch.lazyLoadEvent).subscribe({
      next: (resp: JfResponse) => {
        this.loading = false
        this.responseList = resp.data
        if (!this.isSubComponent) {
          JfStorageManagement.setItem(this.kConditions, mSearch)
        }
      },
      error: (error: any) => {
        this.loading = false
        this.messageService.danger(k.project_name, error, this.itemLabels.ownName)
      },
    })
  }
}
