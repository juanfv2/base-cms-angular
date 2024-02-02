import {Component, OnInit} from '@angular/core'
import {Constants} from '../../environments/constants'

@Component({
  selector: 'base-cms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  project_name = Constants.project_name
  today = new Date()
  constructor() {}

  ngOnInit(): void {}
}
