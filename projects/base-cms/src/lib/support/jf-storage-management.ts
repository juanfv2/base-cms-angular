import {configs} from '../environments/configs'

export class JfStorageManagement {
  static today() {
    return new Date().toJSON().slice(0, 10)
  }

  static saveCountryInLocalStorage(): any {
    const paths = location.pathname.split('/')

    const dev = paths[configs.path.dev] || ''
    const cName = paths[configs.path.company] || '-'
    const entityGlobalId = paths[configs.path.country] || 'sv'

    localStorage.setItem(`${configs.project_name}:${configs.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(configs.entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(configs.dev, dev)
    JfStorageManagement.setItem(configs.company_name, cName)

    return {dev, entityGlobalId, cName}
  }

  static clearEnvironment(): void {
    const entityGlobalId = `${JfStorageManagement.getItem(configs.entityGlobalId)}`
    const isDev = `${JfStorageManagement.getItem(configs.dev)}`
    const sideBar = `${JfStorageManagement.getItem(configs.isSidebarVisible)}`
    const cName = `${JfStorageManagement.getItem(configs.company_name)}`
    const c = `${JfStorageManagement.getItem(configs.company)}`

    const keys = Object.keys(localStorage)
    // console.log('localStorage', localStorage)
    let i = keys.length

    while (i--) {
      const key = keys[i]
      if (key.indexOf(configs.project_name) > -1) {
        // console.log('key', key)
        localStorage.removeItem(key)
      }
    }

    localStorage.setItem(`${configs.project_name}:${configs.entityGlobalId}`, entityGlobalId)
    JfStorageManagement.setItem(configs.entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(configs.dev, isDev)
    JfStorageManagement.setItem(configs.isSidebarVisible, sideBar)
    JfStorageManagement.setItem(configs.company_name, cName)
    JfStorageManagement.setItem(configs.company, c)
  }
  static currentKey(key: any): string {
    const kkId = localStorage.getItem(`${configs.project_name}:${configs.entityGlobalId}`)
    const kk = `${configs.project_name}:${kkId}:${JfStorageManagement.today()}:${key}`
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
