import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'

import {Constants} from '../environments/constants'
import {JfRequestOption} from '../support/jf-request-option'
import {JfStorageManagement} from '../support/jf-storage-management'

import {Role} from '../resources/models'

@Injectable({
  providedIn: 'root',
})
export class JfAuthService {
  private readonly api = Constants.routes.backEnd.rootServer + Constants.routes.api
  currentUser = new BehaviorSubject({} as any)

  constructor(private http: HttpClient) {
    /**
     * If refresh the page, get user saved in storage.
     */
    const u = this.entityGlobal(Constants._1_user)

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

    const r = this.http.post(`${this.api}${Constants.routes.login}`, user, JfRequestOption.getRequestOptions(false))

    JfStorageManagement.clearEnvironment()
    JfStorageManagement.clearEnvironment(sessionStorage)

    return r
  }

  logout(): Observable<any> {
    const r = this.http.post(`${this.api}${Constants.routes.logout}`, null, JfRequestOption.getRequestOptions())

    JfStorageManagement.clearEnvironment()
    JfStorageManagement.clearEnvironment(sessionStorage)

    return r
  }

  /**
   * saved
   */

  isAdmin(): boolean {
    return +`${`${JfStorageManagement.getItem(Constants._2_user_role_id)}`}` === 1
  }

  isFromAdmins(): boolean {
    return Constants.rolesAdmins.map((r: Role) => r.id).includes(+`${`${JfStorageManagement.getItem(Constants._2_user_role_id)}`}`)
  }

  userUserId(): number {
    return +`${JfStorageManagement.getItem(Constants._3_user_id)}`
  }

  entityGlobal(g = Constants._6_entityGlobal): any {
    // this can be country, company, etc
    return JSON.parse(`${JfStorageManagement.getItem(g)}`)
  }
}
