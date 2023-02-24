import {ErrorHandler, Injectable} from '@angular/core'

import {k} from '../environments/k'
import {JfStorageManagement} from '../support/jf-storage-management'
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
    const location = window.location.href
    const err = {message, stack, location}

    // console.log('error', err)
    // console.log('-error', error)

    const _id = Number(JfStorageManagement.getItem(k.user_id))
    const _cc = JfStorageManagement.getItem(k.entityGlobalId)
    const _td = new Date().toISOString()
    const e: any = {}
    e.payload = JSON.stringify(err)
    e.queue = JfUtils.snakeCase(`${_cc}__admin-angular_${_id}__${_td}`)
    e.container_id = _id

    this.sent2server(e)
  }

  sent2server(e: any) {
    this.crudService.post(k.routes.misc.visor_log_errors + '-index', e).subscribe({
      next: (resp: any) => {
        // console.log('Main.getPermission AngularFireMessaging.4: resp', resp);
      },
      error: (error: any) => {
        // console.log('Main.getPermission AngularFireMessaging error', error);
      },
    })
  }
}
