import {DomSanitizer} from '@angular/platform-browser'
import {SafePipe} from './safe.pipe'

describe('Pipes/SafePipe', () => {
  it('create an instance', () => {
    expect(new SafePipe({} as DomSanitizer)).toBeTruthy()
    // const pipe = new SafePipe();
    // expect(pipe).toBeTruthy();
  })
})
