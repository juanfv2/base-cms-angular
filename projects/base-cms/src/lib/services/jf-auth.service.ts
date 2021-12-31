import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'

import {configs} from '../environments/configs'
import {JfRequestOption} from '../support/jf-request-option'
import {JfStorageManagement} from '../support/jf-storage-management'

import {Role} from '../resources/models'

@Injectable({
  providedIn: 'root',
})
export class JfAuthService {
  private readonly api = configs.routes.backEnd.root + configs.routes.api

  currentUser = new BehaviorSubject({} as any)
  currentEntityGlobal: any

  constructor(private http: HttpClient) {
    /**
     * If refresh the page, get user saved in storage.
     */
    const u = this.entityGlobal(configs.user)

    // Get auth data, then get user || null.

    this.currentUser.next(u)
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

    const r = this.http.post(`${this.api}${configs.routes.login}`, user, JfRequestOption.getRequestOptions(true))

    JfStorageManagement.clearEnvironment()

    return r
  }

  logout(): Observable<any> {
    const r = this.http.post(`${this.api}${configs.routes.logout}`, null, JfRequestOption.getRequestOptions())

    JfStorageManagement.clearEnvironment()

    return r
  }

  /**
   * saved
   */

  isAdmin(): boolean {
    return +`${`${JfStorageManagement.getItem(configs.user_role_id)}`}` === 1
  }

  isFromAdmins(): boolean {
    return configs.rolesAdmins
      .map((r: Role) => r.id)
      .includes(+`${`${JfStorageManagement.getItem(configs.user_role_id)}`}`)
  }

  userUserId(): number {
    return +`${JfStorageManagement.getItem(configs.user_id)}`
  }

  entityGlobal(g = configs.entityGlobal): any {
    // can be country, company , etc
    return JSON.parse(`${JfStorageManagement.getItem(g)}`)
  }
}
