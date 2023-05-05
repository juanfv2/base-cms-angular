import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'

import {k} from '../environments/k'
import {JfRequestOption} from '../support/jf-request-option'
import {JfStorageManagement} from '../support/jf-storage-management'

import {Role} from '../resources/models'

@Injectable({
  providedIn: 'root',
})
export class JfAuthService {
  private readonly api = k.routes.backEnd.rootServer + k.routes.api
  currentUser = new BehaviorSubject({} as any)
  currentEntityGlobal: any

  constructor(private http: HttpClient) {
    /**
     * If refresh the page, get user saved in storage.
     */
    const u = this.entityGlobal(k._1_user)

    // Get auth data, then get user || null.

    this.currentUser.next(u)
  }

  /**
   * Requests
   */
  login(
    email: string,
    password: string,
    includes: any = ['token', 'person', 'photo', {roles: [{menus: ['subMenus']}, 'urlPermissions']}]
  ): Observable<any> {
    const user: any = {email, password, includes}

    const r = this.http.post(`${this.api}${k.routes.login}`, user, JfRequestOption.getRequestOptions(false))

    JfStorageManagement.clearEnvironment()

    return r
  }

  logout(): Observable<any> {
    const r = this.http.post(`${this.api}${k.routes.logout}`, null, JfRequestOption.getRequestOptions())

    JfStorageManagement.clearEnvironment()

    return r
  }

  /**
   * saved
   */

  isAdmin(): boolean {
    return +`${`${JfStorageManagement.getItem(k._2_user_role_id)}`}` === 1
  }

  isFromAdmins(): boolean {
    return k.rolesAdmins.map((r: Role) => r.id).includes(+`${`${JfStorageManagement.getItem(k._2_user_role_id)}`}`)
  }

  userUserId(): number {
    return +`${JfStorageManagement.getItem(k._3_user_id)}`
  }

  entityGlobal(g = k._6_entityGlobal): any {
    // can be country, company , etc
    return JSON.parse(`${JfStorageManagement.getItem(g)}`)
  }
}
