import {Directive, ElementRef, Input, Optional} from '@angular/core'
import {StickyTableDirective} from './sticky-table.directive'

@Directive({
  selector: '[jfSticky]',
  exportAs: 'jfSticky',
})
export class StickyDirective {
  @Input() jfSticky = true
  constructor(private el: ElementRef, @Optional() private table: StickyTableDirective) {}

  ngAfterViewInit() {
    if (this.jfSticky) {
      const el = this.el.nativeElement as HTMLElement
      const {x} = el.getBoundingClientRect()
      // const {x} = el.getBoundingClientRect()
      // console.log('x, table.x', el.innerHTML, x, this.table.x)
      // el.style.borderWidth = '1px'
      el.style.left = this.table ? `${x - this.table.x}px` : '0px'
      el.style.position = 'sticky'
      el.style.left = '0px'
      el.style.background = 'white'
      el.style.borderStyle = 'solid'
      el.style.padding = '0'
    }
  }
}
