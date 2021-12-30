import {Component, Input, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

import {JfResponseList, JfSearchCondition, JfSort, JfCondition, JfResponse} from '../../resources/classes'
import {JfAddComponentDirective} from '../../directives/jf-add-component.directive'
import {MessageModalComponent} from '../message-modal/message-modal.component'
import {JfCrudService} from '../../services/jf-crud.service'
import {JfMessageService} from '../../services/jf-message.service'
import {JfStorageManagement} from '../../support/jf-storage-management'
import {JfApiRoute} from '../../support/jf-api-route'
import {JfUtils} from '../../support/jf-utils'
import {configs} from '../../environments/k'

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
  operatorOptions: any[] = configs.operatorOptions
  conditionalOptions: any[] = configs.conditionalOptions
  searchFieldAdded: any[] = []
  queryFieldOptions: any[] = []

  public router!: Router
  public modalService!: NgbModal
  public crudService!: JfCrudService
  public messageService!: JfMessageService

  constructor() {}

  initSearch(): void {}
  onLazyLoad(strAction = ''): void {}

  onRowSelect(item: any): void {
    if (this.isSubComponent) {
      this.itemCurrent = {id: item.id}
    } else {
      // todo: #if($entity.hasCompositePk())
      const id = item.id
      this.router.navigate([this.kRoute, id])
    }
  }

  addNew(): void {
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

  deleteItem(itemToDelete: any): void {
    const id = itemToDelete.id
    this.crudService.deleteEntity(this.kRoute, id).subscribe(
      (resp: JfResponse) => {
        JfUtils.remove(this.responseList, itemToDelete)
        this.messageService.info(configs.project_name, `${this.labels.role.ownName} Eliminado`)
      },
      (error) => this.messageService.danger(configs.project_name, error, this.labels.role.ownName)
    )
  }

  saveFormClicked(event: any): void {
    this.itemCurrent = event
    this.onLazyLoad()
  }

  clearFilters(): void {
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

  showDeleteDialog(item2delete: any): void {
    const modalRef = this.modalService.open(MessageModalComponent)
    modalRef.componentInstance.header = 'Confirmación'
    modalRef.componentInstance.message = `¿Desea eliminar ${this.labels.user.ownName} # ${item2delete.id}?`
    modalRef.componentInstance.withOk = true
    modalRef.result
      .then((result) => {
        // console.log('result', result);
        if (result === 'ok') {
          this.deleteItem(item2delete)
        }
      })
      .catch((error) => {
        // console.log('error', error);
      })
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

  /**
   * de  0 pasa a -1
   * de -1 pasa a  1
   * de  1 pasa a  0
   */
  onSort(e: JfSort): void {
    // console.log('e', e)

    if (!this.modelSearch.lazyLoadEvent.sorts) {
      this.modelSearch.lazyLoadEvent.sorts = []
    }

    switch (e.order) {
      case 0:
        this.modelSearch.lazyLoadEvent.sorts = this.modelSearch.lazyLoadEvent.sorts.filter(
          (s: JfSort) => s.field !== e.field
        )
        break

      default:
        const s = this.modelSearch.lazyLoadEvent.sorts.find((s: JfSort) => s.field === e.field)

        if (s) {
          s.order = e.order
        } else {
          this.modelSearch.lazyLoadEvent.sorts.push(e)
        }
        break
    }
    this.onLazyLoad()
  }

  massiveInsert(jCondition: JfCondition, modelLabels: any): void {
    // console.log('jCondition', jCondition);
    const csvColumns: any = JfUtils.csvColumns(modelLabels, true)
    this.csv = {}
    this.csv.cp = this.mApi.store()
    this.csv.table = modelLabels.tableName
    this.csv.primaryKeyName = modelLabels.tablePK
    this.csv.massiveInsert = jCondition.v.name
    this.csv.massiveQueryFieldName = jCondition.c
    this.csv.massiveQueryFileName = jCondition.v.name
    this.csv.keys = csvColumns
    this.loading = true
    // console.log('resp.csv', this.csv);
    this.crudService.updateEntity(configs.routes.misc.importCsv, this.csv).subscribe({
      next: (resp: JfResponse) => {
        this.loading = false
        // console.log('resp', resp);
        this.onLazyLoad()
        this.messageService.success(configs.project_name, resp.data.updated + ' Guardados')
        this.csv = {}
      },
      error: (error: any) => {
        this.loading = false
        // console.log('error', error);
        this.messageService.danger(configs.project_name, error)
        this.csv = {}
        this.csv.error = error
      },
    })
  }
}
