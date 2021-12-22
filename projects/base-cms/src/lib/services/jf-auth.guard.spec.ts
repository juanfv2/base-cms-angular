import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {TestBed} from '@angular/core/testing'

import {JfAuthGuard} from './jf-auth.guard'

describe('Services - AuthGuard', () => {
  let guard: JfAuthGuard

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    guard = TestBed.inject(JfAuthGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
