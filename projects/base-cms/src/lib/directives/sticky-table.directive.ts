import {Directive, ElementRef} from '@angular/core'

@Directive({
  selector: '[jfStickyTable]',
  exportAs: 'jfStickyTable',
})
export class StickyTableDirective {
  constructor(private el: ElementRef) {}

  get x() {
    return (this.el.nativeElement as HTMLElement)?.getBoundingClientRect()?.x
  }
}
