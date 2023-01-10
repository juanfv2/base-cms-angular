import {ComponentFixture, TestBed} from '@angular/core/testing'
import {k} from '../../environments/k'
import {JfHasXFilePipe} from '../../pipes/jf-has-x-file.pipe'
import {DBType, JfCondition} from '../../resources/classes'

import {FileUploadComponent} from './file-upload.component'

describe('FileUploadComponent', () => {
  let component: FileUploadComponent
  let fixture: ComponentFixture<FileUploadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent, JfHasXFilePipe],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
