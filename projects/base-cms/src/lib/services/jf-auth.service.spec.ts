import {TestBed} from '@angular/core/testing'
import {HttpClientTestingModule} from '@angular/common/http/testing'

import {JfAuthService} from './jf-auth.service'

describe('Services - JfAuthService', () => {
  let service: JfAuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(JfAuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
