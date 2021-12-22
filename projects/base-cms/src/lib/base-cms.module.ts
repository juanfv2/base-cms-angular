import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {NgbDatepickerModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap'

import {BaseCmsDemoComponent} from './base-cms-demo.component'
import {SearchInputComponent} from './components/search-input/search-input.component'
import {BaseAutoCompleteComponent} from './components/base-auto-complete/base-auto-complete.component'

import {SafePipe} from './pipes/safe.pipe'
import {HasXFilePipe} from './pipes/has-x-file.pipe'
import {FormatItemPipe} from './pipes/format-item.pipe'

@NgModule({
  declarations: [
    BaseCmsDemoComponent,
    SearchInputComponent,
    HasXFilePipe,
    SafePipe,
    FormatItemPipe,
    BaseAutoCompleteComponent,
  ],
  imports: [FormsModule, CommonModule, HttpClientModule, NgbDatepickerModule, NgbToastModule],
  exports: [BaseCmsDemoComponent, BaseAutoCompleteComponent],
})
export class BaseCmsModule {}
