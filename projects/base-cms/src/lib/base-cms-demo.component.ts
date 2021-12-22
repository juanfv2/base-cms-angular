import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'base-cms-demo',
  template: `
    <div style="background: red; width: 100px; height: 100px; display: block;color: yellow">
      <p>base-cms works!!! !!!</p>
      <div>demo?</div>
    </div>
  `,
  styles: [],
})
export class BaseCmsDemoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
