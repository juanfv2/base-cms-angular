import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCmsDemoComponent } from './base-cms-demo.component';

describe('BaseCmsComponent', () => {
  let component: BaseCmsDemoComponent;
  let fixture: ComponentFixture<BaseCmsDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCmsDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCmsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
