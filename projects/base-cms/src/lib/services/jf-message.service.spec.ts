import {TestBed} from '@angular/core/testing'

import {JfMessageService} from './jf-message.service'

describe('Services - JfMessageService', () => {
  let service: JfMessageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(JfMessageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
