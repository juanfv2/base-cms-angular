import {Component, Input} from '@angular/core'

@Component({
  selector: 'lib-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  @Input() queryFieldOptions?: any[]
  @Input() conditionalOptions?: any[]
  @Input() operatorOptions?: any[]
  @Input() modelSearch: any = {}
  @Input() condition: any = {}
  @Input() searchWithFile = false
  mRef: any

  deleteField() {
    this.remove()
    this.mRef.destroy()
  }

  // remove the passed element from the content array.
  remove() {
    if (this.searchWithFile) {
      const indexToRemove: number = this.modelSearch.conditionsWithFile.indexOf(this.condition)
      this.modelSearch.conditionsWithFile = this.modelSearch.conditionsWithFile.filter(
        (val: any, i: number) => i !== indexToRemove
      )
    } else {
      const indexToRemove: number = this.modelSearch.conditions.indexOf(this.condition)
      this.modelSearch.conditions = this.modelSearch.conditions.filter((val: any, i: number) => i !== indexToRemove)
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.field === c2.field : c1 === c2
  }
}
