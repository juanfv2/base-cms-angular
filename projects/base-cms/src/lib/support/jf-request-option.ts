import {HttpHeaders} from '@angular/common/http'
import {k} from '../environments/k'
import {JfStorageManagement} from './jf-storage-management'
import {JfUtils} from './jf-utils'

export class JfRequestOption {
  static getRequestOptions(withAuth: boolean = true): any {
    const token = JfRequestOption.isAuthenticate()
    // console.log('getRequestOptions withAuth', withAuth)
    // console.log('getRequestOptions    token', token)
    // console.log('getRequestOptions   !token', !token)
    const h = {} as any
    if (withAuth) {
      // si no es petición de login
      if (!token) {
        // si el token actual es nulo
        JfUtils.go2login()
      }
      h[k.authorizationK] = 'Bearer ' + token
    }
    const mItem = JfStorageManagement.getItem(k.entityGlobalId)
    if (mItem) {
      h[k.entityGlobalK] = mItem
    }
    const mDev = JfStorageManagement.getItem(k.dev)
    if (mDev) {
      h[k.dev] = mDev
    }
    return {headers: new HttpHeaders(h)}
  }

  static isAuthenticate(): string | boolean {
    const expire = +`${JfStorageManagement.getItem(k.expire)}`
    if (expire) {
      const now = new Date().getTime()

      if (expire > now) {
        JfStorageManagement.setItem(k.expire, `${new Date().getTime() + k.expireTime * 60 * 60 * 1000}`)

        const token = `${JfStorageManagement.getItem(k.token)}`
        return token
      }
    }

    return false
  }

  static isAuthorized(realUrl: string): boolean {
    const permissions = JSON.parse(`${JfStorageManagement.getItem(k.permissions)}`) || []

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
