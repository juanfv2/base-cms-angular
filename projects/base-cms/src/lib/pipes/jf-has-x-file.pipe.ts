import {Pipe, PipeTransform} from '@angular/core'
import {Constants} from '../environments/constants'

/**
 *
 * [src]="company.logo | hasXFile: 500:100"
 *
 */
@Pipe({
  name: 'jfHasXFile',
})
export class JfHasXFilePipe implements PipeTransform {
  transform(image: any, w = 0, h = 0, params = ''): string {
    // console.log('image', image)
    const p = Constants.routes.backEnd.rootServer + Constants.routes.api + Constants.routes.misc.file
    const cc = params ? `${params}` : ''
    let ui = `${p}e/f/0/${w}/${h}/---${cc}`

    if (image && image.id) {
      ui = `${p}${image.entity}/${image.field}/${image.entity_id}/${w}/${h}/${image.name}${cc}`

      if (w === 0 && h === 0) {
        ui = `${Constants.routes.backEnd.sRoot}${image.publicPath}${cc}`
      }
    }

    return ui
  }
}
