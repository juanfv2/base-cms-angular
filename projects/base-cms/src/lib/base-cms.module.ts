import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgbDatepickerModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap'

import {JfSafePipe} from './pipes/jf-safe.pipe'
import {JfHasXFilePipe} from './pipes/jf-has-x-file.pipe'
import {JfFormatItemPipe} from './pipes/jf-format-item.pipe'

import {NotFoundComponent} from './components/not-found/not-found.component'
import {SearchInputComponent} from './components/search-input/search-input.component'
import {ToastContainerComponent} from './components/toast-container/toast-container.component'
import {BaseAutoCompleteComponent} from './components/base-auto-complete/base-auto-complete.component'

@NgModule({
  declarations: [
    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    NotFoundComponent,
    SearchInputComponent,
    ToastContainerComponent,
    BaseAutoCompleteComponent,
  ],
  exports: [
    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    NotFoundComponent,
    SearchInputComponent,
    ToastContainerComponent,
    BaseAutoCompleteComponent,
  ],
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule, NgbDatepickerModule, NgbToastModule],
})
export class BaseCmsModule {}
