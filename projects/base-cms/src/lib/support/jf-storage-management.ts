import {Constants} from '../environments/constants'

export class JfStorageManagement {
  static kkkEntityGlobalId = `${Constants.project_name_short}:${Constants._4_company}:${Constants._7_entityGlobalId}`

  static saveCountryInLocalStorage(): any {
    const paths = JfStorageManagement.getPath()

    // console.log('saveCountryInLocalStorage.paths', paths)
    // console.log('saveCountryInLocalStorage.paths', location.pathname)
    // console.log('saveCountryInLocalStorage.paths', location.hash)
    // console.log('saveCountryInLocalStorage.paths', k.path)

    const dev = paths[Constants.path.dev] === 'dev' ? 'dev' : ''
    const cName = paths[Constants.path.company] || 'admin'
    const entityGlobalId = paths[Constants.path.country] || 'sv'

    JfStorageManagement.setItem(Constants._7_entityGlobalId, entityGlobalId)
    JfStorageManagement.setItem(Constants._5_company_name, cName)
    JfStorageManagement.setItem(Constants.dev, dev)

    Constants.routes.frontEnd.name = cName
    Constants.entityGlobalV = entityGlobalId

    return {dev, entityGlobalId, cName}
  }

  static clearEnvironment(storage = localStorage): void {
    const paths = JfStorageManagement.getPath()
    const cName = paths[Constants.path.company] || 'admin'
    const entityGlobalId = paths[Constants.path.country] || 'sv'
    const sessionKey = `${Constants.project_name_short}:${cName}:${entityGlobalId}`
    const _2save = [
      Constants.dev,
      Constants._4_company,
      Constants._5_company_name,
      Constants._7_entityGlobalId,
      Constants._8_isSideBarVisible,
      Constants._12_entityGlobalTimeZone,
      Constants._13_entityGlobalTimeZoneStr,
    ]
    const saved = []

    for (let index = 0; index < _2save.length; index++) {
      const element = `${JfStorageManagement.getItem(_2save[index])}`
      saved.push(element)
    }

    const keys = Object.keys(storage)
    let i = keys.length

    while (i--) {
      const key = keys[i]
      if (key.indexOf(sessionKey) > -1) {
        storage.removeItem(key)
      }
    }

    for (let index = 0; index < saved.length; index++) {
      const elementName = _2save[index]
      const element = saved[index]
      JfStorageManagement.setItem(elementName, element)
    }
  }

  static currentKey(key: any): string {
    const paths = JfStorageManagement.getPath()
    const cName = paths[Constants.path.company] || 'admin'
    const entityGlobalId = paths[Constants.path.country] || 'sv'
    const sessionKey = `${Constants.project_name_short}:${cName}:${entityGlobalId}`
    const kk = `${sessionKey}:${JfStorageManagement.today()}:${key}`
    return kk
  }

  static getItem(key: any, session = false): string | null {
    const kk = this.currentKey(key)
    const store = session ? sessionStorage : localStorage
    const vr = store.getItem(kk)
    return vr
  }

  static setItem(key: any, v: string, session = false): void {
    const kk = this.currentKey(key)
    const store = session ? sessionStorage : localStorage
    return store.setItem(kk, v)
  }

  static removeItem(key: string, session = false): void {
    const kk = this.currentKey(key)
    const store = session ? sessionStorage : localStorage
    return store.removeItem(kk)
  }

  static today() {
    return new Date().toJSON().slice(0, 10)
  }

  static getPath() {
    const _path = location.pathname === '/' ? '' : location.pathname
    const url = _path || location.hash
    const paths = url.split('/')
    return paths
  }
}
