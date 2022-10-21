import {k} from '../environments/k'
import {JfStorageManagement} from './jf-storage-management'

class LocalStorageMock {
  storage: any = {}
  constructor() {
    this.storage = {}
  }
  get length(): number {
    return Object.keys(this.storage).length
  }

  setItem(key: string | number, value: string) {
    this.storage[key] = value || ''
  }
  getItem(key: string) {
    return key in this.storage ? this.storage[key] : null
  }
  removeItem(key: string | number) {
    delete this.storage[key]
  }
  key(i: any) {
    const keys = Object.keys(this.storage)
    return keys[i] || null
  }
}

describe('JfStorageManagement', () => {
  let localStore = {} as any

  beforeEach(() => {
    window.history.pushState({}, 'Page Title', '/admin/-/sv#/login?with=params&enjoy=true')

    localStore = new LocalStorageMock()

    // spyOn(window.localStorage, 'getItem').and.callFake((key) => (key in localStore ? localStore[key] : null))
    // spyOn(window.localStorage, 'removeItem').and.callFake((key) => (key in localStore ? localStore[key] : null))
    // spyOn(window.localStorage, 'setItem').and.callFake((key, value) => (localStore[key] = value + ''))
    // spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}))
    // spyOnProperty(window.localStorage, 'length', 'get').and.returnValue(Object.keys(localStore).length)
  })

  it('base-path should be "admin/-/sv"', () => {
    const result = JfStorageManagement.saveCountryInLocalStorage()
    expect(result.entityGlobalId).toBe('sv')
    expect(result.cName).toBe('-')
    expect(result.dev).toBe('')

    expect(localStorage.getItem(`${k.project_name}:${k.entityGlobalId}`)).toBe('sv')
  })

  it('base-path should be "clear" storage', () => {
    const result = JfStorageManagement.saveCountryInLocalStorage()
    const cCode = localStorage.getItem(`${k.project_name}:${k.entityGlobalId}`)
    const gIdKey = `${k.project_name}:${cCode}:${JfStorageManagement.today()}:${k.token}`

    JfStorageManagement.setItem(k.token, 'toke-e-en')

    expect(result.entityGlobalId).toBe('sv')
    expect(result.cName).toBe('-')
    expect(result.dev).toBe('')

    // const newLocal1 = JfStorageManagement.getItem(k.token)
    // console.log('newLocal1', gIdKey, newLocal1)
    // console.log('newLocal', localStore)

    JfStorageManagement.clearEnvironment()

    expect(cCode).toBe('sv')

    const newLocal2 = JfStorageManagement.getItem(k.token)

    // console.log('newLocal2', gIdKey, newLocal2)
    // console.log('newLocal', localStore)
    expect(newLocal2).toBe(null)
  })
})
