import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'

import {FileUploadModule} from 'ng2-file-upload'

import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbToastModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap'

import {JfAddComponentDirective} from './directives/jf-add-component.directive'
import {JfMultiSortMetaDirective} from './directives/jf-multi-short-meta.directive'

import {JfSafePipe} from './pipes/jf-safe.pipe'
import {JfHasXFilePipe} from './pipes/jf-has-x-file.pipe'
import {JfFormatItemPipe} from './pipes/jf-format-item.pipe'

import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {SearchInputComponent} from './components/search-input/search-input.component'
import {ToastContainerComponent} from './components/toast-container/toast-container.component'
import {BaseCmsAutoCompleteComponent} from './components/base-cms-auto-complete/base-cms-auto-complete.component'
import {SpinnerLoadingComponent} from './components/spinner-loading/spinner-loading.component'
import {SpinnerSearchingComponent} from './components/spinner-searching/spinner-searching.component'
import {FileUploadComponent} from './components/file-upload/file-upload.component'
import {MessageModalComponent} from './components/message-modal/message-modal.component'
import {BaseCmsListComponent} from './components/base-cms-list/base-cms-list.component'

@NgModule({
  declarations: [
    JfAddComponentDirective,
    JfMultiSortMetaDirective,

    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotFoundComponent,
    FileUploadComponent,
    SearchInputComponent,
    BaseCmsListComponent,
    MessageModalComponent,
    ToastContainerComponent,
    BaseCmsAutoCompleteComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
  ],
  exports: [
    JfAddComponentDirective,
    JfMultiSortMetaDirective,

    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotFoundComponent,
    FileUploadComponent,
    SearchInputComponent,
    BaseCmsListComponent,
    MessageModalComponent,
    ToastContainerComponent,
    BaseCmsAutoCompleteComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,

    FileUploadModule,

    NgbModalModule,
    NgbToastModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
  ],
})
export class BaseCmsModule {}
