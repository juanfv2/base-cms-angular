import {Component, Input} from '@angular/core'

import {l} from 'projects/first-app/src/environments/l'

import {Person} from 'projects/first-app/src/app/models/_models'

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent {
  @Input() person!: Person

  labels = l
}
