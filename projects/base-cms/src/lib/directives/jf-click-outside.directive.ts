import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core'

@Directive({
  selector: '[baseCmsJfClickOutside]',
})
export class JfClickOutsideDirective {
  @Output() baseCmsJfClickOutside = new EventEmitter<MouseEvent>()

  constructor(private _elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return
    }

    const clickedInside = this._elementRef.nativeElement.contains(targetElement)
    if (!clickedInside) {
      this.baseCmsJfClickOutside.emit(event)
    }
  }
}
