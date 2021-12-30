import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'base-cms-many-to-many',
  templateUrl: './many-to-many.component.html',
  styleUrls: ['./many-to-many.component.scss'],
})
export class ManyToManyComponent implements OnInit {
  @Input() lModel = {} as any
  @Input() lField = ''
  @Input() gOptions = [] as any[]

  @Output() rm = new EventEmitter<any>()
  @Output() go = new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  rm2model(model: any) {
    this.rm.emit(model)
  }

  go2model(model: any) {
    this.go.emit(model)
  }
}
