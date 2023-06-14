import {Directive, ElementRef, Input, Optional} from '@angular/core'
import {StickyTableDirective} from './sticky-table.directive'

@Directive({
  selector: '[jfStickyHeader]',
  exportAs: 'jfStickyHeader',
})
export class StickyTableHeaderDirective {
  @Input() jfStickyHeader = true
  constructor(private tableHeader: ElementRef) {}

  ngAfterViewInit() {
    if (this.jfStickyHeader) {
      const tableCell = this.tableHeader.nativeElement

      tableCell.style.top = '0px'
      tableCell.style.left = '0px'
      tableCell.style.position = 'sticky'
      tableCell.style.background = 'white'
      tableCell.style.borderStyle = 'solid'
      tableCell.style.zIndex = '1000'
    }
  }
}
