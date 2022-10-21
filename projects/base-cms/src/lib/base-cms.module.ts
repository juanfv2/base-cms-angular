import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'

import {FileUploadModule} from 'ng2-file-upload'
import {OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl} from 'ng-pick-datetime-ex'
import {JfDefaultIntlService} from './services/jf-default.intl.service'

import {
  NgbCollapseModule,
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
import {ManyToManyComponent} from './components/many-to-many/many-to-many.component'

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
    ManyToManyComponent,
    SearchInputComponent,
    BaseCmsListComponent,
    MessageModalComponent,
    ToastContainerComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
    BaseCmsAutoCompleteComponent,
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
    ManyToManyComponent,
    SearchInputComponent,
    BaseCmsListComponent,
    MessageModalComponent,
    ToastContainerComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
    BaseCmsAutoCompleteComponent,
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

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [{provide: OwlDateTimeIntl, useClass: JfDefaultIntlService}],
})
export class BaseCmsModule {}
