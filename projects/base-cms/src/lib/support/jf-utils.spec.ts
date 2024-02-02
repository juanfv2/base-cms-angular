import {Constants} from '../environments/constants'
import {JfStorageManagement} from './jf-storage-management'
import {JfUtils} from './jf-utils'

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

describe('a - JfUtils', () => {
  let localStore = {} as any

  beforeEach(() => {
    window.history.pushState({}, 'Page Title', '/admin/-/sv#/login?with=params&enjoy=true')

    localStore = new LocalStorageMock()
  })

  it('getBaseLocation should return "/admin/-/sv#/"', () => {
    const result = JfUtils.getBaseLocation()

    expect(result).toBe('/admin/-/sv#/')
  })
})
