import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {DragDropModule} from '@angular/cdk/drag-drop'

import {FileUploadModule} from 'ng2-file-upload'
import {OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl} from 'ng-pick-datetime-ex'
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown'

import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbToastModule,
  NgbTooltipModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'

import {JfDefaultIntlService} from './services/jf-default.intl.service'

import {StickyTableDirective} from './directives/sticky-table.directive'
import {StickyTableCellDirective} from './directives/sticky-table-cell.directive'
import {JfMultiSortMetaDirective} from './directives/jf-multi-sort-meta.directive'
import {JfAddComponentDirective} from './directives/jf-add-component.directive'
import {JfAddComponentFileDirective} from './directives/jf-add-component-file.directive'

import {JfSafePipe} from './pipes/jf-safe.pipe'
import {JfHasXFilePipe} from './pipes/jf-has-x-file.pipe'
import {JfFormatItemPipe} from './pipes/jf-format-item.pipe'
import {JfTruncatePipe} from './pipes/jf-truncate.pipe'

import {HeaderComponent} from './components/header/header.component'
import {FooterComponent} from './components/footer/footer.component'
import {SubMenuComponent} from './components/sidebar/menu/sub-menu.component'
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
import {GenericTableComponent} from './components/generic-table/generic-table.component'
import {SearchGlobalComponent} from './components/search-global/search-global.component'

const _components = [
  StickyTableDirective,
  StickyTableCellDirective,
  JfAddComponentDirective,
  JfAddComponentFileDirective,
  JfMultiSortMetaDirective,

  JfSafePipe,
  JfTruncatePipe,
  JfHasXFilePipe,
  JfFormatItemPipe,

  SubMenuComponent,
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  NotFoundComponent,
  FileUploadComponent,
  ManyToManyComponent,

  SearchInputComponent,
  SearchGlobalComponent,
  GenericTableComponent,

  BaseCmsListComponent,
  MessageModalComponent,
  ToastContainerComponent,
  SpinnerLoadingComponent,
  SpinnerSearchingComponent,
  BaseCmsAutoCompleteComponent,
]

@NgModule({
  declarations: [..._components],
  exports: [..._components],
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
    NgbPaginationModule,

    DragDropModule,

    NgMultiSelectDropDownModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [{provide: OwlDateTimeIntl, useClass: JfDefaultIntlService}],
})
export class BaseCmsModule {}
