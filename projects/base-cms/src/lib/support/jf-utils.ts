import {SearchInputComponent} from '../components/search-input/search-input.component'

import {k} from '../environments/k'
import {JfResponseList, JfSearchCondition, JfCondition} from '../resources/classes'

import {JfApiRoute} from './jf-api-route'
import {JfStorageManagement} from './jf-storage-management'

export class JfUtils {
  static mStorage = JfStorageManagement
  static mApi = new JfApiRoute('')

  static getBaseLocation(): string {
    const r = JfUtils.mStorage.saveCountryInLocalStorage()
    const rDevelop = r.dev ? `/${r.dev}` : ''
    const entityGlobalId = r.entityGlobalId
    const rCompanyName = r.cName
    const r1 = `${k.routes.backEnd.rootServer}${rCompanyName}/${entityGlobalId}${rDevelop}/`
    // console.log('r1', r1, r)
    return r1
  }

  static removeHash() {
    const h = location.href
    // console.log('h', h, h.indexOf('#'))

    if (h.indexOf('#') !== -1) {
      const newLocal = h.replace('#', '')
      // console.log('newLocal', newLocal)
      location.href = newLocal
    }
  }
  // remove the passed element from the content array.
  static remove(page: JfResponseList<any>, element: any): void {
    const indexToRemove: number = page.content.indexOf(element)
    page.content = page.content.filter((val, i) => i !== indexToRemove)
    page.totalElements = page.totalElements - 1
  }
  // remove the passed element from the content array.
  static removeFromArray(content: any[], element: any, byField?: string): any[] {
    if (byField) {
      return content.filter((e) => e[byField] !== element)
    }
    const indexToRemove: number = content.indexOf(element)
    return content.filter((val, i) => i !== indexToRemove)
  }

  static convert2PageResponse(arr: any[] = [], rows: number = 0): JfResponseList<any> {
    return new JfResponseList<any>(Math.ceil(arr.length / rows), arr.length, arr)
  }

  static downloadFile(data: any, name: string, type: string = 'csv', wDate = true): void {
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(data)
    link.download = name + (wDate ? `-${JfStorageManagement.today()}` : '') + '.' + type
    link.click()
  }

  static itemIsSelected(arr: any[], id: number): boolean {
    if (arr && id > 0) {
      // console.log('id:', id, ' b', b);
      return arr.find((p) => p === id) > 0
    }
    return false
    // $event.binary = true
  }

  static csvColumns(pLabel: any, isImports = false): any {
    const csvColumns: any = {}

    for (const key in pLabel) {
      if (pLabel.hasOwnProperty(key)) {
        const element = pLabel[key]
        const ExportOrImport = isImports ? element.allowImport : element.allowExport
        if (element !== null && typeof element === 'object' && ExportOrImport) {
          const ff = element.field.replace(`${pLabel.tableName}.`, '')
          if (isImports) {
            if (element.field.indexOf(`${pLabel.tableName}.`) !== -1) {
              csvColumns[element.label] = ff
            } else {
              csvColumns[element.label] = ff
            }
          } else {
            csvColumns[ff] = element.label
          }
        }
      }
    }

    return csvColumns
  }

  static reverseObjKeys(pHeaders: any): any {
    const obj: any = {}
    for (const key in pHeaders) {
      if (pHeaders.hasOwnProperty(key)) {
        const newValue = pHeaders[key]
        obj[newValue] = key
      }
    }

    return obj
  }

  static addSearchField(pComponent: any, condition?: JfSearchCondition, condStr = 'like') {
    if (!pComponent) {
      return
    }
    if (!pComponent.searchField) {
      return
    }

    // const componentFactory = pComponent.resolver.resolveComponentFactory(SearchInputComponent)
    const componentRef = pComponent.searchField.viewContainerRef.createComponent(SearchInputComponent)
    const searchItem = componentRef.instance

    if (!condition) {
      condition = new JfSearchCondition(condStr)
      condition.field = pComponent.fieldsSearchable[0]

      if (!pComponent.modelSearch.conditions) {
        pComponent.modelSearch.conditions = []
      }
      pComponent.modelSearch.conditions.push(condition)
    }

    searchItem.condition = condition
    searchItem.operatorOptions = pComponent.operatorOptions
    searchItem.conditionalOptions = pComponent.conditionalOptions
    searchItem.fieldsSearchable = pComponent.fieldsSearchable

    searchItem.modelSearch = pComponent.modelSearch
    searchItem.mRef = componentRef
    return searchItem
  }

  static x2one({
    conditions,
    conditionModel,
    foreignKName,
    primaryKName,
    nextOperator,
  }: {
    conditions: any[]
    conditionModel: JfSearchCondition
    foreignKName: string
    primaryKName?: string
    nextOperator: string
  }): string {
    const pkName = primaryKName || 'id'

    if (conditionModel.value && conditionModel.value[pkName]) {
      conditions.push(
        new JfCondition(`${nextOperator} ${foreignKName} ${conditionModel.cond}`, conditionModel.value[pkName])
      )
      nextOperator = conditionModel.oper
    }

    return nextOperator
  }

  static go2login(timeout: number = 4000): void {
    console.log('go2login', 'go2login')
    setTimeout(() => {
      JfUtils.mStorage.clearEnvironment()
      const newLocal = JfUtils.getBaseLocation()
      // window.location.href = newLocal + '/login'
    }, timeout)
  }

  static jsonValidated(json: string): any {
    try {
      return JSON.parse(json)
    } catch (error) {
      return null
    }
  }

  static addCondition(c: JfSearchCondition, nextOperator: string, conditions: any[]): string {
    if (c.value || c.field.type === 'boolean') {
      const nCondition = `${nextOperator} ${c.field.field} ${c.cond}`
      nextOperator = c.oper
      let valueFormatted = ''
      switch (c.field.type) {
        case 'date':
          valueFormatted = JfUtils.reFormatDate(c.value)
          break
        case 'date-time':
          valueFormatted = JfUtils.reFormatDateTime(c.value)
          break
        // case 'boolean':
        // const bx = !c.value;
        // conditions.push(new JfCondition(nCondition, bx));
        // break;
        default:
          valueFormatted = c.value
          break
      }
      conditions.push(new JfCondition(nCondition, valueFormatted))
    }

    return nextOperator
  }

  static reFormatDate(cDate: string) {
    const d = new Date(cDate)
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-')
  }

  static reFormatDateTime(cDate: string) {
    // console.log({cDate})
    const dt = new Date(cDate)
    const _dt_ = this.toLocale(dt)
    if (_dt_) {
      return (
        [_dt_.getFullYear(), _dt_.getMonth() + 1, _dt_.getDate()].join('-') +
        ' ' +
        [_dt_.getHours(), _dt_.getMinutes()].join(':')
      )
    }
    return ''
    // console.log({dt, dts, _dt_})
  }

  static toLocale(date: Date): Date | null {
    if (date) {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset())

      return date
    }
    return null
  }

  static kebabCase = (string: string) =>
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.join('-')
      ?.toLowerCase() || ''

  static snakeCase = (string: string) =>
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.join('_')
      ?.toLowerCase() || ''
}
