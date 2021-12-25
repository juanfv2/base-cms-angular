import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerSearchingComponent } from './spinner-searching.component';

describe('SpinnerSearchingComponent', () => {
  let component: SpinnerSearchingComponent;
  let fixture: ComponentFixture<SpinnerSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerSearchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
