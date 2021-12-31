import {ComponentFixture, TestBed} from '@angular/core/testing'
import {configs} from '../../environments/configs'
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
    component.labels = {
      misc: {
        k: configs,
        slug: new DBType('Slug', 'stores.slug', 'string'),
        csv: `images/admin/ic-csv.svg`,
        zip: `images/admin/ic-zip.svg`,
        pdf: `images/admin/ic-pdf.svg`,
        upload: `images/admin/ic-upload.svg`,
        loading: `images/admin/ic-loading.svg`,
        pageLimit: [
          new JfCondition('5', 5),
          new JfCondition('10', 10),
          new JfCondition('50', 50),
          new JfCondition('100', 100),
          new JfCondition('Todos', -1),
        ],
      },
    }
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
