import {ComponentFixture, TestBed} from '@angular/core/testing'
import {RouterTestingModule} from '@angular/router/testing'

import {BaseAutoCompleteComponent} from './base-auto-complete.component'

describe('BaseAutoCompleteComponent', () => {
  let component: BaseAutoCompleteComponent
  let fixture: ComponentFixture<BaseAutoCompleteComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseAutoCompleteComponent],
      imports: [RouterTestingModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAutoCompleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
