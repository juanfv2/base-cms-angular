import {DomSanitizer} from '@angular/platform-browser'
import {JfSafePipe} from './jf-safe.pipe'

describe('Pipes/JfSafePipe', () => {
  it('create an instance', () => {
    expect(new JfSafePipe({} as DomSanitizer)).toBeTruthy()
    // const pipe = new SafePipe();
    // expect(pipe).toBeTruthy();
  })
})
