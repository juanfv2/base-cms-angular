import {HttpClient, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'

import {k} from '../environments/k'
import {JfSort} from '../resources/classes'

import {JfRequestOption} from '../support/jf-request-option'

@Injectable({
  providedIn: 'root',
})
export class JfCrudService {
  private readonly api = k.routes.backEnd.root + k.routes.api

  constructor(private http: HttpClient) {}

  /**
   * Load a page (for paginated data-table) of User using the passed
   * user as an example for the search by example facility.
   */
  export(entities: string, parameters: any): Observable<ArrayBuffer> {
    const params = this.setParams(parameters)

    const options: any = JfRequestOption.getRequestOptions()
    options.params = params
    options.responseType = 'blob'

    return this.http.get(this.api + entities, options)
    // return this.http.get(
    //   this.prefixApi + entities,
    //   { responseType: 'blob', headers: options.headers, params });
  }

  /**
   * Load a page (for paginated data-table) of User using the passed
   * user as an example for the search by example facility.
   */
  getPage(entities: string, parameters: any, isForLoginPage: boolean = false): Observable<any> {
    const params = this.setParams(parameters)

    const options: any = JfRequestOption.getRequestOptions(isForLoginPage)
    options.params = params
    // console.log('parameters', JSON.stringify(parameters));
    // console.log('params', JSON.stringify(params));

    return this.http.get(this.api + entities, options)
  }

  /**
   * Get a User by id.
   */
  getEntity(entities: string, id: any, isForLoginPage: boolean = false): Observable<any> {
    const urlStr = this.api + entities + '/' + id
    return this.http.get<any>(urlStr, JfRequestOption.getRequestOptions(isForLoginPage))
  }

  /**
   * Update the passed Entity.
   */
  updateEntity(entities: string, entity: any): Observable<any> {
    /**
     * Update an Entity by id.
     */
    if (entity.id) {
      return this.http.put<any>(this.api + entities + '/' + entity.id, entity, JfRequestOption.getRequestOptions())
    }
    /**
     * Create an Entity.
     */
    return this.http.post<any>(this.api + entities, entity, JfRequestOption.getRequestOptions())
  }

  /**
   * Delete an Entity by id.
   */
  deleteEntity(entities: string, id: any): Observable<any> {
    return this.http.delete(this.api + entities + '/' + id, JfRequestOption.getRequestOptions())
  }

  /**
   * POST generic.
   */
  post(url: string, body: any, isLogin: boolean = false): Observable<any> {
    const sUrl = this.api + url
    return this.http.post<any>(sUrl, body, JfRequestOption.getRequestOptions(isLogin))
  }

  /**
   * PUT generic.
   */
  put(url: string, body: any, isLogin: boolean = false): Observable<any> {
    const sUrl = this.api + url
    return this.http.put<any>(sUrl, body, JfRequestOption.getRequestOptions(isLogin))
  }

  /**
   * Utils
   */

  private setParams(parameters?: any): HttpParams {
    if (parameters == null) {
      return new HttpParams()
    }

    if (typeof parameters === 'string') {
      return new HttpParams({fromString: parameters})
    }
    // console.log('parameters', parameters);

    const params: any = {}
    if (parameters.rows) {
      params.limit = `${parameters.rows}`
    }
    if (parameters.first > 1) {
      params.offset = `${(parameters.first - 1) * parameters.rows}`
    }
    if (parameters.select) {
      params.select = parameters.select.join(',')
    }
    if (parameters.additional) {
      // additional = JfCondition[]
      parameters.additional.forEach((p: any) => {
        params[p.c] = p.v
      })
    }
    if (parameters.includes) {
      params.includes = this.getConditions(parameters.includes)
    }
    if (parameters.sorts) {
      params.sorts = this.getMultiSortMeta(parameters.sorts)
    }
    if (parameters.conditions) {
      params.conditions = this.getConditions(parameters.conditions)
    }
    if (parameters.joins) {
      params.joins = this.getConditions(parameters.joins)
    }
    if (parameters.cWith) {
      params.with = this.getConditions(parameters.cWith)
    }
    return new HttpParams({fromObject: params})
  }

  getMultiSortMeta(multiSortMeta: JfSort[]): string {
    return JSON.stringify(multiSortMeta)
  }

  /**
   * only for .net backend
   *
   *  getMultiSortMeta(multiSortMeta: JfSort[]): string {
   *    const v = [];
   *    multiSortMeta.forEach(s => v.push(s.field + ' ' + (s.order === JfSort.desc ? 'desc' : 'asc')));
   *    return v.join(',');
   *  }
   *
   */

  getConditions(conditions: any): string {
    return JSON.stringify(conditions)
  }

  /**
   * only for .net backend
   *
   *  getConditions(conditions: JfCondition[]): string {
   *    const v = [];
   *    conditions.forEach(s => v.push(s.condition + ' ' + (typeof s.value === 'string' ? '\'' + s.value + '\'' : s.value || '')));
   *    return v.join(' ');
   *  }
   */
}
