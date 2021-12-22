import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {BaseCmsModule} from 'base-cms'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BaseCmsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
