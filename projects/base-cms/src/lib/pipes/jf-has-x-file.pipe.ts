import {Pipe, PipeTransform} from '@angular/core'
import {configs} from '../environments/configs'

/**
 *
 * [src]="company.logo | hasXFile: 500:100"
 *
 */
@Pipe({
  name: 'jfHasXFile',
})
export class JfHasXFilePipe implements PipeTransform {
  transform(image: any, w = 0, h = 0): string {
    // console.log('image', image)
    const kkId = localStorage.getItem(`${configs.project_name}:${configs.entityGlobalId}`) || 'sv'
    const p = configs.routes.backEnd.root + configs.routes.api + configs.routes.misc.file
    const cc = `?rCountry=${kkId}`
    let ui = `${p}e/f/0/${w}/${h}/---${cc}`

    if (image && image.id) {
      ui = `${p}${image.entity}/${image.field}/${image.entity_id}/${w}/${h}/${image.name}${cc}`

      if (w === 0 && h === 0) {
        ui = `${configs.routes.backEnd.sRoot}${image.publicPath}${cc}`
      }
    }

    return ui
  }
}
