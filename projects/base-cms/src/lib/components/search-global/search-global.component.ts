import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {DBType} from '../../resources/classes'

@Component({
  selector: 'base-cms-search-global',
  templateUrl: './search-global.component.html',
  styleUrls: ['./search-global.component.scss'],
})
export class SearchGlobalComponent implements OnInit {
  @Input() fieldsSearchable!: DBType[]
  @Input() modelSearch: any
  @Input() msgToolTipOpen = 'Agregar criterios de búsqueda globales'
  @Input() msgToolTipClose = 'Agregar criterios de búsqueda globales (Cerrar)'
  @Input() gTextPlaceholder = 'Ingrese texto ...'
  @Input() gDropDownPlaceholder = 'Seleccione campos'

  @Output() onSelect = new EventEmitter()

  msgToolTip = 'Open|Close'
  ddSettings: any = {
    singleSelection: false,
    idField: 'field',
    textField: 'label',
    itemsShowLimit: 6,
    allowSearchFilter: true,
    enableCheckAll: false,
    searchPlaceholderText: 'Campos ...',
  }

  ngOnInit(): void {
    this.msgToolTip = this.modelSearch.gSearchGlobalShow ? this.msgToolTipClose : this.msgToolTipOpen
  }

  onItemSelect(item: any) {
    // console.log(item)
    this.onSelect.emit(item)
  }
}
