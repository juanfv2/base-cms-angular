import {k} from '../environments/k'

export class JfStorageManagement {
  static today() {
    return new Date().toJSON().slice(0, 10)
  }

  static saveCountryInLocalStorage(): any {
    const paths = location.pathname.split('/')

    const dev = paths[k.path.dev] || ''
    const cName = paths[k.path.company] || '-'
    const entityGlobalId = paths[k.path.country] || 'sv'

    localStorage.setItem(`${k.project_name}:${k.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(k.entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(k.dev, dev)
    JfStorageManagement.setItem(k.company_name, cName)

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
      if (key.indexOf(k.project_name) > -1) {
        // console.log('key', key)
        localStorage.removeItem(key)
      }
    }

    localStorage.setItem(`${k.project_name}:${k.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(k.entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(k.dev, isDev)
    JfStorageManagement.setItem(k.isSidebarVisible, sideBar)
    JfStorageManagement.setItem(k.company_name, cName)
    JfStorageManagement.setItem(k.company, c)
  }
  static currentKey(key: any): string {
    const kkId = localStorage.getItem(`${k.project_name}:${k.entityGlobalId}`)
    const kk = `${k.project_name}:${kkId}:${JfStorageManagement.today()}:${key}`
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
}
