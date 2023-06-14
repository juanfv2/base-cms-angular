import {Directive, ElementRef, Input, Optional} from '@angular/core'
import {StickyTableDirective} from './sticky-table.directive'

@Directive({
  selector: '[jfStickyTableCell]',
  exportAs: 'jfStickyTableCell',
})
export class StickyTableCellDirective {
  @Input() jfStickyTableCell = true
  constructor(private tableCell: ElementRef, @Optional() private table: StickyTableDirective) {}

  ngAfterViewInit() {
    if (this.jfStickyTableCell) {
      setTimeout(() => {
        const tableCell = this.tableCell.nativeElement as HTMLTableCellElement
        const tableRow = tableCell.parentElement as HTMLTableRowElement
        const cells = tableRow.cells

        // console.log('tableCell', tableCell.textContent)
        // console.log('tableCell', tableCell)

        let _width = 0

        for (var i = 0; i < cells.length; i++) {
          // console.log( 'current-i', tableCell.cellIndex, i, cells[i].style.position, cells[i].offsetWidth, tableCell.cellIndex >= i)
          if (tableCell.cellIndex > i) {
            const _x_ = cells[tableCell.cellIndex - 1 - i].offsetWidth
            // console.log('_x_', i, _x_)
            _width = _width + _x_
          } else break
        }

        const _left = Math.floor(_width) // this.table ? `${_width}px` : '0px'
        // console.log('current-i', tableCell.cellIndex, tableCell.offsetWidth, _width, this.table.x, _left)
        tableCell.style.left = '0px'
        tableCell.style.left = _left + 'px'
        tableCell.style.position = 'sticky'
        tableCell.style.background = 'white'
        tableCell.style.borderStyle = 'solid'
        // tableCell.style.zIndex = '1000'
      }, 5)
    }
  }
}
