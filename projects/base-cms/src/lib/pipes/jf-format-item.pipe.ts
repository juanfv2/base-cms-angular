import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
  name: 'jfFormatItem',
})
export class JfFormatItemPipe implements PipeTransform {
  transform(expr: Function, value: any): unknown {
    return expr(value)
  }
}
