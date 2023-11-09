import {Component, Input, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {JfResponseList, JfSearchCondition, JfCondition, JfResponse, DBType} from '../../resources/classes'
import {JfAddComponentDirective} from '../../directives/jf-add-component.directive'
import {JfAddComponentFileDirective} from '../../directives/jf-add-component-file.directive'
import {GenericTableComponent} from '../generic-table/generic-table.component'

import {JfCrudService} from '../../services/jf-crud.service'
import {JfMessageService} from '../../services/jf-message.service'
import {JfApiRoute} from '../../support/jf-api-route'
import {JfUtils} from '../../support/jf-utils'
import {k} from '../../environments/k'
import {XFile} from '../../resources/models'

@Component({
  selector: 'base-cms-base-cms-list',
  templateUrl: './base-cms-list.component.html',
  styleUrls: ['./base-cms-list.component.scss'],
})
export class BaseCmsListComponent {
  @ViewChild(JfAddComponentDirective) searchField?: JfAddComponentDirective
  @ViewChild(JfAddComponentFileDirective) searchFieldWithFile?: JfAddComponentFileDirective
  @ViewChild(GenericTableComponent) genericTableComponent?: GenericTableComponent

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
  storageSession = true
  kRoute = ''
  kConditions = ''
  name2export = ''
  mApi = new JfApiRoute('')
  responseList: JfResponseList<any> = new JfResponseList<any>(0, 0, [])

  csvXFile!: XFile
  modelSearch: any = {}
  operatorOptions: any[] = k.operatorOptions
  conditionalOptions: any[] = k.conditionalOptions
  conditionalOptionsWithFile: any[] = k.conditionalOptionsWithFile

  searchFieldAdded: any[] = []
  searchFieldAddedWithFile: any[] = []
  fieldsSearchable: DBType[] = []
  fieldsInList: DBType[] = []

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

  clearFilters(m?: any): void {
    this.resetModelSearch()
    this.initSearch()
    this.onLazyLoad()
  }

  resetModelSearch(storageRemoveItem = true) {
    this.searchFieldAdded.forEach((f: any) => f?.deleteField())
    this.searchFieldAdded = []
    if (storageRemoveItem) {
      JfUtils.mStorage.removeItem(this.kConditions, this.storageSession)
    }
  }

  addFilter(condition?: JfSearchCondition): void {
    const c = JfUtils.addSearchField(this, condition)
    this.searchFieldAdded.push(c)
  }

  addFilterWithFile(condition?: JfSearchCondition): void {
    const c = JfUtils.addSearchFieldWithFile(this, condition)
    this.searchFieldAddedWithFile.push(c)
  }

  addFilterWithFileShow() {
    this.modelSearch.itemSearchWithFile = !this.modelSearch.itemSearchWithFile
    this.modelSearch.conditionsWithFile = []
    this.modelSearch.massiveWithFile = null
    this.modelSearch.exactSearch = false
  }

  massiveWithFile(jCondition: JfCondition): void {
    // console.log('jCondition', jCondition)
    const data = jCondition.v
    this.modelSearch.massiveWithFile = data.name
    this.modelSearch.exactSearch = false
    if (this.searchFieldAddedWithFile) {
      this.searchFieldAddedWithFile.forEach((s) => s?.deleteField())
    }
    this.csvXFile.name = data.name
    for (let i = 0; i < data.columns; i++) {
      this.addFilterWithFile()
    }
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

  onLazyLoadExport(strAction: string, fDate = true) {
    const extensionFile = this.modelSearch.exportFileType || k.exportFileTypes[0].c
    const name2export = this.name2export || JfUtils.kebabCase(this.itemLabels.ownNamePlural)
    const csvColumns: any = {}

    this.modelSearch.fields.forEach((_f: DBType) => {
      if (_f.allowExport && _f.allowInList) csvColumns[_f.name] = _f.label
    })

    const csvColumnsStr = JSON.stringify(csvColumns)

    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('action', strAction))
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('title', name2export))
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('fields', csvColumnsStr))
    this.modelSearch.lazyLoadEvent.additional.push(new JfCondition('ext', extensionFile))

    this.crudService.export(this.kRoute, this.modelSearch.lazyLoadEvent, true).subscribe({
      next: (resp: any) => {
        this.loading = false
        JfUtils.downloadFile(resp, name2export, extensionFile, fDate)
      },
      error: (error: any) => {
        this.loading = false
        this.messageService.danger(k.project_name, error, this.itemLabels.ownName)
      },
    })
    this.modelSearch.lazyLoadEvent.additional = []
  }

  onLazyLoadList(mSearch: any, withAuth = true, isPost = true) {
    this.crudService.getPage(this.kRoute, this.modelSearch.lazyLoadEvent, withAuth, isPost).subscribe({
      next: (resp: JfResponse) => {
        this.loading = false
        this.responseList = resp.data
        if (!this.isSubComponent) {
          JfUtils.mStorage.setItem(this.kConditions, mSearch, this.storageSession)
        }
      },
      error: (error: any) => {
        this.loading = false
        this.messageService.danger(k.project_name, error, this.itemLabels.ownName)
      },
    })
  }

  currentFields(modelSearch: any): void {
    const csvColumns: any = JfUtils.csvColumns(this.itemLabels, true)
    const csv: any = {}
    // csv.cp = this.mApi.store()
    csv.primaryKeyName = this.itemLabels.tablePK
    csv.table = this.itemLabels.tableName
    csv.keys = JSON.stringify(csvColumns)
    csv.cModel = modelSearch.cModel
    csv.immediate = 'immediate'

    modelSearch.csv = csv
    modelSearch.fields = this.fieldsInList
    modelSearch.fieldsSelected = modelSearch.fields.filter((_f: DBType) => _f.allowInList)
  }

  massiveInsert(jCondition: JfCondition): void {
    // console.log('jCondition', jCondition)
    this.onLazyLoad()
    this.messageService.success(k.project_name, jCondition.v?.updated + ' Guardados')
  }
}
