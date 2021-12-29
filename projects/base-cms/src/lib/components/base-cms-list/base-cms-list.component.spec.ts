import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCmsListComponent } from './base-cms-list.component';

describe('BaseCmsListComponent', () => {
  let component: BaseCmsListComponent;
  let fixture: ComponentFixture<BaseCmsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseCmsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
