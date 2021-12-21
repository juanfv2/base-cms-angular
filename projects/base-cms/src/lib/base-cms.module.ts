import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import {BaseCmsComponent} from './base-cms.component'
import {SearchInputComponent} from './components/search-input/search-input.component';
import { HasXFilePipe } from './pipes/has-x-file.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { FormatItemPipe } from './pipes/format-item.pipe';
import { BaseAutoCompleteComponent } from './components/base-auto-complete/base-auto-complete.component'

@NgModule({
  declarations: [BaseCmsComponent, SearchInputComponent, HasXFilePipe, SafePipe, FormatItemPipe, BaseAutoCompleteComponent],
  imports: [FormsModule, HttpClientModule],
  exports: [BaseCmsComponent],
})
export class BaseCmsModule {}
