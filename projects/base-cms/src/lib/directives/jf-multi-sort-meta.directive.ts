import {Directive, Input} from '@angular/core'
import {DBType, JfSort} from '../resources/classes'

const rotate: {[key: number]: number} = {'-1': 1, '0': -1, '1': 0}

@Directive({
  selector: 'th[jfMultiSortMeta]',
  exportAs: 'jfMultiSortMeta',
  host: {
    '[class.no-sorting]': 'direction === -2',
    '[class.none]': 'direction === 0',
    '[class.desc]': 'direction === -1',
    '[class.asc]': 'direction === 1',
    '(click)': 'rotate()',
  },
})
export class JfMultiSortMetaDirective {
  @Input() host: any
  @Input() jfMultiSortMeta!: DBType
  @Input() direction = 0
  sort: any

  constructor() {}

  ngOnInit(): void {
    // console.log('comp.2', this.host);
    if (!this.jfMultiSortMeta || !this.jfMultiSortMeta.sorting) {
      this.direction = -2
      return
    }

    if (!this.host.modelSearch.lazyLoadEvent.sorts) {
      this.host.modelSearch.lazyLoadEvent.sorts = []
    }

    this.sort =
      this.host.modelSearch.lazyLoadEvent.sorts.find((r: any) => r.field === this.jfMultiSortMeta.field) ||
      new JfSort(this.jfMultiSortMeta.alias || this.jfMultiSortMeta.field, 0)
    this.direction = this.sort.order
  }

  /**
   * de -1 pasa a  1
   * de  0 pasa a -1
   * de  1 pasa a  0
   */
  rotate() {
    // console.log('comp.2', this.host);
    if (!this.jfMultiSortMeta || !this.jfMultiSortMeta.sorting) {
      return
    }

    this.sort.order = rotate[this.direction]

    if (!this.host.modelSearch.lazyLoadEvent.sorts) {
      this.host.modelSearch.lazyLoadEvent.sorts = []
    }

    switch (this.sort.order) {
      case 0:
        this.host.modelSearch.lazyLoadEvent.sorts = this.host.modelSearch.lazyLoadEvent.sorts.filter(
          (s: JfSort) => s.field !== this.sort.field
        )
        break

      default:
        const s = this.host.modelSearch.lazyLoadEvent.sorts.find((s: JfSort) => s.field === this.sort.field)

        if (s) {
          s.order = this.sort.order
        } else {
          this.host.modelSearch.lazyLoadEvent.sorts.push(this.sort)
        }
        break
    }
    this.direction = this.sort.order
    this.host.onLazyLoad()
  }
}
