import {ViewContainerRef} from '@angular/core'
import {JfAddComponentDirective} from './jf-add-component.directive'

describe('JfAddComponentDirective', () => {
  let DummyComponent: ViewContainerRef

  it('should create an instance', () => {
    const directive = new JfAddComponentDirective(DummyComponent)
    expect(directive).toBeTruthy()
  })
})
