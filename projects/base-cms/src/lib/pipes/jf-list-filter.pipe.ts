import {Pipe, PipeTransform} from '@angular/core'
import {ListItem} from '../resources/classes'

@Pipe({
  name: 'jfListFilter',
  pure: false,
})
export class JfListFilterPipe implements PipeTransform {
  transform(items: ListItem[], filter: ListItem): ListItem[] {
    // console.log('items, filter', items, filter)

    if (!items || !filter) {
      return items
    }
    return items.filter((item: ListItem) => this.applyFilter(item, filter))
  }

  applyFilter(item: ListItem, filter: ListItem): boolean {
    if (typeof item.text === 'string' && typeof filter.text === 'string') {
      return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1)
    } else {
      return !(
        filter.text &&
        item.text &&
        item.text.toString().toLowerCase().indexOf(filter.text.toString().toLowerCase()) === -1
      )
    }
  }
}
