import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'formatItem',
})
export class FormatItemPipe implements PipeTransform {
  transform(expr: Function, value: any): unknown {
    return expr(value)
  }
}
