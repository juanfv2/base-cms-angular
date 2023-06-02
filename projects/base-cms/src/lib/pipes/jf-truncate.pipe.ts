import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'jfTruncate',
})
export class JfTruncatePipe implements PipeTransform {
  transform(value: any, limit = 25, trail = '...'): unknown {
    if (value) {
      if (limit) {
        return value.length > limit ? `${value.substring(0, limit)} ${trail}` : value
      }
      return value
    }
    return ''
  }
}
