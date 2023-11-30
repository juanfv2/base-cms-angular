import {Injectable, TemplateRef} from '@angular/core'
import {Subject, BehaviorSubject} from 'rxjs'
import {JfUtils} from '../support/jf-utils'

@Injectable({
  providedIn: 'root',
})
export class JfMessageService {
  toasts: any[] = []
  timeOut = 3000

  private messageSource = new Subject<any>()
  messageSource$ = this.messageSource.asObservable()
  currentMessage = new BehaviorSubject({})

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({textOrTpl, ...options})
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast)
  }

  info(header: string, msg: string) {
    this.show(msg, {className: 'bg-info text-light', delay: this.timeOut, header})
  }

  success(header: string, msg: string) {
    this.show(msg, {className: 'bg-success text-light', delay: this.timeOut, header})
  }

  danger(header: any, msg: any, page: string = '') {
    const msg1 = JfMessageService.getErrors(msg, page)
    this.timeOut = 1000 * 60 * 2
    this.show(msg1, {className: 'bg-danger text-light', delay: this.timeOut, header})
  }

  static getErrors(errorObj: any, page = '', includeHeader = true): string {
    console.log('errorObj', errorObj)

    const br = '<br>.\n '
    let errorStr = ''

    if (errorObj.status === 401) {
      // JfUtils.go2login()
    }

    if (typeof errorObj === 'string') {
      errorStr = errorObj
    }

    if (errorObj.error) {
      if (typeof errorObj.error === 'string') {
        errorStr += errorObj.error
      }

      if (includeHeader && errorObj.error.message) {
        errorStr += errorObj.error.message
      }

      if (errorObj.error.errors) {
        const erValues = Object.keys(errorObj.error.errors).map((itm) => errorObj.error.errors[itm])

        erValues.forEach((e1: string[]) => {
          errorStr += br + e1.join(br)
        })
      }

      errorStr = errorStr.replace(/The given data was invalid./g, 'Los datos proporcionados no son válidos.')
    }

    if (page) {
      errorStr += `${br}(${page})`
    }
    return errorStr
  }
}
