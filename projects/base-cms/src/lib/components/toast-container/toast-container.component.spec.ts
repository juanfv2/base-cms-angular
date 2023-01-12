import {ComponentFixture, TestBed} from '@angular/core/testing'
import {NgbToastModule} from '@ng-bootstrap/ng-bootstrap'
import {JfMessageService} from '../../services/jf-message.service'

import {ToastContainerComponent} from './toast-container.component'

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent
  let fixture: ComponentFixture<ToastContainerComponent>
  let messageService: JfMessageService
  const messageServiceStub: jasmine.SpyObj<JfMessageService> = jasmine.createSpyObj(
    'messageService',
    ['remove'],
    ['toasts']
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastContainerComponent],
      imports: [NgbToastModule],
      providers: [{provide: JfMessageService, useValue: messageServiceStub}],
    }).compileComponents()
    // messageService = TestBed.inject(JfMessageService)

    fixture = TestBed.createComponent(ToastContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
