import {HttpClientTestingModule} from '@angular/common/http/testing'
import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'

import {BaseCmsAutoCompleteComponent} from './base-cms-auto-complete.component'

describe('BaseAutoCompleteComponent', () => {
  let component: BaseCmsAutoCompleteComponent
  let fixture: ComponentFixture<BaseCmsAutoCompleteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseCmsAutoCompleteComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCmsAutoCompleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
