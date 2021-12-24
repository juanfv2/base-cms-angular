import {Component, OnInit} from '@angular/core'
import {configs} from '../../environments/k'

@Component({
  selector: 'base-cms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  project_name = configs.project_name
  today = new Date()
  constructor() {}

  ngOnInit(): void {}
}
