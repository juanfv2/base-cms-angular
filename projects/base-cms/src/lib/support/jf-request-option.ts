import {HttpHeaders} from '@angular/common/http'
import {configs} from '../environments/k'
import {JfStorageManagement} from './jf-storage-management'
import {JfUtils} from './jf-utils'

export class JfRequestOption {
  static getRequestOptions(isForLoginPage: boolean = false): any {
    const token = JfRequestOption.isAuthenticate()
    // console.log('getRequestOptions token', token);
    // console.log('getRequestOptions !token', !token);
    // console.log('getRequestOptions isForLoginPage', isForLoginPage);
    const h = {} as any
    if (!isForLoginPage) {
      // si no es peticion de login
      if (!token) {
        // si el token actual es nulo
        JfUtils.go2login()
      }
      h[configs.authorizationK] = 'Bearer ' + token
    }
    const mItem = JfStorageManagement.getItem(configs.entityGlobalId)
    if (mItem) {
      h[configs.entityGlobalK] = mItem
    }
    const mDev = JfStorageManagement.getItem(configs.dev)
    if (mDev) {
      h[configs.dev] = mDev
    }
    return {headers: new HttpHeaders(h)}
  }

  static isAuthenticate(): string | boolean {
    const expire = +`${JfStorageManagement.getItem(configs.expire)}`
    if (expire) {
      const now = new Date().getTime()

      if (expire > now) {
        JfStorageManagement.setItem(configs.expire, `${new Date().getTime() + configs.expireTime * 60 * 60 * 1000}`)

        const token = `${JfStorageManagement.getItem(configs.token)}`
        return token
      }
    }

    return false
  }

  static isAuthorized(realUrl: string): boolean {
    const permissions = JSON.parse(`${JfStorageManagement.getItem(configs.permissions)}`) || []

    const re = /[0-9]+/
    const str = 'show'
    const tempUrl = realUrl.replace(re, str)
    const tempUrlSplitted = tempUrl.split('/')

    const base = tempUrlSplitted[1] || ''
    const section = tempUrlSplitted[2] ? `/${tempUrlSplitted[2]}` : ''
    const evalUrl = `/${base}${section}`

    const indexOf = permissions.indexOf(evalUrl)
    const hasAuthorization = indexOf > -1

    // console.log('            base', `"${base}"`);
    // console.log('         section', `"${section}"`);
    // console.log('         indexOf', `"${indexOf}"`);
    // console.log('         tempUrl', `"${tempUrl}"`);
    // console.log('         evalUrl', `"${evalUrl}"`);
    // console.log('         realUrl', `"${realUrl}"`);
    // console.log('hasAuthorization', hasAuthorization);
    // /\\ //\\ console.log('hasAuthorization', JSON.stringify(permissions));

    return hasAuthorization
  }
}
