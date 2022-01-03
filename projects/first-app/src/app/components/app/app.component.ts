import {Component, OnDestroy, OnInit} from '@angular/core'
import {Title} from '@angular/platform-browser'
import {SwUpdate} from '@angular/service-worker'
import {JfMessageService, JfStorageManagement} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  inDevMode = ''
  message: any
  msgs: any
  mSubscription: any

  constructor(private title: Title, private sWUpdate: SwUpdate, private messageService: JfMessageService) {
    this.inDevMode = `${JfStorageManagement.getItem(k.dev)}`
    this.title.setTitle(`${k.project_name}`)
  }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe((m: any) => (this.message = m))

    if (this.sWUpdate.isEnabled) {
      this.sWUpdate.versionUpdates.subscribe((next) => {
        window.location.reload()
      })
    }

    // this.messageService.info('AppComponent.ngOnInit()', 'AppComponent.ngOnInit()')
  }

  ngOnDestroy() {
    if (this.mSubscription) {
      this.mSubscription.unsubscribe()
    }
  }

  actClose(): void {
    this.message = {}
  }
}
