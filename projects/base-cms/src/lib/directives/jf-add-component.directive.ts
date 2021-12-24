import {Directive, ViewContainerRef} from '@angular/core'

@Directive({
  selector: '[baseCmsJfAddComponent]',
})
export class JfAddComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
