import {k} from '../environments/k'

export class JfStorageManagement {
  static saveCountryInLocalStorage(): any {
    const paths = JfStorageManagement.getPath()
    console.log('saveCountryInLocalStorage.paths', paths)
    console.log('saveCountryInLocalStorage.paths', location.pathname)
    console.log('saveCountryInLocalStorage.paths', location.hash)

    let dev = paths[k.path.dev] === 'dev' ? 'dev' : ''
    let cName = paths[k.path.company] || 'admin'
    let entityGlobalId = paths[k.path.country] || 'sv'

    localStorage.setItem(`${k.project_name_short}:${k.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(k.dev, dev)
    JfStorageManagement.setItem(k.company_name, cName)
    JfStorageManagement.setItem(k.entityGlobalId, entityGlobalId)

    return {dev, entityGlobalId, cName}
  }

  static clearEnvironment(): void {
    const entityGlobalId = `${JfStorageManagement.getItem(k.entityGlobalId)}`
    const isDev = `${JfStorageManagement.getItem(k.dev)}`
    const sideBar = `${JfStorageManagement.getItem(k.isSidebarVisible)}`
    const cName = `${JfStorageManagement.getItem(k.company_name)}`
    const c = `${JfStorageManagement.getItem(k.company)}`

    const keys = Object.keys(localStorage)
    // console.log('localStorage', localStorage)
    let i = keys.length

    while (i--) {
      const key = keys[i]
      if (key.indexOf(cName) > -1) {
        localStorage.removeItem(key)
      }
    }

    localStorage.setItem(`${k.project_name_short}:${k.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(k.entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(k.dev, isDev)
    JfStorageManagement.setItem(k.isSidebarVisible, sideBar)
    JfStorageManagement.setItem(k.company_name, cName)
    JfStorageManagement.setItem(k.company, c)
  }

  static currentKey(key: any): string {
    const paths = JfStorageManagement.getPath()
    let cName = paths[k.path.company] || 'admin'
    const kkId = localStorage.getItem(`${k.project_name_short}:${k.entityGlobalId}`)
    const kk = `${k.project_name_short}:${kkId}:${JfStorageManagement.today()}:${key}`
    return kk
  }

  static getItem(key: any): string | null {
    const kk = this.currentKey(key)
    const vr = localStorage.getItem(kk)
    return vr
  }

  static setItem(key: any, v: string): void {
    const kk = this.currentKey(key)
    return localStorage.setItem(kk, v)
  }

  static removeItem(key: string): void {
    const kk = this.currentKey(key)
    return localStorage.removeItem(kk)
  }

  static getPath() {
    const _path = location.pathname === '/' ? '' : location.pathname
    const url = _path || location.hash
    const paths = url.split('/')
    return paths
  }

  static today() {
    return new Date().toJSON().slice(0, 10)
  }
}
