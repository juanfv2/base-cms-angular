import {Directive, Input, ViewContainerRef} from '@angular/core'

@Directive({
  selector: '[baseCmsJfAddComponentFile]',
})
export class JfAddComponentFileDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
