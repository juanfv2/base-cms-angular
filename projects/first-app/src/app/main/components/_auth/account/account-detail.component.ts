import {Component, Input, OnDestroy} from '@angular/core'

import {l} from 'projects/first-app/src/environments/l'

import {Account} from 'projects/first-app/src/app/models/_models'

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {
  @Input() account!: Account
  labels = l
}
