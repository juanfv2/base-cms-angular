import {Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core'
import {JfSort} from '../resources/classes'
import {JfUtils} from '../support/jf-utils'

export type SortDirection = 'asc' | 'desc' | ''
const rotate: {[key: string]: SortDirection} = {asc: 'desc', desc: '', '': 'asc'}
const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0)

export interface SortEvent {
  column: string
  direction: SortDirection
}
@Directive({
  selector: 'th[baseCmsJfMultiShortMeta]',
  host: {'[class.asc]': 'direction === "asc"', '[class.desc]': 'direction === "desc"', '(click)': 'rotate()'},
})
export class JfMultiShortMetaDirective {
  @Input() baseCmsJfMultiShortMeta = ''
  @Input() direction: SortDirection = 'asc'
  @Output() sort = new EventEmitter<SortEvent>()

  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit({column: this.baseCmsJfMultiShortMeta, direction: this.direction})
  }
}
