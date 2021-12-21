import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'

import {k} from '../environments/k'
import {JfRequestOption} from '../support/jf-request-option'
import {JfStorageManagement} from '../support/jf-storage-management'

import {User, Role} from '../resources/models'

@Injectable({
  providedIn: 'root',
})
export class JfAuthService {
  private readonly api = k.routes.backEnd.root + k.routes.api
  isSideBarVisible = new BehaviorSubject(k.isSidebarVisibleOpen)
  currentUser = new BehaviorSubject({} as User)
  currentEntityGlobal: any

  constructor(private http: HttpClient) {
    /**
     * If refresh the page, get user saved in storage.
     */
    const u = this.entityGlobal(k.user)

    // Get auth data, then get user || null.

    this.currentUser.next(u)

    const sideBarVisible = +`${JfStorageManagement.getItem(k.isSidebarVisible)}`

    this.isSideBarVisible.next(sideBarVisible)
  }

  /**
   * Requests
   */
  login(
    email: string,
    password: string,
    includes: any = [
      'token',
      'person',
      'account',
      'photo',
      {company: ['country', 'icon', 'logo', 'background']},
      {roles: [{menus: ['subMenus']}, 'urlPermissions']},
    ]
  ): Observable<any> {
    const user: any = {email, password, includes}
    const r = this.http.post(`${this.api}${k.routes.auth.login}`, user, JfRequestOption.getRequestOptions(true))

    JfStorageManagement.clearEnvironment()

    return r
  }

  logout(): Observable<any> {
    const r = this.http.post(`${this.api}${k.routes.auth.logout}`, null, JfRequestOption.getRequestOptions())

    JfStorageManagement.clearEnvironment()

    return r
  }

  /**
   * saved
   */

  isAdmin(): boolean {
    return +`${`${JfStorageManagement.getItem(k.user_role_id)}`}` === 1
  }

  isFromAdmins(): boolean {
    return k.rolesAdmins.map((r: Role) => r.id).includes(+`${`${JfStorageManagement.getItem(k.user_role_id)}`}`)
  }

  userUserId(): number {
    return +`${JfStorageManagement.getItem(k.user_id)}`
  }

  entityGlobal(g = k.entityGlobal): any {
    // can be country, company , etc
    return JSON.parse(`${JfStorageManagement.getItem(g)}`)
  }

  setSidebarVisible(isSidebarVisible: number): void {
    this.isSideBarVisible.next(isSidebarVisible)
    JfStorageManagement.setItem(
      k.isSidebarVisible,
      `${isSidebarVisible ? k.isSidebarVisibleClose : k.isSidebarVisibleOpen}`
    )
  }
}
