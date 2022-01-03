import {Component, OnInit} from '@angular/core'
import {JfStorageManagement} from 'base-cms'
import {k} from 'projects/first-app/src/environments/k'
import {l} from 'projects/first-app/src/environments/l'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  labels = l
  inDevMode = ''

  constructor() {
    this.inDevMode = `${JfStorageManagement.getItem(k.dev)}`
  }
}
