import {ErrorHandler, Injectable} from '@angular/core'

import {k} from '../environments/k'
import {JfUtils} from '../support/jf-utils'
import {JfCrudService} from './jf-crud.service'

@Injectable({
  providedIn: 'root',
})
export class JfErrorHandlerService implements ErrorHandler {
  constructor(private crudService: JfCrudService) {}

  handleError(error: any): void {
    const message = error.message ? error.message : error.toString()
    const stack = error.stack
    const err = {message, stack}

    // console.log('-error', error)
    // console.log('error', JSON.stringify(error))

    const _id = Number(k.getItem(k.user_id))
    const _cc = k.getItem(k.entityGlobalId)
    const _td = new Date().toISOString()
    const e: any = {}
    e.payload = JSON.stringify(err)
    e.queue = JfUtils.snakeCase(`${_cc}__admin-angular_${_id}__${_td}`)
    e.container_id = _id

    this.sent2server(e)
  }

  sent2server(e: any) {
    this.crudService.post(k.routes.files.visor_log_errors + '-index', e).subscribe({
      next: (resp: any) => {
        // console.log('Main.getPermission AngularFireMessaging.4: resp', resp);
      },
      error: (error: any) => {
        // console.log('Main.getPermission AngularFireMessaging error', error);
      },
    })
  }
}
