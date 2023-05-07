import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap'
import {debounceTime, distinctUntilChanged, map, merge, Observable, of, Subject, switchMap, tap} from 'rxjs'
import {JfCrudService} from '../../services/jf-crud.service'
import {JfMessageService} from '../../services/jf-message.service'
import {JfRequestOption} from '../../support/jf-request-option'

@Component({
  selector: 'base-cms-base-auto-complete',
  templateUrl: './base-cms-auto-complete.component.html',
  styleUrls: ['./base-cms-auto-complete.component.scss'],
})
export class BaseCmsAutoCompleteComponent {
  @ViewChild('instance', {static: true}) instance?: NgbTypeahead

  @Output() oSelected = new EventEmitter<any>()

  _value?: any

  @Input() acDisabled = false
  @Input() acMultiple = false
  @Input() acId = ''
  @Input() acName = ''
  @Input() currentPage = ''
  @Input() selectable: any[] = []
  @Input() avoidable: any[] = []
  @Input()
  public get value(): any {
    return this._value
  }
  public set value(value: any) {
    this.hasPermission2show = JfRequestOption.isAuthorized(`/${this.kRoute}/show`)
    this._value = value
  }

  kRoute: any
  labels: any
  searching = false
  searchFailed = false
  hasPermission2show = false
  focus = new Subject<string>()
  // click$ = new Subject<string>();
  previousTerm = ''
  values: any[] = []

  constructor(public router: Router, public crudService: JfCrudService, public messageService: JfMessageService) {
    this.hasPermission2show = JfRequestOption.isAuthorized(`/${this.kRoute}/show`)
  }

  /** OnChange */
  private fnChange = (_: any) => {}

  /** OnTouched */
  private fnTouched = () => {}

  // Set touched on blur
  onTouched(): void {
    this.fnTouched()
  }

  /** ControlValueAccessor.writeValue */
  writeValue(value: any): void {
    // console.log('value', value)
    if (this.acMultiple) {
      this.values = value as any[]
    } else {
      this.value = value
    }
  }

  /** ControlValueAccessor.registerOnChange */
  registerOnChange(fn: any): void {
    this.fnChange = fn
  }

  /** ControlValueAccessor.registerOnTouched */
  registerOnTouched(fn: any): void {
    this.fnTouched = fn
  }

  /** ControlValueAccessor.setDisabledState */
  setDisabledState(isDisabled: boolean): void {}

  actBlur(e: any): void {
    const mV = typeof this.value === 'object' ? {item: this.value} : null
    this.select(mV)
  }

  actClear(): void {
    setTimeout(() => {
      this.select(null)
      this.searchFailed = false
    }, 100)
  }

  actGo2Detail(): void {
    if (this.value && this.value.id) {
      const id = this.value.id
      this.router.navigate([this.kRoute, id])
    }
  }

  formatter = (x: any) => `${x.name || ''}`

  select(e: any): void {
    if (this.acMultiple) {
      if (e && e.preventDefault) {
        e.preventDefault()
        setTimeout(() => {
          this.focus.next(this.previousTerm)
        }, 0.000001)
        this.values.push(e.item)
        this.searchFailed = this.values.length === 0
        this.fnChange(this.values)
        this.oSelected.emit(this.values)
      }
    } else {
      this.previousTerm = ''
      this.value = e ? e.item : undefined
      this.searchFailed = this.value === null
      this.fnChange(this.value)
      this.oSelected.emit(this.value)
    }
    this.fnTouched()
  }

  search = (text: Observable<string>) => {
    const debouncedText = text.pipe(debounceTime(200), distinctUntilChanged())
    // const clicksWithClosedPopup = this.click.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus = this.focus
    if (this.selectable && this.selectable.length > 0) {
      return merge(debouncedText, inputFocus).pipe(
        tap(() => (this.searching = true)),
        map((term) =>
          (term === ''
            ? this.selectable
            : this.selectable.filter((x) => this.formatter(x).toLowerCase().indexOf(term.toLowerCase()) > -1)
          ).slice(0, 10)
        ),
        tap(() => (this.searching = false))
      )
    }

    return merge(debouncedText, inputFocus).pipe(
      tap(() => (this.searching = true)),
      switchMap((term) => this.searchTerm(term)),
      tap(() => (this.searching = false))
    )
  }

  searchTerm(term: string): Observable<any> {
    return of([])
  }
}
