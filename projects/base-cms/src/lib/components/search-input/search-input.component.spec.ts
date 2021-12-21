import {ComponentFixture, TestBed} from '@angular/core/testing'
import {FormsModule} from '@angular/forms'

import {SearchInputComponent} from './search-input.component'

describe('SearchInputComponent', () => {
  let component: SearchInputComponent
  let fixture: ComponentFixture<SearchInputComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchInputComponent],
      imports: [FormsModule],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
