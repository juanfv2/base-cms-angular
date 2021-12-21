import {Injectable, TemplateRef} from '@angular/core'
import {Subject, BehaviorSubject} from 'rxjs'

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

  danger(header: any, msg: string, page: string = '') {
    const msg1 = JfMessageService.getErrors(msg, page)
    this.show(msg1, {className: 'bg-danger text-light', delay: this.timeOut, header})
  }

  static getErrors(errorObj: any, page = '', includeHeader = true): string {
    // console.log('errorObj', errorObj);
    const br = '\n.' // &lt;br&gt;
    if (errorObj.status === 401) {
      // MyUtils.go2login()
    }
    let errorStr = ''
    if (typeof errorObj === 'string') {
      errorStr = errorObj + br
    }
    if (errorObj.error) {
      if (typeof errorObj.error === 'string') {
        errorStr += errorObj.error + br
      }
      if (includeHeader && errorObj.error.message) {
        errorStr += errorObj.error.message + br
      }
      if (errorObj.error.errors) {
        // && errorObj.error.errors.length > 0
        // const erValues = Object.values(errorObj.error.errors);
        const erValues = Object.keys(errorObj.error.errors).map((itm) => errorObj.error.errors[itm])
        // console.log('erValues', erValues);
        erValues.forEach((e1: string[]) => {
          // console.log('e1', e1);
          errorStr += `${br} · ${e1.join('${br} # ')}`
        })
        // console.log('errorStr', errorStr);
      }
    }
    // if (errorObj.message) {
    //   errorStr += errorObj.message + br;
    // }
    // if (errorObj.status) {
    //   errorStr += `Status: ${errorObj.status}  - Texto: ${errorObj.statusText}`;
    // } else {
    //   errorStr += 'Server error';
    // }
    if (page) {
      errorStr += '\n(' + page + ')'
    }
    return errorStr
  }
}
