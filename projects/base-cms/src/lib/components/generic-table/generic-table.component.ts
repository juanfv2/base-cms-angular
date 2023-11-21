import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import {JfCondition, DBType} from '../../resources/classes'
import {MessageModalComponent} from '../message-modal/message-modal.component'
import {FileUploadComponent} from '../file-upload/file-upload.component'
import {XFile} from '../../resources/models'

@Component({
  selector: 'base-cms-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileUploadComponent?: FileUploadComponent

  @Input() labels: any
  @Input() csv: any
  @Input() csvFile!: XFile
  @Input() csvFileDelete!: XFile
  @Input() itemLabels?: any
  @Input() modelSearch: any = {}
  @Input() responseList: any = {}
  @Input() url2send?: string
  @Input() loading = false
  @Input() showHeader = true
  @Input() showFooter = true
  @Input() allowExport = true
  @Input() allowImport = false
  @Input() isSubComponent = false
  @Input() hasPermission2new = false
  @Input() hasPermission2show = false
  @Input() hasPermission2delete = false
  @Input() tableSm = true
  @Input() tableNoWrap = true
  @Input() tableBordered = true
  @Input() tableTruncate = 0

  @Output() _onLazyLoad = new EventEmitter<any>()
  @Output() _onRowSelect = new EventEmitter<any>()
  @Output() _onAddNew = new EventEmitter<any>()
  @Output() _onDelete = new EventEmitter<any>()
  @Output() _onClearFilters = new EventEmitter<any>()
  @Output() _onMassiveInsert = new EventEmitter<any>()
  @Output() _onFileUploader = new EventEmitter<any>()

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>
  csvDelete: any

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.csvDelete = JSON.parse(JSON.stringify(this.modelSearch.csv || {}))
    this.csvDelete.immediate = 'delete'

    this.csvFile = this.csvFile || ({id: -1, entity: this.itemLabels?.tableName, field: 'massive-insert'} as XFile)
  }

  clearFilters(): void {
    this.responseList = {}
    this._onClearFilters.emit('')
  }

  onLazyLoad(strAction = ''): void {
    this._onLazyLoad.emit(strAction)
  }

  onRowSelect(model: any, pField = ''): void {
    this._onRowSelect.emit(new JfCondition(pField, model))
  }

  onAddNew(): void {
    this._onAddNew.emit()
  }

  showDeleteDialog(model: any) {
    const modalRef = this.modalService.open(MessageModalComponent)
    modalRef.componentInstance.header = 'Confirmación'
    modalRef.componentInstance.message = `¿Desea eliminar ${this.itemLabels?.ownName} # ${model.id}?`
    modalRef.componentInstance.withOk = true
    modalRef.result
      .then((result: any) => {
        // console.log('result', result);
        if (result === 'ok') {
          this._onDelete.emit(model)
        }
      })
      .catch((error: any) => {
        // console.log('error', error);
      })
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(/[^0-9]/g, '')
  }

  changePage(event: number): void {
    if (this.loading) {
      return
    }

    // console.log('changePage this.loading', this.loading)
    // console.log('page', event)

    if (this.responseList.totalPages < event) {
      event = this.responseList.totalPages
    }

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

  gFileUploader(jCondition: JfCondition): void {
    this._onFileUploader.emit(jCondition)
  }

  massiveInsert(jCondition: JfCondition): void {
    this._onMassiveInsert.emit(jCondition)
  }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, {scrollable: true})
  }

  unselect() {
    const selected = this.modelSearch.fields.filter((_f: any) => _f.allowInList).length === 0

    this.modelSearch.fields.forEach((e: DBType) => {
      e.allowInList = selected
    })
  }

  saveFields() {
    this.modelSearch.fieldsSelected = []

    setTimeout(() => {
      this.modelSearch.fieldsSelected = this.modelSearch.fields.filter((_f: DBType) => _f.allowInList)
      this.onLazyLoad()
    }, 0.01)

    this.modalService.dismissAll()
  }

  drop(e: any) {
    this.moveItem(e.previousIndex, e.currentIndex)
  }

  moveItem(old_index: number, new_index: number) {
    if (new_index >= this.modelSearch.fields.length) {
      var k = new_index - this.modelSearch.fields.length + 1
      while (k--) {
        this.modelSearch.fields.push(undefined)
      }
    }
    this.modelSearch.fields.splice(new_index, 0, this.modelSearch.fields.splice(old_index, 1)[0])
  }
}
