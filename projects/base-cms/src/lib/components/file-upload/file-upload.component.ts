import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'

import {FileUploader, FileUploaderOptions} from 'ng2-file-upload'

import {JfMessageService} from '../../services/jf-message.service'

import {JfStorageManagement} from '../../support/jf-storage-management'
import {JfRequestOption} from '../../support/jf-request-option'
import {JfUtils} from '../../support/jf-utils'

import {JfCondition} from '../../resources/classes'
import {XFile} from '../../resources/models'

export const FILE_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploadComponent),
  multi: true,
}

@Component({
  selector: 'base-cms-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [FILE_UPLOAD_CONTROL_VALUE_ACCESSOR],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  @Input() error: any
  @Input() labels: any = {}
  @Input() label = ''
  @Input() name = ''
  @Input() allowedTypes?: string[]
  @Input() landscape = 'landscape'
  @Input() minHeight = '125px'
  @Input() maxHeight = '250px'
  @Input() maxFileSize?: number
  @Input() iWidth = 0
  @Input() iHeight = 0
  @Input() url2showStaticImage?: string
  @Input() url2send?: string
  @Input() additionalParameter: any
  @Input() autoUpload = true
  @Input() hideProcess = false
  @Input() showPublicPath = true
  @Input() allowMultiples = false
  @Input() parametersBeforeFiles = true
  @Input() withColors = false

  mXXfile = {} as XFile
  @Input()
  public get value(): any {
    return this.mXXfile
  }
  public set value(value: any) {
    // console.log('set value', value)
    if (value) {
      this.mXXfile = value
    }
    this.prepareOptions()
  }

  @Output() finish = new EventEmitter<any>()
  @Output() uploaderQueue = new EventEmitter<any>()

  url2uploadStr = ''
  snapshot: any
  url2showInSquare: any = ''
  hasBaseDropZoneOver?: boolean
  imgLoading = ''
  uploader = new FileUploader({} as FileUploaderOptions)

  constructor(private messageService: JfMessageService) {}

  ngOnInit(): void {
    this.imgLoading = this.labels.k.loading
    this.prepare2server()
  }

  prepareOptions(): void {
    this.url2upload()

    this.setUpUrlsImageAndFile()

    this.uploader.setOptions(this.getOptions())
  }

  private url2upload() {
    // console.log('this.mXXFile', this.mXXfile)
    if (this.mXXfile) {
      this.url2uploadStr = `${this.labels.k.routes.backEnd.root}${this.labels.k.routes.api}${
        this.labels.k.routes.misc.file
      }${this.mXXfile.entity}/${this.mXXfile.field}/${this.mXXfile.entity_id > 0 ? this.mXXfile.entity_id : '0'}/${
        this.withColors ? 1 : 0
      }`
    }
    // console.log('this.url2uploadStr', this.url2uploadStr)
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e
  }

  dropped(files: any): void {
    this.url2upload()
    // console.log('dropped', files);
    if (files.length > 1 && !this.allowMultiples) {
      return
    }

    if (!files) {
      return
    }

    if (this.maxFileSize && files[0].size > this.maxFileSize) {
      return
    }

    if (!this.url2showStaticImage) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0]) // read file as data url
      reader.onload = (event: any) => {
        // called once readAsDataURL is completed
        this.url2showInSquare = event.target.result
      }
    }

    // this.uploader.addToQueue(files);
  }

  prepare2server(): void {
    this.url2upload()
    // this.uploader.onProgressItem = (fileItem, progress: any) => {
    //     // fileItem.withCredentials = false;
    //     console.log('process', progress);
    // };

    if (!this.url2showStaticImage || !this.autoUpload) {
      this.uploader.onAfterAddingFile = (item: any) => {
        // console.log('item', item);
        if (this.mXXfile) {
          this.mXXfile.field = this.name
          this.mXXfile.nameOriginal = item.file.name
          this.select({item: this.mXXfile})
          this.uploaderQueue.emit(new JfCondition(this.name, this.uploader))
        }
      }
    }

    this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('onErrorItem     item:', item);
      // console.log('onErrorItem response:', response);
      // console.log('onErrorItem   status:', status);
      // console.log('onErrorItem  headers:', headers);
      this.error = JfUtils.jsonValidated(response) || {message: 'Error'}
      this.uploader.clearQueue()
    }

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      // console.log('onCompleteItem:', item);
      // console.log('onCompleteItem:', response);
      // console.log('onCompleteItem:', status);
      // console.log('onCompleteItem:', headers);
      const resp1 = JSON.parse(response)
      const resp2 = resp1.data[this.name]
      // console.log('resp1', resp1);
      // console.log('resp2', resp2);
      this.mXXfile = resp2

      this.finish.emit(new JfCondition(this.name, this.mXXfile))

      this.url2showInSquare = this.imgLoading

      this.setUpUrlsImageAndFile(true)

      item.remove()

      if (!this.allowMultiples) {
        this.messageService.success(this.labels.k.project_name, 'Subido')
      }
    }
  }

  private getOptions(): FileUploaderOptions {
    return {
      headers: [
        {name: 'Accept', value: 'application/json'},
        {name: this.labels.k.authorizationK, value: `Bearer ${JfRequestOption.isAuthenticate()}`},
        {name: this.labels.k.entityGlobalK, value: JfStorageManagement.getItem(this.labels.k.entityGlobalId)},
        {name: this.labels.k.dev, value: JfStorageManagement.getItem(this.labels.k.dev)},
        {name: 'isMulti', value: this.allowMultiples ? '1' : '0'},
      ],
      isHTML5: true,
      itemAlias: this.name,
      autoUpload: this.autoUpload,
      maxFileSize: this.maxFileSize,
      url: this.url2send || this.url2uploadStr,
      allowedMimeType: this.allowedTypes,
      additionalParameter: this.additionalParameter,
      parametersBeforeFiles: this.parametersBeforeFiles,
    } as FileUploaderOptions
  }

  private setUpUrlsImageAndFile(uploaded: boolean = false): void {
    if (this.url2showStaticImage) {
      if (this.mXXfile && this.mXXfile.nameOriginal && !this.allowMultiples) {
        this.label = this.mXXfile.nameOriginal
      }
    }
  }

  // Determines if the upload task is active

  isActive(snapshot: any): boolean {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  select(value: any): void {
    this.value = value ? value.item : null
    this.fnTouched()
    this.fnChange(this.value)
    // this.searching = false;
    // this.searchFailed = this.mXXfile === null;
  }

  /** OnChange */
  private fnChange = (_: any) => {}

  /** OnTouched */
  private fnTouched = () => {}

  /** ControlValueAccessor.writeValue */
  writeValue(value: any): void {
    this.value = value
  }

  /** ControlValueAccessor.registerOnChange */
  registerOnChange(fn: any): void {
    this.fnChange = fn
  }

  /** ControlValueAccessor.registerOnTouched */
  registerOnTouched(fn: any): void {
    this.fnTouched = fn
  }

  /** ControlValueAccessor.setDisabledState */
  setDisabledState(isDisabled: boolean): void {}
}
