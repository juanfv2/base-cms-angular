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
  export(entities: string, parameters: any, isPost = false): Observable<ArrayBuffer> {
    const params = this.setParams(parameters)

    // console.log('parameters', JSON.stringify(parameters));
    // console.log('params', JSON.stringify(params));

    const options: any = JfRequestOption.getRequestOptions()
    options.responseType = 'blob'

    if (isPost) {
      return this.http.post(`${this.api}${entities}`, params, options)
    }

    options.params = params

    return this.http.get(`${this.api}${entities}`, options)
  }

  /**
   * Load a page (for paginated data-table) of User using the passed
   * user as an example for the search by example facility.
   */
  getPage(entities: string, parameters: any, withAuth = true, isPost = false): Observable<any> {
    const params = this.setParams(parameters)

    const options: any = JfRequestOption.getRequestOptions(withAuth)
    // console.log('parameters', JSON.stringify(parameters));
    // console.log('params', JSON.stringify(params));

    if (isPost) {
      return this.http.post(`${this.api}${entities}`, params, options)
    }

    options.params = params

    return this.http.get(`${this.api}${entities}`, options)
  }

  /**
   * Get a Entity by id.
   */
  getEntity(entities: string, id: any, withAuth = true): Observable<any> {
    const urlStr = `${this.api}${entities}/${id}`
    return this.http.get<any>(urlStr, JfRequestOption.getRequestOptions(withAuth))
  }

  /**
   * Save the Entity.
   */
  updateEntity(entities: string, entity: any): Observable<any> {
    /**
     * Update an Entity by id.
     */
    if (entity.id) {
      return this.http.put<any>(`${this.api}${entities}/${entity.id}`, entity, JfRequestOption.getRequestOptions())
    }
    /**
     * Create an Entity.
     */
    return this.http.post<any>(`${this.api}${entities}`, entity, JfRequestOption.getRequestOptions())
  }

  /**
   * Delete an Entity by id.
   */
  deleteEntity(entities: string, id: any): Observable<any> {
    return this.http.delete(`${this.api}${entities}/${id}`, JfRequestOption.getRequestOptions())
  }

  /**
   * POST generic.
   */
  post(url: string, body: any, withAuth = true): Observable<any> {
    const sUrl = this.api + url
    return this.http.post<any>(sUrl, body, JfRequestOption.getRequestOptions(withAuth))
  }

  /**
   * PUT generic.
   */
  put(url: string, body: any, withAuth = true): Observable<any> {
    const sUrl = this.api + url
    return this.http.put<any>(sUrl, body, JfRequestOption.getRequestOptions(withAuth))
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
      params.sorts = this.getConditions(parameters.sorts)
    }
    if (parameters.conditions) {
      params.conditions = this.getConditions(parameters.conditions)
    }
    if (parameters.cWith) {
      params.with = this.getConditions(parameters.cWith)
    }
    if (parameters.joins) {
      params.joins = this.getConditions(parameters.joins)
    }
    return new HttpParams({fromObject: params})
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
