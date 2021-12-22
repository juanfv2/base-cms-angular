import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgbDatepickerModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap'

import {SafePipe} from './pipes/safe.pipe'
import {HasXFilePipe} from './pipes/has-x-file.pipe'
import {FormatItemPipe} from './pipes/format-item.pipe'

import {SearchInputComponent} from './components/search-input/search-input.component'
import {ToastContainerComponent} from './components/toast-container/toast-container.component'
import {BaseAutoCompleteComponent} from './components/base-auto-complete/base-auto-complete.component'

@NgModule({
  declarations: [
    BaseAutoCompleteComponent,
    ToastContainerComponent,
    SearchInputComponent,

    SafePipe,
    HasXFilePipe,
    FormatItemPipe,
  ],
  exports: [
    SearchInputComponent,
    ToastContainerComponent,
    BaseAutoCompleteComponent,

    SafePipe,
    HasXFilePipe,
    FormatItemPipe,
  ],
  imports: [FormsModule, CommonModule, HttpClientModule, NgbDatepickerModule, NgbToastModule],
})
export class BaseCmsModule {}
