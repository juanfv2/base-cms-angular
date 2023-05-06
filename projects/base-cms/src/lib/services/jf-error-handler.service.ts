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
    const location = window.location.href
    const navigator: any = {}

    const _id = JfUtils.mStorage.getItem(k._3_user_id)
    const _cc = JfUtils.mStorage.getItem(k._7_entityGlobalId)
    const _td = new Date().toISOString()
    const queue = JfUtils.snakeCase(`${_cc}__admin-angular-u_${_id}_d_${_td}`)

    navigator.queue = queue
    navigator.userAgent = window.navigator.userAgent
    navigator.language = window.navigator.language
    navigator.platform = window.navigator.platform
    navigator.hardwareConcurrency = window.navigator.hardwareConcurrency
    navigator.version = k.versionV

    const err = {message, stack, location, navigator}
    const e = {} as any
    e.payload = JSON.stringify(err)
    e.queue = '-admin-angular-'
    e.container_id = _id

    this.sent2server(e)
  }

  sent2server(e: any) {
    this.crudService.post(k.routes.misc.visorLogErrors + '-index', e).subscribe({
      next: (resp: any) => {
        // console.log('Main.getPermission AngularFireMessaging.4: resp', resp);
      },
      error: (error: any) => {
        // console.log('Main.getPermission AngularFireMessaging error', error);
      },
    })
  }
}
