import {ComponentFixture, TestBed} from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'
import {JfHasXFilePipe} from '../../pipes/jf-has-x-file.pipe'

import {FileUploadComponent} from './file-upload.component'

describe('FileUploadComponent', () => {
  let component: FileUploadComponent
  let fixture: ComponentFixture<FileUploadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent, JfHasXFilePipe],
      imports: [
        FormsModule,
        FileUploadModule,
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FileUploadComponent)

    component = fixture.componentInstance
    component.labels = {
      misc: {
        k: {
          loading: '',
          routes: {
            backEnd: {
              root: '/',
            },
            misc: {
              file: '/file',
            },
          },
        },
      },
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
