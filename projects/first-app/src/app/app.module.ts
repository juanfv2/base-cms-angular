import {BaseCmsModule, JfUtils, JfAuthGuard, JfAuthService, JfMessageService} from 'base-cms'

import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {APP_BASE_HREF, CommonModule} from '@angular/common'
import {BrowserModule} from '@angular/platform-browser'
import {ServiceWorkerModule} from '@angular/service-worker'

import {NgIdleModule} from '@ng-idle/core'

import {AppRoutingModule} from './app.module.routing'

import {environment} from '../environments/environment'
import {k} from '../environments/k'

import {AppComponent} from './components/app/app.component'
import {LoginComponent} from './components/login/login.component'
import {AdminComponent} from './components/admin/admin.component'

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BaseCmsModule,
    ReactiveFormsModule,

    NgIdleModule.forRoot(),
    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: environment.production,
       // Register the ServiceWorker as soon as the app is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),
  ],
  providers: [
    {provide: APP_BASE_HREF, useFactory: JfUtils.getBaseLocation},
    JfAuthGuard,
    JfAuthService,
    JfMessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
