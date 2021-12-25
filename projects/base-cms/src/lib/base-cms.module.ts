import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbToastModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'

import {JfAddComponentDirective} from './directives/jf-add-component.directive'
import {JfMultiShortMetaDirective} from './directives/jf-multi-short-meta.directive'

import {JfSafePipe} from './pipes/jf-safe.pipe'
import {JfHasXFilePipe} from './pipes/jf-has-x-file.pipe'
import {JfFormatItemPipe} from './pipes/jf-format-item.pipe'

import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {NotFoundComponent} from './components/not-found/not-found.component'
import {SearchInputComponent} from './components/search-input/search-input.component'
import {ToastContainerComponent} from './components/toast-container/toast-container.component'
import {BaseAutoCompleteComponent} from './components/base-auto-complete/base-auto-complete.component'
import {SpinnerLoadingComponent} from './components/spinner-loading/spinner-loading.component'
import {SpinnerSearchingComponent} from './components/spinner-searching/spinner-searching.component'

@NgModule({
  declarations: [
    JfAddComponentDirective,
    JfMultiShortMetaDirective,

    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotFoundComponent,
    SearchInputComponent,
    ToastContainerComponent,
    BaseAutoCompleteComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
  ],
  exports: [
    JfAddComponentDirective,
    JfMultiShortMetaDirective,

    JfSafePipe,
    JfHasXFilePipe,
    JfFormatItemPipe,

    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NotFoundComponent,
    SearchInputComponent,
    ToastContainerComponent,
    BaseAutoCompleteComponent,
    SpinnerLoadingComponent,
    SpinnerSearchingComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    NgbModalModule,
    NgbToastModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbDatepickerModule,
  ],
})
export class BaseCmsModule {}
