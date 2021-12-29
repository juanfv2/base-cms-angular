import {Directive, EventEmitter, Input, Output} from '@angular/core'
import {JfSort} from '../resources/classes'

const rotate: {[key: number]: number} = {'-1': 1, '0': -1, '1': 0}

@Directive({
  selector: 'th[jfMultiSortMeta]',
  exportAs: 'jfMultiSortMeta',
  host: {
    '[class.none]': 'direction === 0',
    '[class.desc]': 'direction === -1',
    '[class.asc]': 'direction === 1',
    '(click)': 'rotate()',
    sort: 'rotate()',
  },
})
export class JfMultiSortMetaDirective {
  @Input() jfMultiSortMeta = ''
  @Input() direction = 0
  @Input()
  public set sorts(value: JfSort[]) {
    console.log('value', value, this.jfMultiSortMeta, this.direction)
    let _sorts = value
    if (!_sorts) {
      _sorts = []
    }
    const sort0 = _sorts.find((r: any) => r.field === this.jfMultiSortMeta)
    if (sort0) {
      this.direction = sort0.order
    }
  }
  @Output() sort = new EventEmitter<JfSort>()

  /**
   * de  0 pasa a -1
   * de -1 pasa a  1
   * de  1 pasa a  0
   */
  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit(new JfSort(this.jfMultiSortMeta, this.direction))
  }
}
